import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class HuskyModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'husky';

  constructor() {
    super(__dirname);
  }
}
