const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const number = input.shift().split(" ").map(Number);

let x = 0;
let y = 0;

const equation = (a, b, c, d, isPlus) => {
    let variable = 0;
    let result = 0;
    if (isPlus) {
        variable = a * Math.abs(b) - c * Math.abs(d);
        result = number[2] * Math.abs(b) - number[5] * Math.abs(d);
    } else {
        variable = a * Math.abs(b) + c * Math.abs(d);
        result = number[2] * Math.abs(b) + number[5] * Math.abs(d);
    }

    return result / variable;
};

if (number[0] === number[3] || Math.sign(number[0]) === Math.sign(number[3]))
    y = equation(number[1], number[3], number[4], number[0], true);
else if (Math.sign(number[0]) !== Math.sign(number[3]))
    y = equation(number[1], number[3], number[4], number[0], false);

if (number[1] === number[4] || Math.sign(number[1]) === Math.sign(number[4]))
    x = equation(number[0], number[4], number[3], number[1], true);
else if (Math.sign(number[1]) !== Math.sign(number[4]))
    x = equation(number[0], number[4], number[3], number[1], false);

console.log(x, y);
