class TreeNode {
    constructor(value) {
        this.item = value;
        this.left = null;
        this.right = null;
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
        const node = new TreeNode(value);
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

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        const queue = new Queue();
        queue.insert(this.root);

        while (!queue.isEmpty()) {
            const currentNode = queue.pop();

            if (currentNode.left === null) {
                currentNode.left = newNode;
                return;
            } else if (currentNode.right === null) {
                currentNode.right = newNode;
                return;
            } else {
                queue.insert(currentNode.left);
                queue.insert(currentNode.right);
            }
        }
    }

    BFS() {
        if (this.root === null) return [];

        const result = [];
        const queue = new Queue();
        queue.insert(this.root);

        while (!queue.isEmpty()) {
            const node = queue.pop();
            result.push(node.item);

            if (node.left) queue.insert(node.left);
            if (node.right) queue.insert(node.right);
        }

        return result;
    }

    DFS(node = this.root, result = []) {
        if (node === null) return [];
        
        result.push(node.item);
        this.DFS(node.left, result);
        this.DFS(node.right, result);

        return result;
    }
}

const tree = new BinaryTree();
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
console.log(tree.BFS());
console.log(tree.DFS());
