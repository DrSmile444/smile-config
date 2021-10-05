import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class EditorConfigModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Editorconfig';
  description = 'IDE configuration';

  constructor() {
    super(__dirname);
  }
}
