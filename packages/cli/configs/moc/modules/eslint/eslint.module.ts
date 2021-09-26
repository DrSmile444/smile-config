import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { EslintTypescriptModule } from './optional/typescript/eslint-typescript.module';

export class EslintModule implements AbstractConfigItemModule {
  name = 'eslint';

  optional = [
    EslintTypescriptModule,
  ];

  includeToLintScript = [
    {
      command: 'lint:js',
      order: 10,
    }
  ];
}
