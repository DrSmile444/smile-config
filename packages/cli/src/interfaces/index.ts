export interface AbstractConfigModule<T extends AbstractConfigItemModule = any> {
  name: string;
  url: string;
  modules: T[];
  choices: ChoiceConfig<AbstractConfigModule>[];
}

export type Newable<T> = { new(...args: any[]): T; };

export interface LintItem {
  command: string;
  order: number;
}

export interface AbstractConfigItemModule<T extends AbstractConfigItemModule = any> {
  name: string;
  files: string[];
  includeToLintScript?: LintItem[];
  addons?: T[];
}

export enum ChoiceType {
  RECOMMENDED = 'recommended',
  CUSTOM = 'custom'
}

export interface ChoiceConfig<T extends AbstractConfigModule = any> {
  useClass: Newable<T>;
  type: ChoiceType;
  modules: T['modules'] | ChoiceItemConfig<any> | any;
}

export interface ChoiceItemConfig<T extends AbstractConfigItemModule> {
  useClass: Newable<T>;
  modules: T['addons'];
}
