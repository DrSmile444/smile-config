export class NoPackageJsonError extends Error {
  name = 'NoPackageJsonError';
  message = 'There is no package.json file into git root folder';
}
