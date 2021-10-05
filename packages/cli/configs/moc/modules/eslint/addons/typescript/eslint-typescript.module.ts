import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintTypescriptModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'typescript';

  constructor() {
    super(__dirname);
  }
}
