import { ConfigService } from './config.service';
import { FolderService } from './folder.service';
import { EslintMergerService } from './eslint-merger.service';

export const folderService = new FolderService();
export const eslintMergerService = new EslintMergerService();
export const configService = new ConfigService(folderService, eslintMergerService);

export * from './config.service';
export * from './folder.service';
