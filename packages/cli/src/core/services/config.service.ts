import * as chalk from 'chalk';
import { execSync } from 'child_process';
import type { Linter } from 'eslint';
import { mergeObjects } from 'json-merger';
import type { Configuration } from 'stylelint';
import type { PackageJson } from 'type-fest';

import type {
  AbstractConfigItemModule,
  AbstractConfigModule,
  AppObject,
  BaseLintItem,
  ChoiceConfig,
  ChoiceItemConfig,
  ChoiceModule,
  ConditionLintItem,
  LintItem,
  Newable,
} from '../../interfaces';
import { NoPackageJsonError, NoRequiredFileError } from '../errors';
import type {
  EslintMerger,
  IgnoreMerger,
  StylelintMerger,
  VscodeExtensionMerger,
  VscodeExtensions,
} from '../mergers';
import { reduceArray } from '../utils';
import type { FolderService } from './folder.service';
import { FileType } from './folder.service';

export class ConfigService {
  constructor(
    private readonly ignoreMerger: IgnoreMerger,
    private readonly eslintMergerService: EslintMerger,
    private readonly folderService: FolderService,
    private readonly stylelintMerger: StylelintMerger,
    private readonly vscodeExtensionMerger: VscodeExtensionMerger
  ) {}

  applyConfig<T extends AbstractConfigModule>(
    config: Readonly<ChoiceConfig<T>>
  ) {
    console.info(chalk.bold('\nWorking directory'));
    console.info(chalk.gray(`  ${process.cwd()}`));

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

    if (missingRequiredFile) {
      throw new NoRequiredFileError(missingRequiredFile);
    }

    console.info(chalk.bold(`\n${chalk.yellow('!')} Copy files`));

    console.info(chalk.bold('\nModify package.json'));

    // TODO check is husky selected
    this.modifyPackageJson({
      scripts: {
        prepare: 'husky install',
        lint: 'echo "Error: no lint specified" && exit 1',
      },
      devDependencies: {
        // TODO add when will be deployed to npm
        // 'smile-config': '',
        'npm-run-all': '^4.1.5',
      },
    });

    console.info(`  ${chalk.green('✓')} Add npm-run-all`);

    const lintScriptCommand = this.getLintScript(config.modules);
    if (lintScriptCommand) {
      this.modifyPackageJson({
        scripts: { lint: `npm-run-all --parallel ${lintScriptCommand}` },
      });
    }

    console.info(
      chalk.bold(`\n${chalk.yellow('!')} Installing new modules...`)
    );
    execSync('npm i', { stdio: 'inherit' });

    console.info(chalk.bold('\nInstalling git hooks'));
    execSync('husky install', { stdio: 'inherit' });

    console.info(
      chalk.bold(`\n${chalk.green('✓')} Done! Repo is ready for work`)
    );
    console.info('  Suggestion: Stage your files before any changes');
  }

  getPackageJson(): PackageJson {
    return this.folderService.readFile<PackageJson>('package.json', 'json')!;
  }

  modifyPackageJson(json?: PackageJson) {
    if (!json) {
      return;
    }

    const packageJson = this.getPackageJson();
    const newPackageJson = mergeObjects([packageJson, json]) as PackageJson;

    this.folderService.writeFile('package.json', newPackageJson);
  }

