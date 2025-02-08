const fs = require("fs");
const readFileUrl = "/dev/stdin";
const input = fs.readFileSync(readFileUrl).toString().trim().split("\n");
const n = input[0];
const number = input.slice(1).map((row) => row.split(" ").map(Number));
const sortNumber = number.sort((a, b) => a[0] - b[0]);
const dp = Array.from({ length: n }, () => 1);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (sortNumber[i][1] > sortNumber[j][1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}
console.log(n - Math.max(...dp));
