export interface AbstractConfigModule<T extends AbstractConfigItemModule = any> {
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
