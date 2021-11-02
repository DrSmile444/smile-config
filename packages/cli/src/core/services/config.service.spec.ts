// eslint-disable-next-line import/no-extraneous-dependencies
import { getProjectRoots } from '@nrwl/workspace/src/command-line/shared';
import { ChoiceType } from '@smile-config/cli/interfaces';
import * as childProcess from 'child_process';
import type { Linter } from 'eslint';
import * as path from 'path';
import * as process from 'process';

import { rootDir } from '../../../../../root-dir';
import { DefaultConfigModule } from '../../../configs/default';
import { EditorConfigModule } from '../../../configs/default/modules';
import { FIRST_INDEX } from '../../const';
import { TestUtil } from '../../test-utils/test.util';
import { NoPackageJsonError, NoRequiredFileError } from '../errors';
import { configService, folderService } from './index';

const testDir = 'test-output';
const testDirInitial = 'test-output-initial';

describe('ConfigService', () => {
  const cliProjectRoot = getProjectRoots(['cli']);
  const resolvedPath = path.resolve(rootDir, cliProjectRoot[FIRST_INDEX]);
  const testUtil = new TestUtil(resolvedPath);

  beforeAll(async () => {
    const cwdSpy = jest.spyOn(process, 'cwd');
    // Mock for npm test
    cwdSpy.mockReturnValue(resolvedPath);
    // Mock for output destination
    cwdSpy.mockReturnValue(`${process.cwd()}/${testDir}`);

    await testUtil.cleanDirectory(testDir);
    await testUtil.initTestDirectory(testDir, testDirInitial);

    const execSyncSpy = jest.spyOn(childProcess, 'execSync');
    execSyncSpy.mockReturnValue(Buffer.from(''));
  });

  afterAll(async () => {
    await testUtil.cleanDirectory(testDir);
  });

  describe('error cases', () => {
    it('should throw an error without package.json', async () => {
      await testUtil.cleanDirectory(testDir);
      testUtil.createDirectory(testDir);

      const errorFunction = () => {
        configService.applyConfig({
          useClass: DefaultConfigModule,
          type: ChoiceType.CUSTOM,
          name: 'test',
          modules: [EditorConfigModule],
        });
      };

      expect(errorFunction).toThrow(NoPackageJsonError);
    });

    it('should throw an error if no required file', async () => {
      await testUtil.cleanDirectory(testDir);
      await testUtil.initTestDirectory(testDir, testDirInitial);

      class TestConfig extends DefaultConfigModule {
        required = ['required.file'];
      }

      const errorFunction = () => {
        configService.applyConfig({
          useClass: TestConfig,
          type: ChoiceType.CUSTOM,
          name: 'test',
          modules: [],
        });
      };

      expect(errorFunction).toThrow(NoRequiredFileError);
    });
  });

  describe('success cases', () => {
    beforeEach(async () => {
      await testUtil.cleanDirectory(testDir);
      await testUtil.initTestDirectory(testDir, testDirInitial);
    });

    function callWithOneModule() {
      configService.applyConfig({
        useClass: DefaultConfigModule,
        type: ChoiceType.CUSTOM,
        name: 'test',
        modules: [EditorConfigModule],
      });
    }

    function callWithAllModules() {
      const defaultConfigModule = new DefaultConfigModule();
      configService.applyConfig({
        useClass: DefaultConfigModule,
        type: ChoiceType.CUSTOM,
        name: 'test',
        modules: defaultConfigModule.modules,
      });
    }

    it('should work with one module', () => {
      expect(callWithOneModule).not.toThrow();
    });

    it('should work with all modules', () => {
      expect(callWithAllModules).not.toThrow();
    });

    it('should merge existing configs', () => {
      folderService.writeFile('.eslintrc.json', {
        ignorePatterns: ['e2e-testing-case'],
        extends: ['e2e-testing-case'],
        plugins: ['e2e-testing-case'],
      } as Linter.Config);

      expect(callWithAllModules).not.toThrow();

      const resultEslintFile = folderService.readFile<Linter.Config>(
        '.eslintrc.json',
        'json'
      )!;

      expect(resultEslintFile.ignorePatterns).toContain('e2e-testing-case');
      expect(resultEslintFile.extends).toContain('e2e-testing-case');
      expect(resultEslintFile.plugins).toContain('e2e-testing-case');
    });
  });
});
