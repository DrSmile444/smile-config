import { PrettierEslintModule } from './eslint/prettier-eslint.module';
import { PrettierStylelintModule } from './stylelint/prettier-stylelint.module';

export const prettierAddons = [
  PrettierEslintModule,
  PrettierStylelintModule,
];

export * from './stylelint/prettier-stylelint.module';
export * from './eslint/prettier-eslint.module';
