import * as fs from 'fs';
import * as path from 'path';

import { IgnoreMerger } from './ignore.merger';

const combineMerger = new IgnoreMerger();

const readFile = (filePath: string): string =>
  fs
    .readFileSync(path.join(__dirname, filePath))
    .toString()
    .replace(/\r\n/g, '\n');

describe('IgnoreMerger', () => {
  it('should merge vscode extensions and remove the same value', () => {
    const result = combineMerger.mergeFiles(
      readFile('./__mocks__/combine-a.gitignore'),
      readFile('./__mocks__/combine-b.gitignore')
    );

    expect(result).toStrictEqual(
      readFile('./__mocks__/combine-result.gitignore')
    );
  });

  it('should not include when already exists', () => {
    const result = combineMerger.mergeFiles(
      readFile('./__mocks__/combine-result.gitignore'),
      readFile('./__mocks__/combine-b.gitignore')
    );

    expect(result).toStrictEqual(
      readFile('./__mocks__/combine-result.gitignore')
    );
  });
});
