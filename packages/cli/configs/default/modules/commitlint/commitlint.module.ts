import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class CommitLintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Commitlint';
  description = 'Enforce commit name style';

  constructor() {
    super(__dirname);
  }
}
