import type {
  AbstractConfigItemModule,
  LintItem,
} from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';
import { StylelintAngularModule } from './addons';

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

  addons = [StylelintAngularModule];

  constructor() {
    super(__dirname);
  }
}
