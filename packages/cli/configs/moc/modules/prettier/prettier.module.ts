import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { PrettierEslintModule } from './optional/eslint/prettier-eslint.module';
import { PrettierStylelintModule } from './optional/stylelint/prettier-stylelint.module';

export class PrettierModule implements AbstractConfigItemModule {
  name = 'prettier';

  optional = [
    PrettierEslintModule,
    PrettierStylelintModule,
  ];
}
