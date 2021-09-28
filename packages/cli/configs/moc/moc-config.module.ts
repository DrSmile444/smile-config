import { AbstractConfigModule, ChoiceType } from '../../src/interfaces';

import {
  BranchNameLintModule,
  CommitLintModule,
  EditorConfigModule,
  EslintModule,
  HuskyModule,
  LintStagedModule,
  mocModules,
  PrettierModule,
  SmileTrackModule,
  StylelintModule,
} from './modules';
import { EslintTypescriptModule } from './modules/eslint/optional/typescript/eslint-typescript.module';
import { PrettierEslintModule } from './modules/prettier/optional/eslint/prettier-eslint.module';
import { PrettierStylelintModule } from './modules/prettier/optional/stylelint/prettier-stylelint.module';

export class MocConfigModule implements AbstractConfigModule {
  name = 'MOC Global';
  url = 'https://masterofcode.com';

  modules = mocModules;

  choices = [
    {
      useClass: MocConfigModule,
      type: ChoiceType.RECOMMENDED,
      modules: [
        new BranchNameLintModule(),
        new CommitLintModule(),
        new EditorConfigModule(),
        new EslintModule([
          new EslintTypescriptModule(),
        ]),
        new StylelintModule(),
        new PrettierModule([
          new PrettierEslintModule(),
          new PrettierStylelintModule(),
        ]),
        new HuskyModule(),
        new LintStagedModule(),
        new SmileTrackModule(),
      ]
    }
  ]
}
