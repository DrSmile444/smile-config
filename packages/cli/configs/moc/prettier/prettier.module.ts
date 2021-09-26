import { ConfigItemModule } from '../../../src/interfaces';
import { PrettierEslintModule } from './optional/eslint/prettier-eslint.module';
import { PrettierStylelintModule } from './optional/stylelint/prettier-stylelint.module';

export class PrettierModule implements ConfigItemModule {
  name = 'prettier';

  optional = [
    PrettierEslintModule,
    PrettierStylelintModule,
  ];
}
