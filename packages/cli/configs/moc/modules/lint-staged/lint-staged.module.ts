import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class LintStagedModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Lint Staged';
  description = 'Lint only changed files';

  constructor() {
    super(__dirname);
  }
}
