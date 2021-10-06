import type { AbstractConfigModule, ChoiceConfig } from '../../src/interfaces';
import { ChoiceType } from '../../src/interfaces';
import {
  BranchNameLintModule,
  CommitLintModule,
  EditorConfigModule,
  EslintModule,
  EslintSmileStyleModule,
  EslintTypescriptImportsModule,
  EslintTypescriptModule,
  HuskyModule,
  LintStagedModule,
  mocModules,
  PrettierEslintModule,
  PrettierModule,
  PrettierStylelintModule,
  SmileTrackModule,
  StylelintModule,
} from './modules';

export class MocConfigModule implements AbstractConfigModule {
  title = 'MOC Global';
  url = 'https://masterofcode.com';

  modules = mocModules;

  required = ['package.json'];

  choices: ChoiceConfig<MocConfigModule>[] = [
    {
      useClass: MocConfigModule,
      type: ChoiceType.FRONT_RECOMMENDED,
      modules: [
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintModule,
          modules: [
            EslintTypescriptModule,
            EslintTypescriptImportsModule,
            EslintSmileStyleModule,
          ],
        },
        StylelintModule,
        {
          useClass: PrettierModule,
          modules: [PrettierEslintModule, PrettierStylelintModule],
        },
        HuskyModule,
        LintStagedModule,
        SmileTrackModule,
      ],
    },
    {
      useClass: MocConfigModule,
      type: ChoiceType.NODE_RECOMMENDED,
      modules: [
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintModule,
          modules: [
            EslintTypescriptModule,
            EslintTypescriptImportsModule,
            EslintSmileStyleModule,
          ],
        },
        {
          useClass: PrettierModule,
          modules: [PrettierEslintModule],
        },
        HuskyModule,
        LintStagedModule,
        SmileTrackModule,
      ],
    },
    {
      useClass: MocConfigModule,
      type: ChoiceType.CUSTOM,
      modules: [],
    },
  ];
}
