export interface LintItem {
  command: string;
  order: number;
}

export interface ConfigItemModule {
  name: string;
  includeToLintScript?: LintItem[];
  optional?: ConfigItemModule[];
}
