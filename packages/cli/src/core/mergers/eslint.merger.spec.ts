/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from 'fs';

import { EslintModule, EslintTypescriptModule } from '../../../configs/moc/modules';
import { EslintMerger } from './eslint.merger';

export const eslintMerger = new EslintMerger();

const readJsonFile = (path) => JSON.parse(fs.readFileSync(path).toString())

describe('EslintMerger', () => {
  it('should merge mock eslint config', () => {
    const targetA = require('./__mocks__/mock-a.eslintrc.json');
    const sourceB = require('./__mocks__/mock-b.eslintrc.json');
    const sourceC = require('./__mocks__/mock-c.eslintrc.json');
    const expected = require('./__mocks__/mock-result.eslintrc.json');

    const result1 = eslintMerger.mergeConfigs(targetA, sourceB);
    const result2 = eslintMerger.mergeConfigs(result1, sourceC);

    expect(result1).toMatchSnapshot();
    expect(result2).toStrictEqual(expected);
  });

  it('should merge real eslint config', () => {
    const targetFilePath = readJsonFile((new EslintModule()).files.find((file) => file.includes('.eslintrc.json')));
    const sourceFilePath = readJsonFile((new EslintTypescriptModule()).files.find((file) => file.includes('.eslintrc.json')));

    const result = eslintMerger.mergeConfigs(targetFilePath, sourceFilePath);
    expect(result).toMatchSnapshot();
  });

  it('should not crash on empty overrides', () => {
    const result = eslintMerger.mergeConfigs({ a: 1, c: 1 }, { a: 2, b: 2 });
    expect(result).toStrictEqual({ a: 2, b: 2, c: 1 });
  });
});
