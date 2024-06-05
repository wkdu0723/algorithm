const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
// const readFileSyncUrl = "input.txt";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const number = input.shift();
const list = [];
const result = [];

input.map(row => {
    const test = row.trim().split(" ").map(Number);
    list.push(test);
});

result.push(...list)

for (let i = 1; i < number; i++) {
    const length = list[i].length;
    list[i].map((item, idx) => {
        if (idx === 0) result[i][idx] = result[i - 1][idx] + item;
        else if (idx === length - 1) result[i][idx] = result[i - 1][idx - 1] + item;
        else result[i][idx] = Math.max((result[i - 1][idx - 1] + item), (result[i - 1][idx] + item));
    });
}

console.log(Math.max(...result[number - 1]));



