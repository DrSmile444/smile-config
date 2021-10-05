import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintTypescriptImportsModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint: Typescript TSLint Imports';
  description = 'TSLint ordered/imports rule for best imports';

  constructor() {
    super(__dirname);
  }
}
