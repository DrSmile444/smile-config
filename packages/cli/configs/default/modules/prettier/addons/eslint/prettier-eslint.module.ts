import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class PrettierEslintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Prettier: ESLint';
  description = 'Prettier integration with ESLint';

  constructor() {
    super(__dirname);
  }
}
