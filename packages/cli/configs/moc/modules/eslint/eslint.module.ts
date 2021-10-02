import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { EslintTypescriptModule } from './optional/typescript/eslint-typescript.module';
import { BaseConfigItemModule } from '../../../../src/base';

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

  constructor(
    public modules: any[],
  ) {
    super(__dirname);
  }
}
