import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

export class BranchNameLintModule implements AbstractConfigItemModule {
  name = 'branch-name-lint';
  includeToLintScript = [
    {
      command: 'lint:branch-name',
      order: 0,
    }
  ];
}
