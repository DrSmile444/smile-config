import { ConfigItemModule } from '../../../src/interfaces';
import { EslintTypescriptModule } from './optional/typescript/module';

export class EslintModule implements ConfigItemModule {
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
