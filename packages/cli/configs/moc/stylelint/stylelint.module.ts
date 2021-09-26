import { ConfigItemModule } from '../../../src/interfaces';

export class StylelintModule implements ConfigItemModule {
  name = 'stylelint';

  includeToLintScript = [
    {
      command: 'lint:styles',
      order: 5,
    }
  ];
}
