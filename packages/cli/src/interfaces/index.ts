import type { PackageJson } from 'type-fest';

export type Newable<T> = new (...args: any[]) => T;
export type AppObject<T = any> = Record<any, T>;

export interface BaseLintItem {
  npmRun: string[];
  additionalCommands?: Record<string, string>;
  order: number;
}

export interface ConditionLintItem extends BaseLintItem {
  when: (packages: PackageJson.Dependency | undefined) => boolean;
  instead?: BaseLintItem;
}

export type LintItem = BaseLintItem | ConditionLintItem;

export enum ChoiceType {
  RECOMMENDED = 'Recommended',
  FRONT_RECOMMENDED = 'Front:Recommended',
  NODE_RECOMMENDED = 'Node:Recommended',
  FRONT_TYPESCRIPT_RECOMMENDED = 'Front:Typescript:Recommended',
  NODE_TYPESCRIPT_RECOMMENDED = 'Node:Typescript:Recommended',
  REACT_RECOMMENDED = 'React:Recommended',
  REACT_TYPESCRIPT_EXPERIMENTAL = 'React:Typescript:Experimental',
  CUSTOM = 'Custom',
}

export interface AbstractConfigItemModule {
  title: string;
  description: string;
  files: string[];
  includeToLintScript?: LintItem[];
  addons?: Newable<AbstractConfigItemModule>[];
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

export interface AbstractConfigModule<> {
  title: string;
  url: string;
  required: string[];
  modules: Newable<AbstractConfigItemModule>[];
  choices: ChoiceConfig<AbstractConfigModule>[];
}
