import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintAliasJsconfigResolverModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint: Import Alias JSConfig Resolver';
  description = 'Auto resolves jsconfig';

  constructor() {
    super(__dirname);
  }
}
