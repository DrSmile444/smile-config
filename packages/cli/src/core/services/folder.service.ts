/* eslint-disable class-methods-use-this */
import * as fs from 'fs';

import { FIRST_INDEX, ONE_ITEM_LENGTH, SPLICE_LAST_ELEMENT } from '../../const';

export enum FileType {
  EDITORCONFIG = 'editorconfig',
  GIT_IGNORE = 'gitignore',
  JS = 'js',
  JSON = 'json',
  NO_EXTENSION = 'no_extension',
}

export class FolderService {
  readFolder(): string[] {
    return fs.readdirSync(process.cwd());
  }

  getFileName(path: string) {
    return path.split('files/').splice(SPLICE_LAST_ELEMENT)[FIRST_INDEX];
  }

  isNestedFile(path: string): boolean {
    return path.split('/').length !== ONE_ITEM_LENGTH;
  }

  getFileType(path: string): FileType | string {
    const file = path.split('/').splice(SPLICE_LAST_ELEMENT)[FIRST_INDEX];
    const type = path
      .split('/')
      .splice(SPLICE_LAST_ELEMENT)
      [FIRST_INDEX].split('.')
      .splice(SPLICE_LAST_ELEMENT)[FIRST_INDEX];

    return type === file ? FileType.NO_EXTENSION : type;
  }

  copyFile(destination: string, origin: string) {
    fs.writeFileSync(destination, fs.readFileSync(origin));
  }
}
