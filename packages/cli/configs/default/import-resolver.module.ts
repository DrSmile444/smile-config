import type { AbstractConfigModule, ChoiceConfig } from '../../src/interfaces';
import { ChoiceType } from '../../src/interfaces';
import { EslintAliasAutoResolverModule } from './modules';

export class ImportResolverModule implements AbstractConfigModule {
  title = 'Import Alias Resolver for ESLint';
  description = 'Resolve your aliases from jsconfig or in manual way';

  modules = [EslintAliasAutoResolverModule];

  required = ['package.json'];

  choices: ChoiceConfig<ImportResolverModule>[] = [
    {
      useClass: ImportResolverModule,
      type: ChoiceType.NODE_RECOMMENDED,
      name: 'Auto Config - Resolves everything but itself',
      modules: [
        {
          useClass: EslintAliasAutoResolverModule,
          modules: [EslintAliasAutoResolverModule],
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
