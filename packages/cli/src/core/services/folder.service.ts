import * as fs from 'fs';

export enum FileType {
  JSON = 'json',
  JS = 'js',
  EDITORCONFIG = 'editorconfig',
  NO_EXTENSION = 'no_extension',
}

export class FolderService {
  readFolder(): string[] {
    return fs.readdirSync(process.cwd());
  }

  getFileName(path: string) {
    return path.split('files/').splice(-1)[0];
  }

  isNestedFile(path: string): boolean {
    return path.split('/').length !== 1;
  }

  getFileType(path: string): FileType | string {
    const file = path.split('/').splice(-1)[0];
    const type = path.split('/').splice(-1)[0].split('.').splice(-1)[0];

    return type === file ? FileType.NO_EXTENSION : type;
  }

  copyFile(destination: string, origin: string) {
    fs.writeFileSync(destination, fs.readFileSync(origin));
  }
}
