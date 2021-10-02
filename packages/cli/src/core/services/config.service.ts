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
import { EslintMergerService } from './eslint-merger.service';

export class ConfigService {
  constructor(private folderService: FolderService, private eslintMergerService: EslintMergerService) {}

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

      console.log(resolvedModule.files);

      /**
       * Working with files
       * */
      resolvedModule.files.forEach((moduleFile) => {
        const moduleFileName = this.folderService.getFileName(moduleFile);

        if (this.folderService.isNestedFile(moduleFileName)) {
          console.log('yes', moduleFileName);

        } else {
          console.log('not', moduleFile);

          switch (this.folderService.getFileType(moduleFileName)) {
            case FileType.JSON: {
              if (moduleFileName === '.eslintrc.json') {
                const isEslintFileExists = fs.existsSync(moduleFileName);
                const eslintTarget = isEslintFileExists ? JSON.parse(fs.readFileSync(moduleFileName).toString()) : null;
                const eslintSource = JSON.parse(fs.readFileSync(moduleFile).toString());

                const newEslintConfig = this.eslintMergerService.mergeConfigs(eslintTarget, eslintSource);
                fs.writeFileSync(moduleFileName, JSON.stringify(newEslintConfig, null, 2));
                break;
              }

              if (!fs.existsSync(moduleFileName)) {
                fs.writeFileSync(moduleFileName, '{}');
              }

              const result = mergeFiles([moduleFileName, moduleFile]);
              console.log(result);

              fs.writeFileSync(moduleFileName, JSON.stringify(result, null, 2) + '\n');
              break;
            }

            case FileType.JS:
            case FileType.EDITORCONFIG: {
              this.folderService.copyFile(moduleFileName, moduleFile);
              break;
            }

            default:
              throw new Error('Unknown File: ' + moduleFile);
          }
        }
      });
    });
  }
}
