const fs = require("fs");
// const readFileSyncUrl = "/dev/stdin";
const readFileSyncUrl = "input.txt";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split(" ");
const numbers = input.map((x) => Number(x));
const result = Array(numbers.length).fill(0);

const merge = (arr, start, middle, end) => {
    let i = start;
    let k = start;
    let j = middle + 1;

    while (i <= middle && j <= end) {
        if (arr[i] <= arr[j]) {
            result[k] = arr[i];
            i++;
        } else {
            result[k] = arr[j];
            j++;
        }
        k++;
    }

    if (i > middle) {
        for (let t = j; t <= end; t++) {
            result[k] = arr[t];
            k++;
        }
    } else {
        for (let t = i; t <= middle; t++) {
            result[k] = arr[t];
            k++;
        }
    }



    for (let t = start; t <= end; t++) {
        arr[t] = result[t];
    }
};

const divide = (arr, start, end) => {
    if (start >= end) return;
    const midde = parseInt(Math.floor(start + end) / 2);
    divide(arr, start, midde);
    divide(arr, midde + 1, end);
    merge(arr, start, midde, end);
}

divide(numbers, 0, numbers.length - 1);
console.log(result);

