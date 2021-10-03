import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class StylelintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  name = 'stylelint';
  includeToLintScript = [
    {
      command: 'lint:styles',
      order: 5,
    },
  ];

  constructor() {
    super(__dirname);
  }
}
