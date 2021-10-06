import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class SmileTrackModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Smile Track';
  description = 'Easy Jira time tracking';

  constructor() {
    super(__dirname);
  }
}
