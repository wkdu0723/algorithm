const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const n = Number(input[0]);
const list = input.slice(1).map(Number);

class MaxHeap {
  constructor() {
    this.values = [];
  }

  getLen() {
    return this.values.length;
  }

  enqueue(val) {
    this.values.push(val);
    this.bubbleUp(this.values.length - 1);
  }

  bubbleUp(position) {
    const temp = this.values[position];
    while (position > 0) {
      const index = Math.floor((position - 1) / 2);
      if (this.values[index] >= temp) break;
      this.values[position] = this.values[index];
      position = index;
    }
    this.values[position] = temp;
  }
  swap(x, y) {
    [this.values[x], this.values[y]] = [this.values[y], this.values[x]];
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  sinkDown(position) {
    const length = this.values.length;
    let largest = position;
    const left = 2 * position + 1;
    const right = 2 * position + 2;

    if (left < length && this.values[left] > this.values[largest]) {
      largest = left;
    }
    if (right < length && this.values[right] > this.values[largest]) {
      largest = right;
    }
    if (largest !== position) {
      this.swap(position, largest);
      this.sinkDown(largest);
    }
  }
}

// 작은수그룹
class MinHeap {
  constructor() {
    this.values = [];
  }

  getLen() {
    return this.values.length;
  }

  enqueue(val) {
    this.values.push(val);
    this.bubbleUp(this.values.length - 1);
  }

  bubbleUp(position) {
    const temp = this.values[position];
    while (position > 0) {
      const index = Math.floor((position - 1) / 2);
      if (this.values[index] <= temp) break;
      this.values[position] = this.values[index];
      position = index;
    }
    this.values[position] = temp;
  }

  dequeue() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown(0);
    }
    return max;
  }
  swap(x, y) {
    [this.values[x], this.values[y]] = [this.values[y], this.values[x]];
  }
  sinkDown(position) {
    const length = this.values.length;
    let smallest = position;
    const left = 2 * position + 1;
    const right = 2 * position + 2;

    if (left < length && this.values[left] < this.values[smallest]) {
      smallest = left;
    }
    if (right < length && this.values[right] < this.values[smallest]) {
      smallest = right;
    }
    if (smallest !== position) {
      this.swap(position, smallest);
      this.sinkDown(smallest);
    }
  }
}

const minHeap = new MinHeap(); // 작은수가 0번인덱스에 정렬되는 배열
const maxHeap = new MaxHeap(); // 큰수가 0번인덱스에 정렬되는 배열
const answer = [list[0]];
maxHeap.enqueue(list[0]);
for (let i = 1; i < n; i++) {
  if (list[i] > maxHeap.values[0]) minHeap.enqueue(list[i]);
  else maxHeap.enqueue(list[i]);

  if (maxHeap.getLen() > minHeap.getLen() + 1) {
    minHeap.enqueue(maxHeap.dequeue());
  } else if (minHeap.getLen() > maxHeap.getLen()) {
    maxHeap.enqueue(minHeap.dequeue());
  }
  answer.push(maxHeap.values[0]);
}
console.log(answer.join("\n"));
