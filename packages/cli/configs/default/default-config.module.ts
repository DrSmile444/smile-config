import * as chalk from 'chalk';

import type { AbstractConfigModule, ChoiceConfig } from '../../src/interfaces';
import { ChoiceType } from '../../src/interfaces';
import {
  BranchNameLintModule,
  CommitLintModule,
  defaultModules,
  EditorConfigModule,
  EslintAngularModule,
  EslintModule,
  EslintNodeModule,
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

export class DefaultConfigModule implements AbstractConfigModule {
  title = 'Smile Config';
  url = 'https://github.com/DrSmile444';

  modules = defaultModules;

  required = ['package.json'];

  choices: ChoiceConfig<DefaultConfigModule>[] = [
    {
      useClass: DefaultConfigModule,
      type: ChoiceType.FRONT_RECOMMENDED,
      name: `Front Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintModule,
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
      useClass: DefaultConfigModule,
      type: ChoiceType.NODE_RECOMMENDED,
      name: `${chalk.green('Node')} Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintModule,
          modules: [EslintNodeModule, EslintSmileStyleModule],
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
      type: ChoiceType.REACT_RECOMMENDED,
      name: `${chalk.cyan('React')} Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintModule,
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
      useClass: DefaultConfigModule,
      type: ChoiceType.VUE_RECOMMENDED,
      name: `${chalk.greenBright('Vue')} Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintModule,
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
      useClass: DefaultConfigModule,
      type: ChoiceType.FRONT_TYPESCRIPT_RECOMMENDED,
      name: `Front ${chalk.blue('Typescript')} Recommended`,
      modules: [
        VscodeModule,
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
      type: ChoiceType.ANGULAR_TYPESCRIPT_RECOMMENDED,
      name: `Angular ${chalk.blue('Typescript')} Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintModule,
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
      useClass: DefaultConfigModule,
      type: ChoiceType.NODE_TYPESCRIPT_RECOMMENDED,
      name: `${chalk.green('Node')} ${chalk.blue('Typescript')} Recommended`,
      modules: [
        VscodeModule,
        BranchNameLintModule,
        CommitLintModule,
        EditorConfigModule,
        {
          useClass: EslintModule,
          modules: [
            EslintNodeModule,
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
          useClass: EslintModule,
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
      useClass: DefaultConfigModule,
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
          useClass: EslintModule,
          modules: [
            EslintVueTypescriptModule,
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
    // {
    //   useClass: DefaultConfigModule,
    //   type: ChoiceType.NODE_MA_RECOMMENDED,
    //   name: `${chalk.green('Node')} ${chalk.yellow(
    //     'Masters Academy'
    //   )} Recommended`,
    //   modules: [
    //     VscodeModule,
    //     EditorConfigModule,
    //     {
    //       useClass: EslintModule,
    //       modules: [EslintNodeModule],
    //     },
    //     {
    //       useClass: PrettierModule,
    //       modules: [PrettierEslintModule],
    //     },
    //     HuskyModule,
    //     LintStagedModule,
    //   ],
    // },
    {
      useClass: DefaultConfigModule,
      type: ChoiceType.CUSTOM,
      name: 'Custom',
      modules: [],
    },
  ];
}
