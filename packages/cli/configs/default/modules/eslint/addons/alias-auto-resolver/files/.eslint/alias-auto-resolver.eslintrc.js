/* eslint-disable import/no-unresolved,import/no-extraneous-dependencies,import/order,import/no-self-import,import/extensions,import/no-useless-path-segments */
const fs = require('fs');

/**
 * This config tries to find best alias loader for ESLint
 * It supports:
 * - jsconfig aliases
 * - import resolver - default aliases
 * */

/**
 * Auto module resolver for jsconfig.json files.
 * You don't need to provide aliases, it will handle it itself.
 *
 * @kind standalone - could be used separately
 * @requires https://www.npmjs.com/package/eslint-import-resolver-jsconfig
 * */
const jsconfigModule = require('./alias-jsconfig-resolver.eslintrc.json');

/**
 * Manually add aliases from alias field.
 *
 * @kind standalone - could be used separately
 * @requires https://www.npmjs.com/package/eslint-import-resolver-alias
 * */
const importResolverModule = require('./alias-manual-resolver.eslintrc.json');

const log = (...lines) => {
  console.info('***');
  lines.forEach((line) => {
    console.info(`*** ${line}`);
  });
  console.info('***');
};

module.exports = (() => {
  if (fs.existsSync('./jsconfig.json')) {
    log(
      'SUCCESS: alias-auto-resolver.eslintrc: jsconfig, resolve alises for ESLint...'
    );
    return jsconfigModule;
  }

  log(
    'ERROR: alias-auto-resolver.eslintrc: Cannot find `jsconfig.json` file',
    '** Fallback to default import/resolver'
  );
  return importResolverModule;
})();
