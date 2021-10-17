#!/usr/bin/env node
// eslint-disable-next-line import/no-extraneous-dependencies
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24, // 1 days
});

notifier.notify({ defer: false, isGlobal: true });

const consoleColors = {
  Reset: '\x1b[0m',
  Yellow: '\x1b[33m',
};

const logYellow = (text) =>
  console.info(consoleColors.Yellow, text, consoleColors.Reset);
const logWhite = (text) =>
  console.info(consoleColors.Reset, text, consoleColors.Reset);

try {
  // eslint-disable-next-line global-require
  require('./bin');
} catch (e) {
  logYellow('********************************');
  logYellow('*** Cannot load the binaries ***');
  logYellow('********************************');
  logYellow('');
  logYellow('Try to reinstall the package:');
  logWhite('$ npm uninstall smile-config -g');
  logWhite('$ npm i smile-config -g');
  logYellow('');
  logYellow('Or build the project (if you have pulled and developing it):');
  logWhite('$ npm build');
  logYellow('');
  logYellow('********************************');
}
