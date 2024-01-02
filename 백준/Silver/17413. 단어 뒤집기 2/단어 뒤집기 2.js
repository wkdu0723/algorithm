const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
// const readFileSyncUrl = "input.txt";
const input = fs.readFileSync(readFileSyncUrl).toString().trim();
const tagReg = /<[a-z ]+>/g;
const tag = input.match(tagReg) || [""];
const word = input.split(/<[a-z ]+>/);
const reverseWord = word.map((item) => {
    const temp = item.split(" ").map((x) => {
        return x.split("").reverse().join("");
    });
    return temp.join(" ");
});
const result = reverseWord.map((item, idx) => {
    const x = tag[idx] ?? ""
    return item + x;
}).join("");
console.log(result);