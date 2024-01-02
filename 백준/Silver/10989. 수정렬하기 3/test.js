const fs = require("fs");
// const readFileSyncUrl = "/dev/stdin";
const readFileSyncUrl = "input.txt";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const numbers = input.map((x) => Number(x));

const sort = (arr, start, end) => {
    if (start >= end) return;
    let i = start + 1;
    let j = end;
    let temp = 0;
    let key = start;

    // 크로스하기 전까지
    while (i <= j) {
        while (arr[i] <= arr[key]) {
            i++;
        }
        while (arr[j] >= arr[key] && j > start) {
            j--;
        }

        if (i >= j) {
            temp = arr[j];
            arr[j] = arr[key];
            arr[key] = temp;
        } else {
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
    }

    sort(numbers, start, j - 1);
    sort(numbers, j + 1, end);
};

sort(numbers, 0, numbers.length - 1);
numbers.map((x) => {
    console.log(x);
});