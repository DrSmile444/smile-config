import { MocConfigModule } from '../configs/moc';
import { configService } from './core/services';

export const builtInConfigs = [new MocConfigModule()];

// TODO remove this mock
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
// configService.applyConfig(new MocConfigModule().choices[1]);
