#!/usr/bin/env node
import { prompt } from 'inquirer';
import { builtInConfigs } from '../src';

(async () => {

  let config = builtInConfigs[0];

  if (builtInConfigs.length > 1) {
    config = await prompt({
      type: 'list',
      name: 'configIndex',
      message: 'Which style guide do you want to follow?',
      choices: builtInConfigs.map((config, index) => ({
        name: `${config.name}: ${config.url}`,
        value: String(index),
      })),
    }).then((value: Record<any, any>) => builtInConfigs[+value.configIndex]);
  }

  console.log(config);
})();
