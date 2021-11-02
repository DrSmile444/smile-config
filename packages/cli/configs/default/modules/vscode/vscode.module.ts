import type {
  AbstractConfigItemModule,
  LintItem,
} from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../src/base';

export class VscodeModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'VSCode';
  description = 'Shared VSCode configs and files';
  includeToLintScript: LintItem[] = [
    {
      npmRun: ['lint:styles'],
      order: 5,
    },
  ];

  constructor() {
    super(__dirname);
  }
}
