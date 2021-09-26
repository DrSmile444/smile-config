import { AbstractConfigModule } from '../../src/interfaces';

import { BranchNameLintModule } from './branch-name-lint/branch-name-lint.module';
import { CommitLintModule } from './commitlint/commitlint.module';
import { EditorConfigModule } from './editorconfig/editorconfig.module';
import { EslintModule } from './eslint/eslint.module';
import { HuskyModule } from './husky/husky.module';
import { LintStagedModule } from './lint-staged/lint-staged.module';
import { PrettierModule } from './prettier/prettier.module';
import { SmileTrackModule } from './smile-track/smile-track.module';
import { StylelintModule } from './stylelint/stylelint.module';

export class ConfigModule implements AbstractConfigModule {
  modules = [
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
}
