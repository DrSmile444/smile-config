import * as chalk from 'chalk';

import type { AbstractConfigModule, ChoiceConfig } from '../../src/interfaces';
import { ChoiceType } from '../../src/interfaces';
import {
  BranchNameLintModule,
  CommitLintModule,
  defaultBackendModules,
  EditorConfigModule,
  EslintModule,
  EslintNodeModule,
  EslintSmileStyleModule,
  EslintTypescriptImportsModule,
  EslintTypescriptModule,
  HuskyModule,
  LintStagedModule,
  PrettierEslintModule,
  PrettierModule,
  SmileTrackModule,
  VscodeModule,
} from './modules';

export class BackendConfigModule implements AbstractConfigModule {
  title = 'Backend Recommended Tools';
  description = 'Basic Node.js and TypeScript';

  modules = defaultBackendModules;

  required = ['package.json'];

  choices: ChoiceConfig<BackendConfigModule>[] = [
    {
      useClass: BackendConfigModule,
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
      useClass: BackendConfigModule,
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
    // {
    //   useClass: FrontendConfigModule,
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
      useClass: BackendConfigModule,
      type: ChoiceType.CUSTOM,
      name: 'Custom',
      modules: [],
    },
  ];
}
