#!/usr/bin/env node
import * as chalk from 'chalk';
import { prompt, Separator } from 'inquirer';
import type * as inquirer from 'inquirer';

import { builtInConfigs } from '../src';
import { FIRST_INDEX, MORE_THAN_ONE } from '../src/const';
import { configService } from '../src/core/services';
import { ChoiceType } from '../src/interfaces';
import type {
  AbstractConfigItemModule,
  AbstractConfigModule,
  ChoiceConfig,
  ChoiceItemConfig,
  ChoiceModule,
  Newable,
} from '../src/interfaces';

(async () => {
  /**
   * Start
   * */
  console.info(`Welcome to ${chalk.bold('Smile Config')}!\n`);

  /**
   * Config select
   * */
  let config: AbstractConfigModule = builtInConfigs[FIRST_INDEX];

  if (builtInConfigs.length > MORE_THAN_ONE) {
    config = await prompt({
      type: 'list',
      name: 'config',
      message: '📝 Which style guide do you want to follow?',
      choices: builtInConfigs.map((choiceConfig) => ({
        name: `${choiceConfig.title}: ${choiceConfig.url}`,
        value: choiceConfig as AbstractConfigModule,
      })),
    }).then((result) => result.config as AbstractConfigModule);
  }

  /**
   * Choice select
   * */
  let choice: ChoiceConfig<AbstractConfigModule> = config.choices[FIRST_INDEX];

  if (config.choices.length > MORE_THAN_ONE) {
    choice = await prompt({
      type: 'list',
      name: 'choice',
      message: '🔧 Select one of the built-in configs:',
      choices: config.choices.map((mapChoice) => ({
        name: mapChoice.type,
        value: mapChoice,
      })),
    }).then((result) => result.choice as ChoiceConfig<AbstractConfigModule>);
  }

  if (choice.type !== ChoiceType.CUSTOM) {
    configService.applyConfig(choice);
    return;
  }

  /**
   * Modules select
   * */
  const modulesChoices = [
    new Separator(),
    ...config.modules.map((MapModule): inquirer.ChoiceOptions => {
      const mapModule = new MapModule();
      return {
        name: `${chalk.bold(mapModule.title)} - ${chalk.gray(
          mapModule.description
        )}`,
        short: mapModule.title,
        value: MapModule,
      };
    }),
  ];

  const modules = await prompt({
    type: 'checkbox',
    name: 'modules',
    message: '📌 Select modules you want to use:',
    choices: modulesChoices,
    pageSize: 10,
  }).then((result) => result.modules as Newable<AbstractConfigItemModule>[]);

  const newModules: ChoiceModule[] = [];

  /**
   * Addons select
   * */
  const addonsModules = modules
    .map((Module) => ({
      construct: Module,
      instance: new Module(),
    }))
    .filter(({ instance }) => instance.addons && !!instance.addons.length);

  if (addonsModules.length) {
    // eslint-disable-next-line prettier/prettier
    console.info('\n\n📎 There are addons for modules');

    console.info(`\n${chalk.bold('Modules')}`);

    addonsModules.forEach((module) => {
      console.info(`  ${chalk.green(module.instance.title)}`);
    });

    console.info('');

    await (async () => {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of,@typescript-eslint/no-magic-numbers
      for (let i = 0; i < modules.length; i += 1) {
        const Module = modules[i];
        const module = new Module();

        if (module.addons) {
          const addonChoices = module.addons.map(
            (MapAddonModule): inquirer.ChoiceOptions => {
              const mapAddonModule = new MapAddonModule();

              return {
                name: `${chalk.bold(mapAddonModule.title)} - ${chalk.gray(
                  mapAddonModule.description
                )}`,
                short: mapAddonModule.title,
                value: MapAddonModule,
              };
            }
          );

          // eslint-disable-next-line no-await-in-loop
          const addons = await prompt({
            type: 'checkbox',
            name: 'modules',
            message: `📎 Select addons for ${chalk.green.bold(
              module.title
            )} module:`,
            choices: addonChoices,
          }).then(
            (result) => result.modules as Newable<AbstractConfigItemModule>[]
          );

          const choiceItem: ChoiceItemConfig<AbstractConfigItemModule> = {
            useClass: Module,
            modules: addons,
          };

          newModules.push(addons.length ? choiceItem : Module);
        }

        newModules.push(Module);
      }
    })();
  }

  configService.applyConfig({
    ...choice,
    modules: newModules,
  });
})().catch((error) => {
  throw error;
});
