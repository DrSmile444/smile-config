import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export class TestUtil {
  constructor(private readonly testRoot: string) {}

  cleanDirectory(destination: string) {
    const destinationPath = path.resolve(this.testRoot, destination);

    if (fs.existsSync(destinationPath)) {
      fs.rmdirSync(destinationPath, { recursive: true });
    }
  }

  createDirectory(destination: string) {
    const destinationPath = path.resolve(this.testRoot, destination);

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }
  }

  async initTestDirectory(destination: string, source: string) {
    const destinationPath = path.resolve(this.testRoot, destination);
    const sourcePath = path.resolve(this.testRoot, source);

    return new Promise((resolve) => {
      exec(`cp -R ${sourcePath} ${destinationPath}`, (error, stdout) => {
        resolve(stdout);
      });
    });
  }
}
