import * as fs from 'fs';
import * as path from 'path';

export class BaseConfigItemModule {
  files: string[] = [];

  constructor(private readonly dirName: string) {
    this.files = this.getFiles(path.join(dirName, './files'));
  }

  getFiles(dir: string): string[] {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? this.getFiles(res) : res;
    });

    return Array.prototype.concat(...files) as string[];
  }
}
