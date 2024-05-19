const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
// const readFileSyncUrl = "input.txt";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");

const arr = input[1].split(" ").map((x) => Number(x));
arr.unshift(0);
const result = Array(arr.length + 1).fill(0);


for (let i = 0; i <= arr.length; i++){
    for(let j = 0; j <= i; j++) {
        result[i] = Math.max(result[i], result[i-j] + arr[j]); 
    }
}
console.log(result[arr.length-1]);