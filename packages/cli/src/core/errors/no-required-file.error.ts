export class NoRequiredFileError extends Error {
  name = 'NoRequiredFileError';
  message = `There is no config required file in the folder: "${this.requiredFile}"`;

  constructor(public requiredFile: string) {
    super();
  }
}
