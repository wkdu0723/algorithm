const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
// const readFileSyncUrl = "input.txt";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const number = input.shift().split(" ").map(Number);
const n = number[0];
const list = input[0].split(" ").map(Number);
const targetNumber = number[1];
let targetX = 0;
let targetY = 0;
let targetZ = 0;
const result = [];

for (let x = 0; x < n; x++) {
    targetX = list[x];
    for (let y = x + 1; y < n; y++) {
        targetY = list[y];
        for (let z = y + 1; z < n; z++) {
            targetZ = list[z];
            result.push(targetX + targetY + targetZ);
        }
    }
}

const maxNumber = result.sort((a, b) => b - a).find((item) => {
    if (item <= targetNumber) return item;
});

console.log(maxNumber);