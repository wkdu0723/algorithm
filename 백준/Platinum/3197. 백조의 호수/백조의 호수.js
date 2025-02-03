const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const [M, N] = input[0].split(" ").map(Number);
const lake = input.slice(1).map((row) => row.split(""));
const direction = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return popItem.item;
  }
}

const swan = [];
const waterQ = new Queue();
const visited = Array.from(Array(M), () => Array(N).fill(false));

lake.forEach((row, i) => {
  row.forEach((item, j) => {
    if (item === ".") {
      waterQ.push([i, j]);
    } else if (item === "L") {
      swan.push([i, j]);
      lake[i][j] = ".";
      waterQ.push([i, j]);
    }
  });
});

const swanQ = new Queue();
const swanTemp = [];
const [sx, sy] = swan[0];
const [ex, ey] = swan[1];
swanQ.push([sx, sy]);
visited[sx][sy] = true;
let days = 0;

const test = () => {
  while (true) {
    while (swanQ.length > 0) {
      const [x, y] = swanQ.pop();
      for (const [dx, dy] of direction) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx === ex && ny === ey) {
          return days;
        }

        if (nx >= 0 && nx < M && ny >= 0 && ny < N && !visited[nx][ny]) {
          if (lake[nx][ny] === ".") {
            swanQ.push([nx, ny]);
          } else {
            swanTemp.push([nx, ny]);
          }
          visited[nx][ny] = true;
        }
      }
    }

    while (swanTemp.length > 0) {
      const [x, y] = swanTemp.shift();
      swanQ.push([x, y]);
    }

    const waterQueueSize = waterQ.length;
    for (let i = 0; i < waterQueueSize; i++) {
      const [x, y] = waterQ.pop();
      for (const [dx, dy] of direction) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < M && ny >= 0 && ny < N && lake[nx][ny] == "X") {
          waterQ.push([nx, ny]);
          lake[nx][ny] = ".";
        }
      }
    }

    days++;
  }
};

console.log(test());
