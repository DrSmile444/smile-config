/* eslint-disable @typescript-eslint/no-var-requires,global-require,@typescript-eslint/no-require-imports */
import * as CommentJSON from 'comment-json';
import type { Linter } from 'eslint';
import * as fs from 'fs';

import {
  EslintModule,
  EslintTypescriptModule,
} from '../../../configs/default/modules';
import { EslintMerger } from './eslint.merger';

export const eslintMerger = new EslintMerger();

const readJsonFile = (filePath?: string): Linter.Config | null =>
  filePath
    ? (CommentJSON.parse(fs.readFileSync(filePath).toString()) as Linter.Config)
    : null;

describe('EslintMerger', () => {
  it('should merge mock eslint config', () => {
    const targetA =
      require('./__mocks__/mock-a.eslintrc.json') as Linter.Config;
    const sourceB =
      require('./__mocks__/mock-b.eslintrc.json') as Linter.Config;
    const sourceC =
      require('./__mocks__/mock-c.eslintrc.json') as Linter.Config;
    const expected =
      require('./__mocks__/mock-result.eslintrc.json') as Linter.Config;

    const result1 = eslintMerger.mergeConfigs(targetA, sourceB);
    const result2 = eslintMerger.mergeConfigs(result1, sourceC);

    expect(result1).toMatchSnapshot();
    expect(result2).toEqual(expected);
  });

  it('should merge real eslint config', () => {
    const targetFilePath = readJsonFile(
      new EslintModule().files.find((file) => file.includes('.eslintrc.json'))
    );
    const sourceFilePath = readJsonFile(
      new EslintTypescriptModule().files.find((file) =>
        file.includes('.eslintrc.json')
      )
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = eslintMerger.mergeConfigs(targetFilePath, sourceFilePath!);
    expect(result).toMatchSnapshot();
  });

  it('should not crash on empty overrides', () => {
    const result = eslintMerger.mergeConfigs(
      { root: true, reportUnusedDisableDirectives: true },
      { root: false, noInlineConfig: true }
    );

    expect(result).toStrictEqual({
      root: false,
      reportUnusedDisableDirectives: true,
      noInlineConfig: true,
    });
  });

  it('should merge plugins', () => {
    const result = eslintMerger.mergeConfigs(
      { plugins: ['eslint'] },
      { plugins: ['smile-config'] }
    );
    expect(result).toStrictEqual({ plugins: ['eslint', 'smile-config'] });
  });
});
