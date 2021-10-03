#!/usr/bin/env node
import { prompt } from 'inquirer';

import { builtInConfigs } from '../src';
import { FIRST_INDEX, MORE_THEN_ONE } from '../src/const';

(async () => {
  let config = builtInConfigs[FIRST_INDEX];

  if (builtInConfigs.length > MORE_THEN_ONE) {
    config = await prompt({
      type: 'list',
      name: 'configIndex',
      message: 'Which style guide do you want to follow?',
      choices: builtInConfigs.map((choiceConfig, index) => ({
        name: `${choiceConfig.name}: ${choiceConfig.url}`,
        value: String(index),
      })),
    }).then((value: Record<any, any>) => builtInConfigs[+value.configIndex]);
  }
})().catch((error) => {
  throw error;
});
