export interface AbstractConfigModule<T extends AbstractConfigItemModule = any> {
  name: string;
  url: string;
  modules: T[];
}

export interface LintItem {
  command: string;
  order: number;
}

export interface AbstractConfigItemModule<T extends AbstractConfigItemModule = any> {
  name: string;
  includeToLintScript?: LintItem[];
  optional?: T[];
}
