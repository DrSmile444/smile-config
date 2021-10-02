import * as fs from 'fs';

export enum FileType {
  JSON = 'json',
  JS = 'js',
  EDITORCONFIG = 'editorconfig'
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
    return path.split('.').splice(-1)[0];
  }

  copyFile(destination: string, origin: string) {
    fs.writeFileSync(destination, fs.readFileSync(origin));
  }
}