  checkInstalledPackage(packageName: string) {
    const packageJson = this.getPackageJson();

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

      switch (this.folderService.getFileType(moduleFileName)) {
        case FileType.JSON: {
          if (moduleFileName === '.eslintrc.json') {
            const { sourceFile, targetFile } =
              this.getMergeFiles<Linter.Config>(moduleFileName, moduleFile);

            const newEslintConfig = this.eslintMergerService.mergeConfigs(
              targetFile,
              sourceFile
            );

            this.folderService.writeFile(moduleFileName, newEslintConfig);
            break;
          }

          if (moduleFileName === '.vscode/extensions.json') {
            const { sourceFile, targetFile } =
              this.getMergeFiles<VscodeExtensions>(moduleFileName, moduleFile);

            const newExtensions = this.vscodeExtensionMerger.mergeExtensions(
              targetFile,
              sourceFile
            );

            this.folderService.writeFile(moduleFileName, newExtensions);
            break;
          }

          if (moduleFileName === '.stylelintrc.json') {
            const { sourceFile, targetFile } =
              this.getMergeFiles<Configuration>(moduleFileName, moduleFile);

            const newStylelintConfig = this.stylelintMerger.mergeStyle(
              targetFile,
              sourceFile
            );

            this.folderService.writeFile(moduleFileName, newStylelintConfig);
            break;
          }

          if (!this.folderService.isExistFile(moduleFileName)) {
            this.folderService.writeFile(moduleFileName, {});
          }

          try {
            let result: AppObject = {};

            if (this.folderService.isExistFile(moduleFileName)) {
              result = this.folderService.mergeFiles(
                moduleFileName,
                moduleFile
              )!;
            } else {
              result = this.folderService.readFile(moduleFile, 'json')!;
            }

            this.folderService.writeFile(moduleFileName, result);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
          } catch (e: Error) {
            console.error(
              `Cannot merge the file: ${moduleFile} with ${moduleFileName}`
            );
            console.error(e);
            throw e;
          }
          break;
        }

        case FileType.JS:
        case FileType.GIT_IGNORE:
        case FileType.PRETTIER_IGNORE:
        case FileType.PRETTIER_RC:
        case FileType.NO_EXTENSION:
        case FileType.ESLINTIGNORE:
        case FileType.EDITORCONFIG: {
          if (moduleFileName.includes('.husky/')) {
            const hookName = moduleFileName.replace('.husky/', '');

            if (!this.checkInstalledPackage('husky')) {
              console.info(chalk.bold('\nInstalling husky'));
              const huskyResult = execSync('npm_config_yes=true npx husky-init')
                .toString()
                .split('\n')
                .join('\n  ');

              console.info(`  ${chalk.green('✓')} ${huskyResult}`);

              const huskyInstallResult = execSync('npm i husky').toString();
              console.info(`  ${chalk.green('✓')} ${huskyInstallResult}`);
            }

            console.info(chalk.bold('\nInstalling git hook:'), hookName);
            const huskyHookResult = execSync(
              `npm_config_yes=true npx husky add .husky/${hookName} 'echo "Error: no ${hookName} specified" && exit 1'`
            )
              .toString()
              .split('\n')
              .join(' ');

            console.info(`  ${chalk.green('✓')} ${huskyHookResult}`);
          }

          const mergeFiles = ['.gitignore', '.eslintignore', '.prettierignore'];

          if (mergeFiles.some((name) => moduleFileName.includes(name))) {
            const { sourceFile, targetFile } = this.getPlainMergeFiles(
              moduleFileName,
              moduleFile
            );

            const newIgnore = this.ignoreMerger.mergeFiles(
              targetFile,
              sourceFile
            );
            this.folderService.writeFile(moduleFileName, newIgnore);
            break;
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
    const isTargetFileExists = this.folderService.isExistFile(target);

    const targetFile = isTargetFileExists
      ? this.folderService.readFile<T>(target, 'json')
      : null;
    const sourceFile = this.folderService.readFile<T>(source, 'json')!;

    return {
      targetFile,
      sourceFile,
    };
  }

  getPlainMergeFiles(
    target: string,
    source: string
  ): { targetFile: string | null; sourceFile: string } {
    const isTargetFileExists = this.folderService.isExistFile(target);

    const targetFile = isTargetFileExists
      ? this.folderService.readFile<string>(target, 'text')
      : null;
    const sourceFile = this.folderService.readFile<string>(source, 'text')!;

    return {
      targetFile,
      sourceFile,
    };
  }

  getLintScript(modules: ChoiceModule[]) {
    /**
     * Iterating though modules
     * */
    const lintScriptItems = modules
      .map((module) => this.processModule(module))
      .filter((scripts) => scripts.length);

    const lintScriptNpmCommands = lintScriptItems.length
      ? lintScriptItems
          .reduce(reduceArray)
          .sort((a, b) => a.order - b.order)
          .map((lintItem: LintItem): BaseLintItem | boolean => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if ((lintItem as ConditionLintItem).when) {
              const conditionalLintItem = lintItem as ConditionLintItem;
              const isAvailable = conditionalLintItem.when(
                this.getPackageJson().devDependencies
              );

              if (isAvailable) {
                this.modifyPackageJson({
                  scripts: conditionalLintItem.additionalCommands,
                });
                return conditionalLintItem;
              }

              if (conditionalLintItem.instead) {
                this.modifyPackageJson({
                  scripts: conditionalLintItem.instead.additionalCommands,
                });
                return conditionalLintItem.instead;
              }

              return false;
            }

            return lintItem;
          })
          .filter(Boolean)
          .map((lintItem: BaseLintItem) => lintItem.npmRun)
      : null;

    return lintScriptNpmCommands
      ? lintScriptNpmCommands.reduce(reduceArray).join(' ')
      : null;
  }
}
