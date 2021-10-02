import {
  AbstractConfigItemModule,
  AbstractConfigModule,
  ChoiceConfig,
  ChoiceItemConfig,
  ChoiceModule,
  LintItem,
  Newable,
} from '../../interfaces';
import { exec, execSync, spawn } from 'child_process';
import * as fs from 'fs';
import { mergeFiles, mergeObjects } from 'json-merger';

import { NoPackageJsonError, NoRequiredFileError } from '../errors';
import {
  EslintMerger,
  StylelintMerger,
  VscodeExtensionMerger,
  VscodeExtensions,
} from '../mergers';
import { reduceArray } from '../utils';
import { FileType, FolderService } from './folder.service';

export class ConfigService {
  constructor(
    private eslintMergerService: EslintMerger,
    private folderService: FolderService,
    private stylelintMerger: StylelintMerger,
    private vscodeExtensionMerger: VscodeExtensionMerger
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
    const missingRequiredFile = configModule.required.find(
      (requiredFile) => !folderFiles.includes(requiredFile)
    );

    if (missingRequiredFile) {
      throw new NoRequiredFileError(missingRequiredFile);
    }

    // TODO check is husky selected
    this.modifyPackageJson({
      scripts: { prepare: "husky install", lint: 'echo "Error: no test specified" && exit 1' },
    });

    /**
     * Iterating though modules
     * */
    const lintScript = `npm run ${config.modules
      .map((module) => this.processModule(module))
      .filter((scripts) => scripts.length)
      .reduce(reduceArray)
      .sort((a, b) => a.order - b.order)
      .map((lintItem) => lintItem.command)
      .join(' && npm run ')}`;

    this.modifyPackageJson({ scripts: { lint: lintScript } });

    console.info('Installing modules...');
    execSync('npm i', { stdio: 'inherit' });

    console.info('\n');
    console.info('Installing git hooks');
    execSync('husky install', { stdio: 'inherit' });
  }

  modifyPackageJson(json: Record<any, any>) {
    const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
    const newPackageJson = mergeObjects([packageJson, json]);

    fs.writeFileSync('package.json', JSON.stringify(newPackageJson, null, 2));
  }

  checkInstalledPackage(packageName: string) {
    const packageJson = JSON.parse(fs.readFileSync('package.json').toString());

    return (!!packageJson.dependencies && !!packageJson.dependencies[packageName]) ||
      (!!packageJson.devDependencies && !!packageJson.devDependencies[packageName]);
  }

  processModule(module: ChoiceModule) {
    const lintScriptItems: LintItem[] = [];

    let resolvedModule: AbstractConfigItemModule;
    let additionalModules: Newable<AbstractConfigItemModule>[] = [];

    /**
     * Resolving providers
     * */
    if ((module as ChoiceItemConfig<any>).useClass) {
      const classProvider = module as ChoiceItemConfig<any>;
      resolvedModule = new classProvider.useClass();
      additionalModules = classProvider.modules || [];
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
        moduleFileName
          .split('/')
          .slice(0, -1)
          .forEach((folder) => {
            folderPath += `${folder}/`;

            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath);
            }
          });
      }

      switch (this.folderService.getFileType(moduleFileName)) {
        case FileType.JSON: {
          if (moduleFileName === '.eslintrc.json') {
            const { sourceFile, targetFile } = this.getMergeFiles(
              moduleFileName,
              moduleFile
            );

            const newEslintConfig = this.eslintMergerService.mergeConfigs(
              targetFile,
              sourceFile
            );
            fs.writeFileSync(
              moduleFileName,
              JSON.stringify(newEslintConfig, null, 2)
            );
            break;
          }

          if (moduleFileName === '.vscode/extensions.json') {
            const { sourceFile, targetFile } =
              this.getMergeFiles<VscodeExtensions>(moduleFileName, moduleFile);

            const newExtensions = this.vscodeExtensionMerger.mergeExtensions(
              targetFile,
              sourceFile
            );
            fs.writeFileSync(
              moduleFileName,
              JSON.stringify(newExtensions, null, 2)
            );
            break;
          }

          if (moduleFileName === '.stylelintrc.json') {
            const { sourceFile, targetFile } = this.getMergeFiles(
              moduleFileName,
              moduleFile
            );

            const newStylelintConfig = this.stylelintMerger.mergeStyle(
              targetFile,
              sourceFile
            );
            fs.writeFileSync(
              moduleFileName,
              JSON.stringify(newStylelintConfig, null, 2)
            );
            break;
          }

          if (!fs.existsSync(moduleFileName)) {
            fs.writeFileSync(moduleFileName, '{}');
          }

          const result = mergeFiles([moduleFileName, moduleFile]);
          fs.writeFileSync(
            moduleFileName,
            `${JSON.stringify(result, null, 2)}\n`
          );
          break;
        }

        case FileType.JS:
        case FileType.NO_EXTENSION:
        case FileType.EDITORCONFIG: {
          if (moduleFileName.includes('.husky/')) {
            const hookName = moduleFileName.replace('.husky/', '');

            console.log(hookName);

            if (!this.checkInstalledPackage('husky')) {
              console.info('Installing husky');
              execSync('npx husky-init', { stdio: 'inherit' });
            }

            console.info('Installing git hook:', hookName);
            execSync(`husky add .husky/${hookName} 'echo "Error: no ${hookName} specified" && exit 1'`, { stdio: 'inherit' });
          }

          this.folderService.copyFile(moduleFileName, moduleFile);
          break;
        }

        default:
          throw new Error(`Unknown File: ${moduleFile}`);
      }
    });

    additionalModules.forEach((module) =>
      lintScriptItems.push(...this.processModule(module))
    );

    return lintScriptItems;
  }

  getMergeFiles<T>(
    target: string,
    source: string
  ): { targetFile: T; sourceFile: T } {
    const isEslintFileExists = fs.existsSync(target);

    const targetFile = isEslintFileExists
      ? (JSON.parse(fs.readFileSync(target).toString()) as Record<any, any>)
      : null;
    const sourceFile = JSON.parse(fs.readFileSync(source).toString()) as Record<
    any,
    any
    >;

    return {
      targetFile,
      sourceFile,
    };
  }
}
