import { ConfigService } from './config.service';
import { FolderService } from './folder.service';

export const folderService = new FolderService();
export const configService = new ConfigService(folderService);

export * from './config.service';
export * from './folder.service';
