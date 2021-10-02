export class NoRequiredFileError extends Error {
  name = 'NoRequiredFileError';
  message = 'There is no config required file in the folder';

  constructor(public requiredFile: string) {
    super();
  }
}
