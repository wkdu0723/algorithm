const fs = require("fs");
const readFileUrl = "/dev/stdin";
const input = fs.readFileSync(readFileUrl).toString().trim().split("\n");
const dp = input.slice(1).map((row) => row.split(" ").map(Number));

for (let i = 1; i < dp.length; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 0) {
      dp[i][j] += Math.min(dp[i - 1][1], dp[i - 1][2]);
    } else if (j === 1) {
      dp[i][j] += Math.min(dp[i - 1][0], dp[i - 1][2]);
    } else {
      dp[i][j] += Math.min(dp[i - 1][0], dp[i - 1][1]);
    }
  }
}
console.log(dp[dp.length - 1].sort((a, b) => a - b)[0]);