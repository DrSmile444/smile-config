import { BackendConfigModule, FrontendConfigModule } from '../configs/default';

export const builtInConfigs = [
  new FrontendConfigModule(),
  new BackendConfigModule(),
];
