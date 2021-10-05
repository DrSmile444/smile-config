import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';
import { prettierAddons } from './addons';

export class PrettierModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'prettier';
  addons = prettierAddons;

  constructor(public modules: typeof prettierAddons) {
    super(__dirname);
  }
}
