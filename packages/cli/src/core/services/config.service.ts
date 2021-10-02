import { AbstractConfigModule, ChoiceConfig } from '@smile-config/cli/interfaces';

import { NoPackageJsonError } from '../errors';
import { FolderService } from './folder.service';

export class ConfigService {
  constructor(private folderService: FolderService) {}

  applyConfig<T extends AbstractConfigModule>(config: ChoiceConfig<T>) {
    const files = this.folderService.readFolder();

    if (!files.includes('package.json')) {
      throw new NoPackageJsonError();
    }

    console.log(files, new config.useClass());
  }
}
