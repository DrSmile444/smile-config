import { AbstractConfigModule } from '../../src/interfaces';

import { modules } from './modules';

export class ConfigModule implements AbstractConfigModule {
  modules = modules;
}
