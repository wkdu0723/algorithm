class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChildIndex(i) {
        return 2 * i + 1;
    }

    getRightChildIndex(i) {
        return 2 * i + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (
            index > 0 &&
            this.heap[index] < this.heap[this.getParentIndex(index)]
        ) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return min;
    }

    heapifyDown() {
        let index = 0;

        while (this.getLeftChildIndex(index) < this.heap.length) {
            const rightIndex = this.getRightChildIndex(index);
            const smallerChildIndex = this.getLeftChildIndex(index);

            if (
                rightIndex < this.heap.length &&
                this.heap[rightIndex] < this.heap[smallerChildIndex]
            ) {
                this.smallerChildIndex = rightIndex;
            }

            if (this.heap[index] > this.heap[smallerChildIndex]) {
                this.swap(index, smallerChildIndex);
                index = smallerChildIndex;
            }
        }
    }
}

const minHeap = new MinHeap();
minHeap.insert(10);
minHeap.insert(1);
console.log(minHeap.extractMin()); // 5
console.log(minHeap.extractMin()); // 30
