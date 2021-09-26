import { ConfigItemModule } from '../../../src/interfaces';

export class BranchNameLintModule implements ConfigItemModule {
  name = 'branch-name-lint';
  includeToLintScript = [
    {
      command: 'lint:branch-name',
      order: 0,
    }
  ];
}
