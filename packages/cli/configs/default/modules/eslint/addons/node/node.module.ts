import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintNodeModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint: Node';
  description = 'Airbnb base';

  constructor() {
    super(__dirname);
  }
}
