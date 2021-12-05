import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';
import {
  EslintAliasAutoResolverModule,
  EslintAliasJsconfigResolverModule,
  EslintAliasManualResolverModule,
} from './addons';

export class EslintAliasResolverModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint';
  description = 'Alias Auto Resolver';
  addons = [
    EslintAliasAutoResolverModule,
    EslintAliasJsconfigResolverModule,
    EslintAliasManualResolverModule,
  ];

  constructor() {
    super(__dirname);
  }
}
