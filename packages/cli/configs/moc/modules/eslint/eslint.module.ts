import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';
import { EslintTypescriptModule } from './addons';

export class EslintModule extends BaseConfigItemModule implements AbstractConfigItemModule {
  name = 'eslint';

  addons = [
    EslintTypescriptModule,
  ];

  includeToLintScript = [
    {
      command: 'lint:js',
      order: 10,
    }
  ];

  constructor() {
    super(__dirname);
  }
}
