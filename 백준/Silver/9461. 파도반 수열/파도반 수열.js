const fs = require("fs");
const readFileUrl = "/dev/stdin";
const input = fs.readFileSync(readFileUrl).toString().trim().split("\n");
const number = input.map(Number);
const dp = [];
dp[0] = 0;
dp[1] = 1;
dp[2] = 1;
dp[3] = 1;

const solution = (n) => {
  if (n <= 3 || dp[n]) return dp[n];

  for (let i = 4; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 3];
  }
};

for (let i = 1; i < number.length; i++) {
  solution(number[i]);
  console.log(dp[number[i]]);
}
