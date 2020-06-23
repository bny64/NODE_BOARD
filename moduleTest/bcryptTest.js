const fs = require('fs');
const rootPath = require('app-root-path');

console.log(rootPath + '/properties/filePath.json');
const result = fs.readFileSync(rootPath + '/properties/filePath.json', 'utf8');
console.log(JSON.parse(result));