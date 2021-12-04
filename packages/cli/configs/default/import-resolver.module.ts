import type { AbstractConfigModule, ChoiceConfig } from '../../src/interfaces';
import { ChoiceType } from '../../src/interfaces';
import {
  EslintAliasAutoResolverModule,
  EslintAliasJsconfigResolverModule,
  EslintAliasManualResolverModule,
} from './modules';
import { EslintAliasResolverModule } from './modules/eslint/eslint-alias-resolver.module';

export class ImportResolverModule implements AbstractConfigModule {
  title = 'Import Alias Resolver for ESLint';
  description = 'Resolve your aliases from jsconfig or in manual way';

  modules = [EslintAliasAutoResolverModule];

  required = ['package.json'];

  choices: ChoiceConfig<ImportResolverModule>[] = [
    {
      useClass: ImportResolverModule,
      type: ChoiceType.ALIAS_AUTO,
      name: 'Auto Resolver - Tries to find the correct resolver itself',
      modules: [
        {
          useClass: EslintAliasResolverModule,
          modules: [EslintAliasAutoResolverModule],
        },
      ],
    },
    {
      useClass: ImportResolverModule,
      type: ChoiceType.ALIAS_JSCONFIG,
      name: 'JSConfig Resolver - Resolves aliases from jsconfig.json',
      modules: [
        {
          useClass: EslintAliasResolverModule,
          modules: [EslintAliasJsconfigResolverModule],
        },
      ],
    },
    {
      useClass: ImportResolverModule,
      type: ChoiceType.ALIAS_MANUAL,
      name: 'Import Resolver - Manual enter aliases in ESLint',
      modules: [
        {
          useClass: EslintAliasResolverModule,
          modules: [EslintAliasManualResolverModule],
        },
      ],
    },
    {
      useClass: ImportResolverModule,
      type: ChoiceType.CUSTOM,
      name: 'Custom',
      modules: [],
    },
  ];
}
