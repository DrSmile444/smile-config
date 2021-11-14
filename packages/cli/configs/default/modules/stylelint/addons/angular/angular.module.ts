import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class StylelintAngularModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Stylelint: Angular';
  description = 'Handles ng-deep';

  constructor() {
    super(__dirname);
  }
}
