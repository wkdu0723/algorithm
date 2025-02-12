const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const [R, C] = input[0].split(" ").map(Number);
const mineralMap = input.slice(1, -2).map((row) => row.trim().split(""));
mineralMap.reverse();
const N = input.slice(-1).flatMap((row) => row.split(" ").map(Number));
const visited = Array.from(Array(R), () => Array(C).fill(false));
const cluster = [];
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

/**
 * 미네랄 부수기
 * type: 왼쪽 / 오른쪽
 * height: 막대 높이
 */
const breakMineral = (isLeft, height) => {
    if (isLeft) {
        for (let i = 0; i < C; i++) {
            if (mineralMap[height - 1][i] === "x") {
                mineralMap[height - 1][i] = ".";
                return;
            }
        }
    } else {
        for (let i = C - 1; i >= 0; i--) {
            if (mineralMap[height - 1][i] === "x") {
                mineralMap[height - 1][i] = ".";
                return;
            }
        }
    }
};

const bfs = (x, y) => {
    const queue = [[x, y]];
    let front = 0;
    while (queue.length > front) {
        const [x, y] = queue[front++];
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (
                nx >= 0 &&
                ny >= 0 &&
                nx < R &&
                ny < C &&
                !visited[nx][ny] &&
                mineralMap[nx][ny] === "x"
            ) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
            }
        }
    }
    return queue;
};

const fallDown = (clusterItem) => {
    while (true) {
        let isFallDown = false;
        const tempCluster = [];

        for (const [x, y] of clusterItem) {
            if (x === 0) return;

            if (mineralMap[x - 1][y] === "x") {
                isFallDown = true;
                break;
            }
            mineralMap[x][y] = ".";
            mineralMap[x - 1][y] = "x";
            tempCluster.push([x, y]);
        }

        if (isFallDown) {
            while (tempCluster.length) {
                const [x, y] = tempCluster.pop();
                mineralMap[x - 1][y] = ".";
                mineralMap[x][y] = "x";
            }
            break;
        } else {
            clusterItem.forEach(([x, y], i) => (clusterItem[i] = [x - 1, y]));
        }
    }
};

const solution = () => {
    for (let i = 0; i < N.length; i++) {
        breakMineral(i % 2 === 0, N[i]);

        visited.forEach((item) => item.fill(false));

        for (let x = 0; x < R; x++) {
            for (let y = 0; y < C; y++) {
                if (!visited[x][y] && mineralMap[x][y] === "x") {
                    visited[x][y] = true;
                    cluster.push(bfs(x, y));
                }
            }
        }

        if (cluster.length > 1) {
            cluster.forEach((e) => {
                e.sort((a, b) => a[0] - b[0]);
            });

            for (const clusterItem of cluster) {
                fallDown(clusterItem);
            }
            cluster.length = 0;
        }
    }
};

solution();
let answer = "";
for (let i = mineralMap.length - 1; i >= 0; i--) {
    answer += mineralMap[i].join("") + "\n";
}
console.log(answer.trim());