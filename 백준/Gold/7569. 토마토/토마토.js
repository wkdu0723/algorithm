const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const [M, N, H] = input[0].split(" ").map(Number);
const box = Array.from({ length: H }, () =>
    Array.from({ length: N }, () => Array(M).fill(0))
);

class Node {
    constructor(value) {
        this.item = value;
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
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    pop() {
        if (this.length === 0) return null;

        const popItem = this.head.item;
        this.head = this.head.next;
        this.length--;
        return popItem;
    }
}

const direction = [
    [0, 0, 1],
    [0, 1, 0],
    [0, 0, -1],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
];
const tomato = new Queue();
let index = 1;
let days = 0;

for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
        box[i][j] = input[index++].split(" ").map(Number);
    }
}
for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
        for (let k = 0; k < M; k++) {
            if (box[i][j][k] === 1) {
                tomato.push([i, j, k, 0]);
            }
        }
    }
}
while (tomato.length > 0) {
    const [z, x, y, day] = tomato.pop();
    for (let [dz, dx, dy] of direction) {
        const nx = x + dx;
        const ny = y + dy;
        const nz = z + dz;
        if (
            nx >= 0 &&
            nx < N &&
            ny >= 0 &&
            ny < M &&
            nz >= 0 &&
            nz < H &&
            box[nz][nx][ny] === 0
        ) {
            tomato.push([nz, nx, ny, day + 1]);
            box[nz][nx][ny] = 1;

            days = days < day + 1 ? day + 1 : days;
        }
    }
}

const check = () => {
    box.forEach((row, i) => {
        row.forEach((item, j) => {
            if (item.includes(0)) days = -1;
        });
    });
};
check();
console.log(days);
