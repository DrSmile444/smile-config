import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintSmileStyleModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint: Smile Style';
  description = 'Smile config';

  constructor() {
    super(__dirname);
  }
}
