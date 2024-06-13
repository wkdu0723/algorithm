const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
// const readFileSyncUrl = "input.txt";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const number = input.shift().split(" ").map(Number);
const n = number[0];
const list = input[0].split(" ").map(Number);
const targetNumber = number[1];
let sum = 0;
let maxSum = 0;

for (let x = 0; x < n; x++) {
    for (let y = x + 1; y < n; y++) {
        for (let z = y + 1; z < n; z++) {
            sum = list[x] + list[y] + list[z];
            if (sum > targetNumber) continue;
            
            if (sum === targetNumber) return console.log(sum);
            else if (sum < targetNumber && sum > maxSum) maxSum = sum;
        }
    }
}

console.log(maxSum);