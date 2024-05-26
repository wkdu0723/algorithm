const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
// const readFileSyncUrl = "input.txt";
const input = fs.readFileSync(readFileSyncUrl).toString().split("\n");
const n = Number(input[0]);
const list = input[1].split(" ").map(v=>Number(v));
const dp = Array(n).fill(0);
let max = 0;

// for (let i = 0; i < n; i++) {
//     for (let j = 0; j < i; j++) {
//         if (list[i] > list[j]) {
//             dp[i] = Math.max(dp[i], dp[j] + 1);
//         }
//     }
// }

for (let i = 0; i < n; i++) {
    max = 0;
    for (let j = 0; j < i; j++) {
        if (list[i] > list[j] && dp[j] > max) {
            max = dp[j];
        }
    }
    dp[i] = max + 1;
}
console.log(Math.max(...dp));



// const result = [];

// for (let i = 0; i < n; i++) {
//     if (max >= dp[i] && result.indexOf(list[i]) === -1) {
//         result.push(list[i]);
//     }
// }


// result.sort((a, b) => a - b);
// const resultString = result.map(Number).join(" ");
// console.log(resultString);

