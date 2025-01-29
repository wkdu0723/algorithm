const fs = require("fs");
const readFileUrl = "/dev/stdin";
const input = fs.readFileSync(readFileUrl).toString().trim().split("\n");
const n = Number(input[0]);
const number = input[1].split(" ").map(Number);
const dp = number;

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(number[i - 1] + number[i], dp[i]);
}
console.log(dp.sort((a, b) => b - a)[0]);