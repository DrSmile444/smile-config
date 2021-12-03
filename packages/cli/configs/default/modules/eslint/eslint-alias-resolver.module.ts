import type {
  AbstractConfigItemModule,
  LintItem,
} from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';
import {
  EslintAliasAutoResolverModule,
  EslintNodeModule,
  EslintSmileStyleModule,
  EslintTypescriptImportsModule,
  EslintTypescriptModule,
} from './addons';

export class EslintAliasResolverModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint';
  description = 'Alias Auto Resolver';
  addons = [EslintAliasAutoResolverModule];

  constructor() {
    super(__dirname);
  }
}
