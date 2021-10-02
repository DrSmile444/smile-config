import * as fs from 'fs';

export class FolderService {
  readFolder(): string[] {
    return fs.readdirSync(process.cwd());
  }
}
