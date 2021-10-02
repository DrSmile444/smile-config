import * as fs from 'fs';

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
}
