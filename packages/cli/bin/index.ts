#!/usr/bin/env node
import { prompt } from 'inquirer';

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
  let config: AbstractConfigModule = builtInConfigs[FIRST_INDEX];

  if (builtInConfigs.length > MORE_THAN_ONE) {
    config = await prompt({
      type: 'list',
      name: 'config',
      message: 'Which style guide do you want to follow?',
      choices: builtInConfigs.map((choiceConfig) => ({
        name: `${choiceConfig.name}: ${choiceConfig.url}`,
        value: choiceConfig as AbstractConfigModule,
      })),
    }).then((result) => result.config as AbstractConfigModule);
  }

  let choice: ChoiceConfig<AbstractConfigModule> = config.choices[FIRST_INDEX];

  if (config.choices.length > MORE_THAN_ONE) {
    choice = await prompt({
      type: 'list',
      name: 'choice',
      message: 'Select one of the built-in configs',
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

  const modules = await prompt({
    type: 'checkbox',
    name: 'modules',
    message: 'Select one of the built-in configs',
    choices: config.modules.map((mapModules) => ({
      name: mapModules.name,
      value: mapModules,
    })),
  }).then((result) => result.modules as Newable<AbstractConfigItemModule>[]);

  const newModules: ChoiceModule[] = [];

  await (async () => {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of,@typescript-eslint/no-magic-numbers
    for (let i = 0; i < modules.length; i += 1) {
      const Module = modules[i];
      const module = new Module();

      if (module.addons) {
        const addonChoices = module.addons.map((mapAddonModule) => ({
          name: mapAddonModule.name,
          value: mapAddonModule,
        }));

        // eslint-disable-next-line no-await-in-loop
        const addons = await prompt({
          type: 'checkbox',
          name: 'modules',
          message: 'Select one of the built-in configs',
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

  console.info({
    config,
    choice,
    newModules,
  });
})().catch((error) => {
  throw error;
});
