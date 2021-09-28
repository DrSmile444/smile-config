export interface AbstractConfigModule<T extends AbstractConfigItemModule = any> {
  name: string;
  url: string;
  modules: T[];
  // choices: T[];
}

export interface LintItem {
  command: string;
  order: number;
}

export interface AbstractConfigItemModule<T extends AbstractConfigItemModule = any> {
  name: string;
  files: string[];
  includeToLintScript?: LintItem[];
  optional?: T[];
}

export enum ChoiceType {
  RECOMMENDED = 'recommended',
  CUSTOM = 'custom'
}

export interface ChoiceConfig<T extends AbstractConfigModule = any> {
  useClass: T;
  type: ChoiceType;
  modules: T['modules']
}
