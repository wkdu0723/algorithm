const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const number = input.shift().split(" ").map(Number);
let result = 9999999;
const originalBoard = ["WBWBWBWB", "BWBWBWBW"];

const solution = (i, j, input) => {
    let white = 0;
    for (let x = 0; x < 8; x++) {
        const row = i + x;
        for (let y = 0; y < 8; y++) {
            const col = j + y;
            if (input[row][col] !== originalBoard[row % 2][y]) {
                white++;
            }
        }
    }

    return Math.min(white, 64 - white);
};

for (let i = 0; i <= number[0] - 8; i++) {
    for (let j = 0; j <= number[1] - 8; j++) {
        const check = solution(i, j, input);
        if (result > check) result = check;
    }
}
console.log(result);
