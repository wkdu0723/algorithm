class Graph {
    constructor() {
        this.adjacencyList = {}; // 인접 리스트 (객체로 노드 연결)
    }

    // 노드 추가
    addNode(node) {
        if (!this.adjacencyList[node]) {
            this.adjacencyList[node] = [];
        }
    }

    // 간선 추가 (양방향 그래프)
    addEdge(node1, node2) {
        // 노드가 없다면 추가
        if (!this.adjacencyList[node1]) {
            this.addNode(node1);
        }
        if (!this.adjacencyList[node2]) {
            this.addNode(node2);
        }
        // 양방향 연결 (간선)
        this.adjacencyList[node1].push(node2);
        this.adjacencyList[node2].push(node1);
    }

    // 노드 삭제
    removeNode(node) {
        if (this.adjacencyList[node]) {
            // 해당 노드와 연결된 모든 간선 제거
            while (this.adjacencyList[node].length) {
                const adjacentNode = this.adjacencyList[node].pop();
                this.removeEdge(node, adjacentNode);
            }
            // 노드 삭제
            delete this.adjacencyList[node];
        }
    }

    // 간선 삭제 (양방향 그래프)
    removeEdge(node1, node2) {
        this.adjacencyList[node1] = this.adjacencyList[node1].filter(
            (node) => node !== node2
        );
        this.adjacencyList[node2] = this.adjacencyList[node2].filter(
            (node) => node !== node1
        );
    }

    // 그래프 출력 (인접 리스트 출력)
    printGraph() {
        for (const node in this.adjacencyList) {
            console.log(`${node} -> ${this.adjacencyList[node].join(", ")}`);
        }
    }

    getNeighbors(node) {
        return this.adjacencyList[node];
    }
}

const graph = new Graph();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode(0);
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "C");
graph.addEdge(0, "C");

graph.printGraph();
console.log("---------------");
console.log(graph.getNeighbors("A"));

// 간선 삭제 후 출력
graph.removeEdge("A", "C");
graph.printGraph();
console.log("---------------");

// 노드 삭제 후 출력
graph.removeNode("B");
graph.printGraph();
