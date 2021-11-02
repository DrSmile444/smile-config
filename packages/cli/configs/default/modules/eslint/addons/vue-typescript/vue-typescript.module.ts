import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintVueTypescriptModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint: Vue TypeScript';
  description = 'Airbnb, Vue TypeScript';

  constructor() {
    super(__dirname);
  }
}
