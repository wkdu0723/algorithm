const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
//const readFileSyncUrl = "input.txt";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const n = Number(input[0]);
const list = input[1].split(" ").map(v => Number(v));
const dp = Array(n).fill(1);

for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
        if (list[i] > list[j]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
}

console.log(Math.max(...dp));