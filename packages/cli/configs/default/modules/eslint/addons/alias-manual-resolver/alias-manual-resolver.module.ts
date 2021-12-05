import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintAliasManualResolverModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint: Import Alias Manual Resolver';
  description = 'Manual enter aliases';

  constructor() {
    super(__dirname);
  }
}
