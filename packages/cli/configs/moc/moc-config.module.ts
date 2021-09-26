import { AbstractConfigModule } from '@smile-config/cli/interfaces';

import { modules } from './modules';

export class MocConfigModule implements AbstractConfigModule {
  modules = modules;
}
