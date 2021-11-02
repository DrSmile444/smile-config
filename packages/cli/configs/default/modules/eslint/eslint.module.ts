import type {
  AbstractConfigItemModule,
  LintItem,
} from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';
import {
  EslintNodeModule,
  EslintReactModule,
  EslintSmileStyleModule,
  EslintTypescriptImportsModule,
  EslintTypescriptModule,
  EslintVueModule,
} from './addons';

export class EslintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint';
  description = 'Enforce JS code style, best practices';
  addons = [
    EslintNodeModule,
    EslintReactModule,
    EslintVueModule,
    EslintTypescriptModule,
    EslintTypescriptImportsModule,
    EslintSmileStyleModule,
  ];

  includeToLintScript: LintItem[] = [
    {
      npmRun: ['lint:js'],
      order: 10,
      additionalCommands: {
        'lint:js': 'eslint . --cache',
        'lint:js:fix': 'npm run lint:js -- --fix',
      },
      when: (packages) => !!packages && !packages['@nrwl/cli'],
      instead: {
        npmRun: ['lint:workspace', 'affected:lint'],
        order: 10,
        additionalCommands: {
          'lint:workspace': 'nx workspace-lint',
          'affected:lint':
            'nx affected:lint --parallel --maxParallel=5 --cache',
          'affected:lint:fix':
            'nx affected:lint --parallel --maxParallel=5 --cache --fix',
        },
      },
    },
  ];

  constructor() {
    super(__dirname);
  }
}
