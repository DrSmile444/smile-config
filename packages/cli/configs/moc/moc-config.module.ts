import { AbstractConfigModule } from '../../src/interfaces';

import { modules } from './modules';

export class MocConfigModule implements AbstractConfigModule {
  modules = modules;
}
