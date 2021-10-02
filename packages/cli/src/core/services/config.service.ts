import {
  AbstractConfigItemModule,
  AbstractConfigModule,
  ChoiceConfig,
  ChoiceItemConfig,
  LintItem,
  Newable,
} from '@smile-config/cli/interfaces';

import { NoPackageJsonError, NoRequiredFileError } from '../errors';
import { FileType, FolderService } from './folder.service';
import { mergeFiles } from 'json-merger';
import * as fs from 'fs';
import { EslintMerger, VscodeExtensionMerger, VscodeExtensions } from '../mergers';

export class ConfigService {
  constructor(
    private eslintMergerService: EslintMerger,
    private folderService: FolderService,
    private vscodeExtensionMerger: VscodeExtensionMerger,
  ) {}

  applyConfig<T extends AbstractConfigModule>(config: ChoiceConfig<T>) {
    console.info('Working directory:', process.cwd());

    const folderFiles = this.folderService.readFolder();

    if (!folderFiles.includes('package.json')) {
      throw new NoPackageJsonError();
    }

    const configModule = new config.useClass();

    /**
     * Validating config required files
     * */
    const missingRequiredFile = configModule.required.find((requiredFile) => !folderFiles.includes(requiredFile));

    if (missingRequiredFile) {
      throw new NoRequiredFileError(missingRequiredFile);
    }

    const lintScriptItems: LintItem[] = [];

    /**
     * Iterating though modules
     * */
    config.modules.forEach((module) => {
      let resolvedModule: AbstractConfigItemModule;
      let additionalModules: AbstractConfigItemModule[] = [];

      /**
       * Resolving providers
       * */
      if ((module as ChoiceItemConfig<any>).useClass) {
        const classProvider = module as ChoiceItemConfig<any>;
        resolvedModule = new classProvider.useClass();
        additionalModules = classProvider.modules.map((providerModule) => new providerModule());
      } else {
        const existingProvider = module as Newable<AbstractConfigItemModule>;
        resolvedModule = new existingProvider();
      }

      /**
       * Adding lint scripts
       * */
      if (resolvedModule.includeToLintScript) {
        lintScriptItems.push(...resolvedModule.includeToLintScript);
      }

      /**
       * Working with files
       * */
      resolvedModule.files.forEach((moduleFile) => {
        const moduleFileName = this.folderService.getFileName(moduleFile);

        if (this.folderService.isNestedFile(moduleFileName)) {
          let folderPath = '';
          moduleFileName.split('/').slice(0, -1).forEach((folder) => {
            folderPath += folder + '/';

            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath);
            }
          });
        }

        switch (this.folderService.getFileType(moduleFileName)) {
          case FileType.JSON: {
            if (moduleFileName === '.eslintrc.json') {
              const { sourceFile, targetFile } = this.getMergeFiles(moduleFileName, moduleFile);

              const newEslintConfig = this.eslintMergerService.mergeConfigs(targetFile, sourceFile);
              fs.writeFileSync(moduleFileName, JSON.stringify(newEslintConfig, null, 2));
              break;
            }

            if (moduleFileName === '.vscode/extensions.json') {
              const { sourceFile, targetFile } = this.getMergeFiles<VscodeExtensions>(moduleFileName, moduleFile);

              const newExtensions = this.vscodeExtensionMerger.mergeExtensions(targetFile, sourceFile);
              fs.writeFileSync(moduleFileName, JSON.stringify(newExtensions, null, 2));
              break;
            }

            if (!fs.existsSync(moduleFileName)) {
              fs.writeFileSync(moduleFileName, '{}');
            }

            const result = mergeFiles([moduleFileName, moduleFile]);
            fs.writeFileSync(moduleFileName, JSON.stringify(result, null, 2) + '\n');
            break;
          }

          case FileType.JS:
          case FileType.NO_EXTENSION:
          case FileType.EDITORCONFIG: {
            this.folderService.copyFile(moduleFileName, moduleFile);
            break;
          }

          default:
            throw new Error('Unknown File: ' + moduleFile);
        }
      });
    });
  }

  getMergeFiles<T>(target: string, source: string): { targetFile: T, sourceFile: T } {
    const isEslintFileExists = fs.existsSync(target);

    const targetFile = isEslintFileExists ? JSON.parse(fs.readFileSync(target).toString()) as Record<any, any> : null;
    const sourceFile = JSON.parse(fs.readFileSync(source).toString()) as Record<any, any>;

    return {
      targetFile,
      sourceFile,
    }
  }
}
