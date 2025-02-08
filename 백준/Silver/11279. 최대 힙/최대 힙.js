const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const n = Number(input[0]);
const list = input.slice(1).map(Number);

class Heap {
  constructor() {
    this.heap = [];
  }
  test() {
    console.log(this.heap);
  }
  get() {
    if (this.heap.length === 0) {
      return 0;
    } else if (this.heap.length === 1) {
      return this.heap.pop();
    } else {
      const max = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown(0);
      return max;
    }
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(position) {
    const temp = this.heap[position];
    while (position > 0) {
      const index = Math.floor((position - 1) / 2);
      if (this.heap[index] >= temp) break;
      this.heap[position] = this.heap[index];
      position = index;
    }
    this.heap[position] = temp;
  }

  bubbleDown(position) {
    const leftIndex = 2 * position + 1;
    const rightIndex = 2 * position + 2;
    const length = this.heap.length;
    let maxIndex = position;

    if (leftIndex < length && this.heap[leftIndex] > this.heap[maxIndex]) {
      maxIndex = leftIndex;
    }

    if (rightIndex < length && this.heap[rightIndex] > this.heap[maxIndex]) {
      maxIndex = rightIndex;
    }

    if (maxIndex !== position) {
      const temp = this.heap[position];
      this.heap[position] = this.heap[maxIndex];
      this.heap[maxIndex] = temp;
      this.bubbleDown(maxIndex);
    }
  }
}

const heap = new Heap();
const answer = [];
list.forEach((item) => {
  if (item === 0) {
    answer.push(heap.get());
  }
  heap.insert(item);
});
console.log(answer.join("\n"));
