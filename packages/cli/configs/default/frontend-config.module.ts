import * as chalk from 'chalk';

import type { AbstractConfigModule, ChoiceConfig } from '../../src/interfaces';
import { ChoiceType } from '../../src/interfaces';
import {
  BranchNameLintModule,
  CommitLintModule,
  defaultFrontendModules,
  EditorConfigModule,
  EslintAngularModule,
  EslintFrontendModule,
  EslintReactModule,
  EslintSmileStyleModule,
  EslintTypescriptImportsModule,
  EslintTypescriptModule,
  EslintVueModule,
  EslintVueTypescriptModule,
  HuskyModule,
  LintStagedModule,
  PrettierEslintModule,
  PrettierModule,
  PrettierStylelintModule,
  SmileTrackModule,
  StylelintAngularModule,
  StylelintModule,
  VscodeModule,
} from './modules';

export class FrontendConfigModule implements AbstractConfigModule {
  title = 'Frontend Recommended Tools';
  description = 'General Frontend, React, Vue, Angular, Typescript';

  modules = defaultFrontendModules;

  required = ['package.json'];

  choices: ChoiceConfig<FrontendConfigModule>[] = [
    {
      useClass: FrontendConfigModule,
      type: ChoiceType.FRONT_RECOMMENDED,
      name: `Front Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintFrontendModule,
          modules: [EslintSmileStyleModule],
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
      useClass: FrontendConfigModule,
      type: ChoiceType.FRONT_TYPESCRIPT_RECOMMENDED,
      name: `Front ${chalk.blue('Typescript')} Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintFrontendModule,
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
      useClass: FrontendConfigModule,
      type: ChoiceType.REACT_RECOMMENDED,
      name: `${chalk.cyan('React')} Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintFrontendModule,
          modules: [EslintReactModule, EslintSmileStyleModule],
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
      useClass: FrontendConfigModule,
      type: ChoiceType.REACT_TYPESCRIPT_EXPERIMENTAL,
      name: `${chalk.cyan('React')} ${chalk.blue(
        'Typescript'
      )} ${chalk.redBright('Experimental')}`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintFrontendModule,
          modules: [
            EslintReactModule,
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
      useClass: FrontendConfigModule,
      type: ChoiceType.VUE_RECOMMENDED,
      name: `${chalk.greenBright('Vue')} Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintFrontendModule,
          modules: [EslintVueModule, EslintSmileStyleModule],
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
      useClass: FrontendConfigModule,
      type: ChoiceType.VUE_TYPESCRIPT_EXPERIMENTAL,
      name: `${chalk.greenBright('Vue')} ${chalk.blue(
        'Typescript'
      )} ${chalk.redBright('Experimental')}`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintFrontendModule,
          modules: [
            EslintVueTypescriptModule,
            EslintTypescriptModule,
            EslintTypescriptImportsModule,
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
      useClass: FrontendConfigModule,
      type: ChoiceType.ANGULAR_TYPESCRIPT_RECOMMENDED,
      name: `Angular ${chalk.blue('Typescript')} Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintFrontendModule,
          modules: [
            EslintTypescriptModule,
            EslintTypescriptImportsModule,
            EslintSmileStyleModule,
            EslintAngularModule,
          ],
        },
        {
          useClass: StylelintModule,
          modules: [StylelintAngularModule],
        },
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
      useClass: FrontendConfigModule,
      type: ChoiceType.CUSTOM,
      name: 'Custom',
      modules: [],
    },
  ];
}
