#!/usr/bin/env node
import * as chalk from 'chalk';
import { prompt, registerPrompt, Separator } from 'inquirer';
import * as inquirer from 'inquirer';

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

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-var-requires
registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

interface Option<T> {
  value: T;
  name: string;
}

const useAutocomplete =
  (values: (Option<any> | unknown)[]) =>
  (autocomplete, input: string): (Option<any> | unknown)[] =>
    input
      ? values.filter((localConfig) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          localConfig?.name?.toLowerCase().includes(input.toLowerCase())
        )
      : values;

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
    const configChoices = builtInConfigs.map((choiceConfig) => ({
      name: `${choiceConfig.title} - ${chalk.gray(choiceConfig.description)}`,
      value: choiceConfig as AbstractConfigModule,
    }));

    config = await prompt({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      type: 'autocomplete',
      name: 'config',
      message: '📝 Which style guide do you want to follow?',
      choices: configChoices,
      source: useAutocomplete(configChoices),
    }).then((result) => result.config as AbstractConfigModule);
  }

  /**
   * Choice select
   * */
  let choice: ChoiceConfig<AbstractConfigModule> = config.choices[FIRST_INDEX];

  const choicesChoices = [
    new inquirer.Separator(),
    ...config.choices.map((mapChoice) => ({
      name: mapChoice.name,
      value: mapChoice,
    })),
  ];

  if (config.choices.length > MORE_THAN_ONE) {
    choice = await prompt({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      type: 'autocomplete',
      name: 'choice',
      message: '🔧 Select one of the built-in configs:',
      choices: choicesChoices,
      source: useAutocomplete(choicesChoices),
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
    ...config.modules.map((MapModule): inquirer.CheckboxChoiceOptions => {
      const mapModule = new MapModule();
      return {
        name: `${chalk.bold(mapModule.title)} - ${chalk.gray(
          mapModule.description
        )}`,
        short: mapModule.title,
        value: MapModule,
        checked: true,
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
            (MapAddonModule): inquirer.CheckboxChoiceOptions => {
              const mapAddonModule = new MapAddonModule();

              return {
                name: `${chalk.bold(mapAddonModule.title)} - ${chalk.gray(
                  mapAddonModule.description
                )}`,
                short: mapAddonModule.title,
                value: MapAddonModule,
                checked: true,
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
