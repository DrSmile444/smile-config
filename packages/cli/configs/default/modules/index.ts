import { BranchNameLintModule } from './branch-name-lint/branch-name-lint.module';
import { CommitLintModule } from './commitlint/commitlint.module';
import { EditorConfigModule } from './editorconfig/editorconfig.module';
import { EslintBackendModule } from './eslint/eslint-backend.module';
import { EslintFrontendModule } from './eslint/eslint-frontend.module';
import { HuskyModule } from './husky/husky.module';
import { LintStagedModule } from './lint-staged/lint-staged.module';
import { PrettierModule } from './prettier/prettier.module';
import { SmileTrackModule } from './smile-track/smile-track.module';
import { StylelintModule } from './stylelint/stylelint.module';
import { VscodeModule } from './vscode/vscode.module';

export const defaultFrontendModules = [
  BranchNameLintModule,
  CommitLintModule,
  EditorConfigModule,
  EslintFrontendModule,
  HuskyModule,
  LintStagedModule,
  PrettierModule,
  SmileTrackModule,
  StylelintModule,
  VscodeModule,
];

export const defaultBackendModules = [
  BranchNameLintModule,
  CommitLintModule,
  EditorConfigModule,
  EslintBackendModule,
  HuskyModule,
  LintStagedModule,
  PrettierModule,
  SmileTrackModule,
  VscodeModule,
];

export * from './branch-name-lint/branch-name-lint.module';
export * from './commitlint/commitlint.module';
export * from './editorconfig/editorconfig.module';
export * from './eslint';
export * from './eslint/eslint-backend.module';
export * from './eslint/eslint-frontend.module';
export * from './husky/husky.module';
export * from './lint-staged/lint-staged.module';
export * from './prettier';
export * from './prettier/prettier.module';
export * from './smile-track/smile-track.module';
export * from './stylelint/addons';
export * from './stylelint/stylelint.module';
export * from './vscode/vscode.module';
