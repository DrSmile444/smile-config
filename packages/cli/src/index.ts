import { MocConfigModule } from '../configs/moc';
import { configService } from './core/services';

export const builtInConfigs = [
  new MocConfigModule(),
];

configService.applyConfig(new MocConfigModule().choices[0])
