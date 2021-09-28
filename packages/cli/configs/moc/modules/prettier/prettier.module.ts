import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { PrettierEslintModule } from './optional/eslint/prettier-eslint.module';
import { PrettierStylelintModule } from './optional/stylelint/prettier-stylelint.module';
import { BaseConfigItemModule } from '../../../../src/base';

export class PrettierModule extends BaseConfigItemModule implements AbstractConfigItemModule {
  name = 'prettier';

  optional = [
    PrettierEslintModule,
    PrettierStylelintModule,
  ];

  constructor(public modules: any[]) {
    super(__dirname);
  }
}
