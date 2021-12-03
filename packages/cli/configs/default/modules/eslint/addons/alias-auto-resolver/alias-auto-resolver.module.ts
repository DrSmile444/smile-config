import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintAliasAutoResolverModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint: Import Alias Auto Resolver';
  description = 'Auto resolves jsconfig or fallback to manual import/resolver';

  constructor() {
    super(__dirname);
  }
}
