import { BranchNameLintModule } from './branch-name-lint/branch-name-lint.module';
import { CommitLintModule } from './commitlint/commitlint.module';
import { EditorConfigModule } from './editorconfig/editorconfig.module';
import { EslintModule } from './eslint/eslint.module';
import { HuskyModule } from './husky/husky.module';
import { LintStagedModule } from './lint-staged/lint-staged.module';
import { PrettierModule } from './prettier/prettier.module';
import { SmileTrackModule } from './smile-track/smile-track.module';
import { StylelintModule } from './stylelint/stylelint.module';

export const mocModules = [
  BranchNameLintModule,
  CommitLintModule,
  EditorConfigModule,
  EslintModule,
  HuskyModule,
  LintStagedModule,
  PrettierModule,
  SmileTrackModule,
  StylelintModule,
];

export * from './branch-name-lint/branch-name-lint.module';
export * from './commitlint/commitlint.module';
export * from './editorconfig/editorconfig.module';
export * from './eslint/eslint.module';
export * from './husky/husky.module';
export * from './lint-staged/lint-staged.module';
export * from './prettier/prettier.module';
export * from './smile-track/smile-track.module';
export * from './stylelint/stylelint.module';
