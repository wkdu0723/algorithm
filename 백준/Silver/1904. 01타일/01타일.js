const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim();
const number = Number(input);

const dp = [];
dp[0] = 0;
dp[1] = 1;
dp[2] = 2;
dp[3] = 3;

if (number < 4) return console.log(dp[number]);

for (let i = 4; i <= number; i++) {
  dp[i] = (dp[i - 2] + dp[i - 1]) % 15746;
}
console.log(dp[number]);