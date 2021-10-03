import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class LintStagedModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  name = 'lint-staged';

  constructor() {
    super(__dirname);
  }
}
