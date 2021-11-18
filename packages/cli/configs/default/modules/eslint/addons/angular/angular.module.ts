import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintAngularModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint: Angular';
  description = '@angular-eslint';

  constructor() {
    super(__dirname);
  }
}
