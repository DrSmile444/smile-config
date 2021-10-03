import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class CommitLintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  name = 'commitlint';

  constructor() {
    super(__dirname);
  }
}
