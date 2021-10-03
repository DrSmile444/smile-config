import type {
  AbstractConfigItemModule,
  LintItem,
} from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class BranchNameLintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  name = 'branch-name-lint';
  includeToLintScript: LintItem[] = [
    {
      npmRun: 'lint:branch-name',
      order: 0,
    },
  ];

  constructor() {
    super(__dirname);
  }
}
