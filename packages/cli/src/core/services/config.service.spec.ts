import { ChoiceType } from '@smile-config/cli/interfaces';
import * as childProcess from 'child_process';
import * as fs from 'fs';

import { DefaultConfigModule } from '../../../configs/default';
import { EditorConfigModule } from '../../../configs/default/modules';
import { configService } from './index';

const testDir = 'test-output';
const testDirInitial = 'test-output-initial';

describe('ConfigService', () => {
  beforeAll(() => {
    // Clean up the test directory
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir, { recursive: true });
    }

    // Create a test directory
    childProcess.execSync(`cp -R ${testDirInitial} ${testDir}`);

    const cwdSpy = jest.spyOn(process, 'cwd');
    cwdSpy.mockReturnValue(`${process.cwd()}/${testDir}`);

    const execSyncSpy = jest.spyOn(childProcess, 'execSync');
    execSyncSpy.mockReturnValue(Buffer.from(''));
  });

  afterAll(() => {
    const resultFiles = fs.readdirSync(testDir);
    console.info({ resultFiles });
  });

  it('should', () => {
    expect(true).toBe(true);
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
