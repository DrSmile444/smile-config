import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class BranchNameLintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  name = 'branch-name-lint';
  includeToLintScript = [
    {
      command: 'lint:branch-name',
      order: 0,
    },
  ];

  constructor() {
    super(__dirname);
  }
}
