import { EslintMerger } from './eslint.merger';
import { EslintModule, EslintTypescriptModule } from '../../../configs/moc/modules';
import * as fs from 'fs';

export const eslintMerger = new EslintMerger();

const readJsonFile = (path) => JSON.parse(fs.readFileSync(path).toString())

describe('EslintMerger', () => {
  it('should merge real eslint config', () => {
    const targetFilePath = readJsonFile((new EslintModule()).files.find((file) => file.includes('.eslintrc.json')));
    const sourceFilePath = readJsonFile((new EslintTypescriptModule()).files.find((file) => file.includes('.eslintrc.json')));

    const result = eslintMerger.mergeConfigs(targetFilePath, sourceFilePath);
    expect(result).toMatchSnapshot();
  });
});
