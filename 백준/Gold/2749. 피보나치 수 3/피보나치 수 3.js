const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const n = BigInt(input[0]);
const mode = BigInt(1000000);
const p = 1500000;
const dp = Array(p).fill(BigInt(0));
dp[0] = BigInt(0);
dp[1] = BigInt(1);

const solution = () => {
    for (let i = 2; i < p; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % mode;
    }
};

solution();
console.log(dp[(n % BigInt(p))].toString());
