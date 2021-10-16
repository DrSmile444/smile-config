import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TestUtil {
  static cleanDirectory(destination: string, cwd: string) {
    const destinationPath = path.resolve(cwd, destination);

    if (fs.existsSync(destinationPath)) {
      fs.rmdirSync(destinationPath, { recursive: true });
    }
  }

  static createDirectory(destination: string, cwd: string) {
    const destinationPath = path.resolve(cwd, destination);

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath);
    }
  }

  static async initTestDirectory(
    destination: string,
    source: string,
    cwd: string
  ) {
    const destinationPath = path.resolve(cwd, destination);
    const sourcePath = path.resolve(cwd, source);

    return new Promise((resolve) => {
      exec(
        `cp -R ${sourcePath} ${destinationPath}`,
        (error, stdout, stderr) => {
          resolve(stdout);

          if (stderr) {
            throw new Error(stderr);
          }
        }
      );
    });
  }
}
