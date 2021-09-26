import { EslintTypescriptModule } from './optional/typescript/eslint-typescript.module';
import { AbstractConfigItemModule } from '../../../../src/interfaces';

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
