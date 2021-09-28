import { BaseConfigItemModule } from '../../../../src/base';
import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

export class BranchNameLintModule extends BaseConfigItemModule implements AbstractConfigItemModule {
  name = 'branch-name-lint';
  includeToLintScript = [
    {
      command: 'lint:branch-name',
      order: 0,
    }
  ];

  constructor() {
    super(__dirname);
  }
}

console.log(new BranchNameLintModule());
