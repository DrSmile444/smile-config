import type {
  AbstractConfigItemModule,
  LintItem,
} from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';
import { EslintTypescriptModule } from './addons';

export class EslintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'eslint';
  addons = [EslintTypescriptModule];
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
