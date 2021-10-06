import type {
  AbstractConfigItemModule,
  LintItem,
} from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class StylelintModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Stylelint';
  description = 'Enforce CSS style style';
  includeToLintScript: LintItem[] = [
    {
      npmRun: ['lint:styles'],
      order: 5,
    },
  ];

  constructor() {
    super(__dirname);
  }
}
