import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class PrettierStylelintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  name = 'stylelint';

  constructor() {
    super(__dirname);
  }
}
