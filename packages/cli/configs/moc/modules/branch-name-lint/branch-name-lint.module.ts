import type {
  AbstractConfigItemModule,
  LintItem,
} from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class BranchNameLintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Branch Name Lint';
  description = 'Enforce branch name style';
  includeToLintScript: LintItem[] = [
    {
      npmRun: ['lint:branch-name'],
      order: 0,
    },
  ];

  constructor() {
    super(__dirname);
  }
}
