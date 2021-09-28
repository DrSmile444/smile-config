import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';
import { BaseConfigItemModule } from '../../../../src/base';

export class EditorConfigModule extends BaseConfigItemModule implements AbstractConfigItemModule {
  name = 'editorconfig';

  constructor() {
    super(__dirname);
  }
}
