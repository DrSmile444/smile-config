import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';
import { BaseConfigItemModule } from '../../../../src/base';

export class HuskyModule extends BaseConfigItemModule implements AbstractConfigItemModule {
  name = 'husky';

  constructor() {
    super(__dirname);
  }
}
