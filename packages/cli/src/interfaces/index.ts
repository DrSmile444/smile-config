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
  RECOMMENDED = 'recommended',
  NODE_RECOMMENDED = 'node:recommended',
  CUSTOM = 'custom',
}

export interface AbstractConfigItemModule {
  name: string;
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
  name: string;
  url: string;
  required: string[];
  modules: Newable<AbstractConfigItemModule>[];
  choices: ChoiceConfig<AbstractConfigModule>[];
}
