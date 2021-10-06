import { DefaultConfigModule } from '../configs/default';
import { configService } from './core/services';

export const builtInConfigs = [new DefaultConfigModule()];

// TODO remove this mock
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
// configService.applyConfig(new DefaultConfigModule().choices[1]);
