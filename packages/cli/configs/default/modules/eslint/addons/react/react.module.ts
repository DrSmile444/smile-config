import type { AbstractConfigItemModule } from '@smile-config/cli/interfaces';

import { BaseConfigItemModule } from '../../../../../../src/base';

export class EslintReactModule
  extends BaseConfigItemModule
  implements AbstractConfigItemModule
{
  title = 'ESLint: React';
  description = 'Airbnb, React, jsx-a11y, react-hooks';

  constructor() {
    super(__dirname);
  }
}
