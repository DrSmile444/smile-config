import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';
import { prettierAddons } from './addons';

export class PrettierModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'Prettier';
  description = 'Enforce code formatting';
  addons = prettierAddons;

  constructor(public modules: typeof prettierAddons) {
    super(__dirname);
  }
}
