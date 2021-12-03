import { BackendConfigModule } from './backend-config.module';
import { FrontendConfigModule } from './frontend-config.module';
import { ImportResolverModule } from './import-resolver.module';

export const defaultConfigs = [
  new FrontendConfigModule(),
  new BackendConfigModule(),
  new ImportResolverModule(),
];

export * from './backend-config.module';
export * from './frontend-config.module';
export * from './import-resolver.module';
