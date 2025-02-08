const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const n = Number(input[0]);
const list = input.slice(1).map(Number);

const minHeap = () => ({
    heap: [],
    empty() {
        if (this.heap.length === 0) {
            return true;
        }
        return false;
    },
    extractMin() {
        if (this.heap.length == 1) {
            return this.heap.pop();
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    },
    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    },
    swap(x, y) {
        const temp = this.heap[x];
        this.heap[x] = this.heap[y];
        this.heap[y] = temp;
    },
    bubbleUp(position) {
        const temp = this.heap[position];
        while (position > 0) {
            const idx = Math.floor((position - 1) / 2); // 부모 노드 계산
            if (this.heap[idx] <= temp) break; // 부모가 자식보다 작거나 같으면 종료
            this.heap[position] = this.heap[idx]; // 부모 노드와 자식 노드 교환
            position = idx;
        }
        this.heap[position] = temp; // 최종 위치에 값을 저장
    },
    bubbleDown(position) {
        let smallIndex = position;
        const length = this.heap.length;
        while (true) {
            const leftIndex = 2 * smallIndex + 1;
            const rightIndex = 2 * smallIndex + 2;
            let swapped = false;

            if (
                leftIndex < length &&
                this.heap[leftIndex] < this.heap[smallIndex]
            ) {
                smallIndex = leftIndex;
                swapped = true;
            }

            if (
                rightIndex < length &&
                this.heap[rightIndex] < this.heap[smallIndex]
            ) {
                smallIndex = rightIndex;
                swapped = true;
            }

            if (!swapped) break;

            this.swap(smallIndex, position);
            position = smallIndex;
        }
    },
});

const heap = minHeap();
const answer = [];
for (let i = 0; i < n; i++) {
    const value = list[i];
    if (value == 0) {
        if (heap.empty()) {
            answer.push(0);
        } else {
            answer.push(heap.extractMin());
        }
    } else {
        heap.insert(value);
    }
}

console.log(answer.join("\n"));
