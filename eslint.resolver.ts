// import { CLIEngine } from 'eslint';
const { CLIEngine, ESLint } = require('eslint');

(async () => {
  // const result = new CLIEngine().getConfigForFile('./.eslintrc.json');
// const result = new CLIEngine().getConfigForFile('./.eslint/.ts.eslintrc.json');
  const result = await new ESLint().calculateConfigForFile('./.eslintrc.json');

  console.log(result, ESLint.version);
  console.log(JSON.stringify(result, null, 2));
})();
