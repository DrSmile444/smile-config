/* eslint-disable class-methods-use-this */
import type { AppObject } from '@smile-config/cli/interfaces';
import * as fs from 'fs';
import { mergeFiles } from 'json-merger';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import slash = require('slash');

import {
  FIRST_INDEX,
  JSON_STRINGIFY_SPACES,
  ONE_ITEM_LENGTH,
  SLICE_EXCLUDE_LAST_ELEMENT,
  SPLICE_LAST_ELEMENT,
} from '../../const';

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

  getFileName(destination: string) {
    return slash(destination).split('files/').splice(SPLICE_LAST_ELEMENT)[
      FIRST_INDEX
    ];
  }

  isNestedFile(destination: string): boolean {
    return slash(destination).split('/').length !== ONE_ITEM_LENGTH;
  }

  getFileType(destination: string): FileType | string {
    const file = slash(destination).split('/').splice(SPLICE_LAST_ELEMENT)[
      FIRST_INDEX
    ];
    const type = slash(destination)
      .split('/')
      .splice(SPLICE_LAST_ELEMENT)
      [FIRST_INDEX].split('.')
      .splice(SPLICE_LAST_ELEMENT)[FIRST_INDEX];

    return type === file ? FileType.NO_EXTENSION : type;
  }

  readFile<T extends AppObject | string = AppObject | string>(
    destination: string,
    type: 'json' | 'text' = 'text'
  ): T | null {
    const filePath = path.resolve(process.cwd(), slash(destination));
    const isFileAvailable = fs.existsSync(filePath);
    const file = isFileAvailable ? fs.readFileSync(filePath).toString() : null;

    if (file === null) {
      return null;
    }

    if (type === 'json') {
      try {
        return JSON.parse(file) as AppObject;
      } catch (e: unknown) {
        console.error(
          `Cannot parse the file: ${slash(destination)}. Full path: ${filePath}`
        );
        console.error(e);
        return null;
      }
    }

    return file as T;
  }

  isExistFile(destination: string): boolean {
    const filePath = path.resolve(process.cwd(), slash(destination));

    return fs.existsSync(filePath);
  }

  writeFile(destination: string, file: AppObject | string): void {
    const filePath = path.resolve(process.cwd(), slash(destination));
    const finalFile =
      typeof file === 'object'
        ? JSON.stringify(file, null, JSON_STRINGIFY_SPACES)
        : file;

    this.createNestedFolders(slash(destination));

    fs.writeFileSync(filePath, finalFile);
  }

  copyFile(destination: string, origin: string) {
    const filePath = path.resolve(process.cwd(), slash(destination));

    this.createNestedFolders(slash(destination));

    fs.writeFileSync(filePath, fs.readFileSync(origin));
  }

  mergeFiles(destination: string, source: string) {
    const destinationFilePath = path.isAbsolute(slash(destination))
      ? slash(destination)
      : path.resolve(process.cwd(), slash(destination));

    const sourceFilePath = path.isAbsolute(source)
      ? source
      : path.resolve(process.cwd(), source);

    return mergeFiles([destinationFilePath, sourceFilePath]) as AppObject;
  }

  private createNestedFolders(destination: string) {
    const isAbsolute = path.isAbsolute(slash(destination));

    if (!isAbsolute && this.isNestedFile(slash(destination))) {
      let folderPath = '';
      const SLICE_START = 0;

      slash(destination)
        .split('/')
        .slice(SLICE_START, SLICE_EXCLUDE_LAST_ELEMENT)
        .forEach((folder) => {
          folderPath += `${folder}/`;

          const folderFullPath = path.resolve(process.cwd(), folderPath);

          if (!fs.existsSync(folderFullPath)) {
            fs.mkdirSync(folderFullPath);
          }
        });
    }
  }
}
