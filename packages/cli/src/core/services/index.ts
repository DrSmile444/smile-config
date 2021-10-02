import { ConfigService } from './config.service';
import { FolderService } from './folder.service';
import { eslintMerger, vscodeExtensionMerger } from '../mergers';

export const folderService = new FolderService();
export const configService = new ConfigService(eslintMerger, folderService, vscodeExtensionMerger);

export * from './config.service';
export * from './folder.service';
