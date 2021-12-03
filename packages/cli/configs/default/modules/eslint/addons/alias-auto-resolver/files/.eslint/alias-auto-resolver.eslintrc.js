/* eslint-disable import/no-unresolved,import/no-extraneous-dependencies,import/order,import/no-self-import */
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
const jsconfigModule = {
  settings: {
    'import/resolver': {
      jsconfig: {
        config: 'jsconfig.json',
        extensions: [
          '.css',
          '.jpeg',
          '.jpg',
          '.js',
          '.json',
          '.jsx',
          '.png',
          '.scss',
          '.svg',
          '.ts',
          '.tsx',
          '.vue',
        ],
      },
    },
  },
};

/**
 * Manually add aliases from alias field.
 *
 * @kind standalone - could be used separately
 * @requires https://www.npmjs.com/package/eslint-import-resolver-alias
 * */
const importResolverModule = {
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
};

module.exports = (() => {
  if (fs.existsSync('./jsconfig.json')) {
    console.info('***');
    console.info(
      '*** SUCCESS: alias-auto-resolver.eslintrc: jsconfig, resolve alises for ESLint...'
    );
    console.info('***');
    return jsconfigModule;
  }
  console.info('***');
  console.info(
    '*** ERROR: alias-auto-resolver.eslintrc: Cannot find `jsconfig.json` file'
  );
  console.info('***** Fallback to default import/resolver');
  console.info('***');
  return importResolverModule;
})();
