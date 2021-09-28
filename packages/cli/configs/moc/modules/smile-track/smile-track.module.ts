import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';
import { BaseConfigItemModule } from '../../../../src/base';

export class SmileTrackModule extends BaseConfigItemModule implements AbstractConfigItemModule {
  name = 'smile-track';

  constructor() {
    super(__dirname);
  }
}
