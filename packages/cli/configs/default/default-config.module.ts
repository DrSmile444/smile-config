import type { AbstractConfigModule, ChoiceConfig } from '../../src/interfaces';
import { ChoiceType } from '../../src/interfaces';
import {
  BranchNameLintModule,
  CommitLintModule,
  defaultModules,
  EditorConfigModule,
  EslintModule,
  EslintSmileStyleModule,
  EslintTypescriptImportsModule,
  EslintTypescriptModule,
  HuskyModule,
  LintStagedModule,
  PrettierEslintModule,
  PrettierModule,
  PrettierStylelintModule,
  SmileTrackModule,
  StylelintModule,
} from './modules';

export class DefaultConfigModule implements AbstractConfigModule {
  title = 'Smile Config';
  url = 'https://github.com/DrSmile444';

  modules = defaultModules;

  required = ['package.json'];

  choices: ChoiceConfig<DefaultConfigModule>[] = [
    {
      useClass: DefaultConfigModule,
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
      useClass: DefaultConfigModule,
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
      useClass: DefaultConfigModule,
      type: ChoiceType.CUSTOM,
      modules: [],
    },
  ];
}
