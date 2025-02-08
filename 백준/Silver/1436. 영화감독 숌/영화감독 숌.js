const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString();

let title = 666;
let count = 1;

while (count !== parseInt(input)) {
    title++;
    if (String(title).includes("666")) count++;
}
console.log(title);
