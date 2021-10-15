import { ChoiceType } from '@smile-config/cli/interfaces';
import * as childProcess from 'child_process';

import { DefaultConfigModule } from '../../../configs/default';
import { EditorConfigModule } from '../../../configs/default/modules';
import { configService } from './index';

describe('ConfigService', () => {
  beforeAll(() => {
    const cwdSpy = jest.spyOn(process, 'cwd');
    cwdSpy.mockReturnValue(`${process.cwd()}/test-output`);

    const execSyncSpy = jest.spyOn(childProcess, 'execSync');
    execSyncSpy.mockReturnValue(Buffer.from(''));
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
