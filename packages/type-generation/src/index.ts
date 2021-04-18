const fs = require('fs');
const promise1 = require('../mock-data/promise1');
const { ESLint } = require('eslint');

const types = async () => {
  const res = await promise1;
  console.log(res);
};

(async function main() {
  // Create models folder
  fs.rmdirSync('models', { recursive: true });
  fs.mkdirSync('models');

  const res1 = `export type T = { id: string; test1: number; test2: number; test3: number; test4: number; };`;

  // Create type files
  fs.writeFileSync('models/test.ts', res1);

  // fix lint problems
  const eslint = new ESLint({ fix: true });
  const results = await eslint.lintFiles(['models/test.ts']);
  await ESLint.outputFixes(results);
})().catch((err) => {
  if (err) throw err;
});
