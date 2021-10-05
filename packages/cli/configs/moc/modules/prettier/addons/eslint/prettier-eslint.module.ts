import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class PrettierEslintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'eslint';

  constructor() {
    super(__dirname);
  }
}
