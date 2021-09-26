import { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

export class StylelintModule implements AbstractConfigItemModule {
  name = 'stylelint';

  includeToLintScript = [
    {
      command: 'lint:styles',
      order: 5,
    }
  ];
}
