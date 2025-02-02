const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const [M, N] = input[0].split(" ").map(Number);
const box = input.slice(1).map((row) => row.split(" ").map(Number));
const direction = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let queue = [];
let nextQueue = [];
let days = 0;

box.forEach((row, i) => {
  row.forEach((item, j) => {
    if (item === 1) {
      queue.push([i, j]);
    }
  });
});

while (queue.length > 0) {
  nextQueue = [];
  queue.forEach(([x, y]) => {
    direction.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < N && ny >= 0 && ny < M && box[nx][ny] === 0) {
        box[nx][ny] = 1;
        nextQueue.push([nx, ny]);
      }
    });
  });
  queue = nextQueue;
  if (queue.length > 0) days++;
}

const check = box.some((item) => item.includes(0));
console.log(check ? -1 : days);
