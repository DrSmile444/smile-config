import { AbstractConfigModule } from '@smile-config/cli/interfaces';

import { modules } from './modules';

export class MocConfigModule implements AbstractConfigModule {
  name = 'MOC Global';
  url = 'https://masterofcode.com';

  modules = modules;
}
