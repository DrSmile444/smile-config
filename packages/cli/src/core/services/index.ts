import {
  combineMerger,
  eslintMerger,
  stylelintMerger,
  vscodeExtensionMerger,
} from '../mergers';
import { ConfigService } from './config.service';
import { FolderService } from './folder.service';

export const folderService = new FolderService();
export const configService = new ConfigService(
  combineMerger,
  eslintMerger,
  folderService,
  stylelintMerger,
  vscodeExtensionMerger
);

export * from './config.service';
export * from './folder.service';
