const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const [n, k] = input[0].trim().split(" ").map(Number);
const arr = input.map((item, idx) => {
    if (idx !== 0) {
        return item.trim().split(" ").map(Number);
    }
});

const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 1 }, () => 0)
);

for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < k + 1; j++) {
        [weight, value] = arr[i];

        if (j >= weight) {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + value);
        } else {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
}

console.log(dp[n][k]);