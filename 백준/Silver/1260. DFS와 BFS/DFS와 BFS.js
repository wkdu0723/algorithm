const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const [N, M, V] = input[0].split(" ").map(Number);
const list = input.slice(1).map((row) => row.split(" ").map(Number));
const graph = Array.from({ length: N + 1 }, () => []);
const dfsVisited = Array.from({ length: N + 1 }, () => false);
const bfsVisited = Array.from({ length: N + 1 }, () => false);
const dfsResult = [];
const bfsResult = [];

for (let i = 0; i < M; i++) {
  const [a, b] = list[i];
  graph[a].push(b);
  graph[b].push(a);
}

for (let i = 1; i < graph.length; i++) {
  graph[i].sort((a, b) => a - b);
}

const dfs = (v) => {
  dfsVisited[v] = true;
  dfsResult.push(v);

  for (let neighbor of graph[v]) {
    if (!dfsVisited[neighbor]) {
      dfs(neighbor);
    }
  }
};

const bfs = (v) => {
  const queue = [];
  queue.push(v);
  bfsVisited[v] = true;

  while (queue.length > 0) {
    const current = queue.shift();
    bfsResult.push(current);
    for (let neighbor of graph[current]) {
      if (!bfsVisited[neighbor]) {
        queue.push(neighbor);
        bfsVisited[neighbor] = true;
      }
    }
  }
};

dfs(V);
bfs(V);
console.log(dfsResult.join(" "));
console.log(bfsResult.join(" "));
