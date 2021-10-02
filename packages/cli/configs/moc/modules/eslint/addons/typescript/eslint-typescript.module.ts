import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';
import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintTypescriptModule extends BaseConfigItemModule implements AbstractConfigItemModule {
  name = 'typescript';

  constructor() {
    super(__dirname);
  }
}
