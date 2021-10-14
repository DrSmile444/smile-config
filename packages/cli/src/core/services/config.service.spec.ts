import { ChoiceType } from '@smile-config/cli/interfaces';
import * as fs from 'fs';

import { DefaultConfigModule } from '../../../configs/default';
import { EditorConfigModule } from '../../../configs/default/modules';
import { configService } from './index';

describe('ConfigService', () => {
  beforeAll(() => {
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    writeFileSyncSpy.mockReturnValue();
  });

  it('should work with one module', () => {
    configService.applyConfig({
      useClass: DefaultConfigModule,
      type: ChoiceType.CUSTOM,
      modules: [EditorConfigModule],
    });

    expect(true).toBe(true);
  });

  it('should work with all modules', () => {
    const defaultConfigModule = new DefaultConfigModule();
    configService.applyConfig({
      useClass: DefaultConfigModule,
      type: ChoiceType.CUSTOM,
      modules: defaultConfigModule.modules,
    });

    expect(true).toBe(true);
  });
});
