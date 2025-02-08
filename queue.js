class Node {
    constructor(value) {
        this.item = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null; // 큐의 첫 번째 노드
        this.tail = null; // 큐의 마지막 노드
        this.length = 0; // 큐의 크기
    }

    insert(value) {
        const node = new Node(value);
        if (this.head === null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }
        this.tail = node;
        this.length++;
    }

    pop() {
        if (this.isEmpty()) return null;

        const popitem = this.head.item;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        this.length--;
        return popitem;
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }
}

const queue = new Queue();
queue.insert(10);
queue.insert(20);
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.size());
