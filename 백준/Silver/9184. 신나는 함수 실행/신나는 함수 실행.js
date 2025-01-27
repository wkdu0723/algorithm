const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");

const dp = Array.from({ length: 51 }, () =>
  Array.from({ length: 51 }, () => Array.from({ length: 51 }).fill(0))
);

const solution = (a, b, c) => {
  if (a <= 0 || b <= 0 || c <= 0) {
    return 1;
  }

  if (a > 20 || b > 20 || c > 20) {
    return (dp[20][20][20] = solution(20, 20, 20));
  }

  if (dp[a][b][c]) return dp[a][b][c];

  if (a < b && b < c) {
    return (dp[a][b][c] =
      solution(a, b, c - 1) +
      solution(a, b - 1, c - 1) -
      solution(a, b - 1, c));
  } else {
    return (dp[a][b][c] =
      solution(a - 1, b, c) +
      solution(a - 1, b - 1, c) +
      solution(a - 1, b, c - 1) -
      solution(a - 1, b - 1, c - 1));
  }
};

for (let i = 0; i < input.length; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  if (a === -1 && b === -1 && c === -1) return;
  console.log(`w(${a}, ${b}, ${c}) = ${solution(a, b, c)}`);
}