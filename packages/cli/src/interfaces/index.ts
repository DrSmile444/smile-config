export type Newable<T> = new (...args: any[]) => T;
export type AppObject<T = any> = Record<any, T>;

export interface LintItem {
  command: string;
  order: number;
}

export enum ChoiceType {
  RECOMMENDED = 'recommended',
  NODE_RECOMMENDED = 'node:recommended',
  CUSTOM = 'custom',
}

export interface AbstractConfigItemModule<
  T extends AbstractConfigItemModule = any
> {
  name: string;
  files: string[];
  includeToLintScript?: LintItem[];
  addons?: T[];
}

export interface ChoiceItemConfig<T extends AbstractConfigItemModule> {
  useClass: Newable<T>;
  modules: Newable<AbstractConfigItemModule>[];
}

export type ChoiceModule =
  | ChoiceItemConfig<AbstractConfigItemModule>
  | Newable<AbstractConfigItemModule>;

// eslint-disable-next-line no-use-before-define
export interface ChoiceConfig<T extends AbstractConfigModule = any> {
  useClass: Newable<T>;
  type: ChoiceType;
  modules: ChoiceModule[];
}

export interface AbstractConfigModule<
  T extends AbstractConfigItemModule = any
> {
  name: string;
  url: string;
  required: string[];
  modules: T[];
  choices: ChoiceConfig<AbstractConfigModule>[];
}
