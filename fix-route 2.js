const fs = require('fs');
const execSync = require('child_process').execSync;
const diff = execSync('git log -p -1 app/api/telegram/route.ts').toString();
console.log(diff.substring(0, 100));
