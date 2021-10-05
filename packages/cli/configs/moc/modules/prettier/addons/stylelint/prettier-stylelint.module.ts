import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class PrettierStylelintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Prettier: Stylelint';
  description = 'Prettier integration with Stylelint';

  constructor() {
    super(__dirname);
  }
}
