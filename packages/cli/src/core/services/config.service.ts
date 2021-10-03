import { execSync } from 'child_process';
import type { Linter } from 'eslint';
import * as fs from 'fs';
import { mergeFiles, mergeObjects } from 'json-merger';
import type { Configuration } from 'stylelint';
import type { PackageJson } from 'type-fest';

import { JSON_STRINGIFY_SPACES, SLICE_EXCLUDE_LAST_ELEMENT } from '../../const';
import type {
  AbstractConfigItemModule,
  AbstractConfigModule,
  AppObject,
  ChoiceConfig,
  ChoiceItemConfig,
  ChoiceModule,
  LintItem,
  Newable,
} from '../../interfaces';
import { NoPackageJsonError, NoRequiredFileError } from '../errors';
import type {
  EslintMerger,
  StylelintMerger,
  VscodeExtensionMerger,
  VscodeExtensions,
} from '../mergers';
import { reduceArray } from '../utils';
import type { FolderService } from './folder.service';
import { FileType } from './folder.service';

export class ConfigService {
  constructor(
    private readonly eslintMergerService: EslintMerger,
    private readonly folderService: FolderService,
    private readonly stylelintMerger: StylelintMerger,
    private readonly vscodeExtensionMerger: VscodeExtensionMerger
  ) {}

  applyConfig<T extends AbstractConfigModule>(
    config: Readonly<ChoiceConfig<T>>
  ) {
    console.info('Working directory:', process.cwd());

    const folderFiles = this.folderService.readFolder();

    if (!folderFiles.includes('package.json')) {
      throw new NoPackageJsonError();
    }

    const ConfigClass = config.useClass;
    const configModule = new ConfigClass();

    /**
     * Validating config required files
     * */
    const missingRequiredFile = configModule.required.find(
      (requiredFile) => !folderFiles.includes(requiredFile)
    );

    if (missingRequiredFile !== undefined) {
      throw new NoRequiredFileError(missingRequiredFile);
    }

    // TODO check is husky selected
    this.modifyPackageJson({
      scripts: {
        prepare: 'husky install',
        lint: 'echo "Error: no test specified" && exit 1',
      },
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

  modifyPackageJson(json: PackageJson) {
    const packageJson = JSON.parse(
      fs.readFileSync('package.json').toString()
    ) as PackageJson;
    const newPackageJson = mergeObjects([packageJson, json]) as PackageJson;

    fs.writeFileSync(
      'package.json',
      JSON.stringify(newPackageJson, null, JSON_STRINGIFY_SPACES)
    );
  }

  checkInstalledPackage(packageName: string) {
    const packageJson = JSON.parse(
      fs.readFileSync('package.json').toString()
    ) as PackageJson;

    return (
      (!!packageJson.dependencies && !!packageJson.dependencies[packageName]) ||
      (!!packageJson.devDependencies &&
        !!packageJson.devDependencies[packageName])
    );
  }

  processModule(module: ChoiceModule) {
    const lintScriptItems: LintItem[] = [];

    // eslint-disable-next-line @typescript-eslint/init-declarations
    let resolvedModule: AbstractConfigItemModule;
    let additionalModules: Newable<AbstractConfigItemModule>[] = [];

    /**
     * Resolving providers
     * */
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if ((module as ChoiceItemConfig<AbstractConfigItemModule>).useClass) {
      const classProvider =
        module as ChoiceItemConfig<AbstractConfigItemModule>;
      const ConfigClass = classProvider.useClass;
      resolvedModule = new ConfigClass();
      additionalModules = classProvider.modules;
    } else {
      const ExistingProvider = module as Newable<AbstractConfigItemModule>;
      resolvedModule = new ExistingProvider();
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
        const SLICE_START = 0;

        moduleFileName
          .split('/')
          .slice(SLICE_START, SLICE_EXCLUDE_LAST_ELEMENT)
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
            const { sourceFile, targetFile } =
              this.getMergeFiles<Linter.Config>(moduleFileName, moduleFile);

            const newEslintConfig = this.eslintMergerService.mergeConfigs(
              targetFile,
              sourceFile
            );

            fs.writeFileSync(
              moduleFileName,
              JSON.stringify(newEslintConfig, null, JSON_STRINGIFY_SPACES)
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
              JSON.stringify(newExtensions, null, JSON_STRINGIFY_SPACES)
            );
            break;
          }

          if (moduleFileName === '.stylelintrc.json') {
            const { sourceFile, targetFile } =
              this.getMergeFiles<Configuration>(moduleFileName, moduleFile);

            const newStylelintConfig = this.stylelintMerger.mergeStyle(
              targetFile,
              sourceFile
            );
            fs.writeFileSync(
              moduleFileName,
              JSON.stringify(newStylelintConfig, null, JSON_STRINGIFY_SPACES)
            );
            break;
          }

          if (!fs.existsSync(moduleFileName)) {
            fs.writeFileSync(moduleFileName, '{}');
          }

          const result = mergeFiles([moduleFileName, moduleFile]) as AppObject;
          fs.writeFileSync(
            moduleFileName,
            `${JSON.stringify(result, null, JSON_STRINGIFY_SPACES)}\n`
          );
          break;
        }

        case FileType.JS:
        case FileType.NO_EXTENSION:
        case FileType.EDITORCONFIG: {
          if (moduleFileName.includes('.husky/')) {
            const hookName = moduleFileName.replace('.husky/', '');

            if (!this.checkInstalledPackage('husky')) {
              console.info('Installing husky');
              execSync('npx husky-init', { stdio: 'inherit' });
            }

            console.info('Installing git hook:', hookName);
            execSync(
              `husky add .husky/${hookName} 'echo "Error: no ${hookName} specified" && exit 1'`,
              { stdio: 'inherit' }
            );
          }

          this.folderService.copyFile(moduleFileName, moduleFile);
          break;
        }

        default:
          throw new Error(`Unknown File: ${moduleFile}`);
      }
    });

    additionalModules.forEach((additionalModule) =>
      lintScriptItems.push(...this.processModule(additionalModule))
    );

    return lintScriptItems;
  }

  getMergeFiles<T>(
    target: string,
    source: string
  ): { targetFile: T | null; sourceFile: T } {
    const isEslintFileExists = fs.existsSync(target);

    const targetFile = isEslintFileExists
      ? (JSON.parse(fs.readFileSync(target).toString()) as T)
      : null;
    const sourceFile = JSON.parse(fs.readFileSync(source).toString()) as T;

    return {
      targetFile,
      sourceFile,
    };
  }
}
