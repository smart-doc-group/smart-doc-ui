const fs = require('fs');
const { execSync } = require('child_process');
const sh = execSync;

fs.rmdirSync('./lib', { recursive: true });
fs.mkdirSync('./lib');

sh('rollup -c');
