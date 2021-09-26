import { AbstractConfigItemModule } from '../../../../src/interfaces';

export class StylelintModule implements AbstractConfigItemModule {
  name = 'stylelint';

  includeToLintScript = [
    {
      command: 'lint:styles',
      order: 5,
    }
  ];
}
