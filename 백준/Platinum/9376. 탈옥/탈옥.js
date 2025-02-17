const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const n = parseInt(input[0]);
let index = 1;
const testCases = [];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const empty = ".";
const wall = "*";
const door = "#";
const person = "$";

for (let i = 0; i < n; i++) {
    const [rows, cols] = input[index].split(" ").map(Number); // 행과 열 크기
    index++;

    const prison = [];
    for (let j = 0; j < rows; j++) {
        prison.push(input[index]); // 행렬 데이터 저장
        index++;
    }

    testCases.push({ rows, cols, prison });
}

const bfs = (h, w, [y, x], prisonMap) => {
    const visited = Array.from({ length: h + 2 }, () =>
        Array.from({ length: w + 2 }, () => false)
    );
    const doorMap = Array.from({ length: h + 2 }, () =>
        Array.from({ length: w + 2 }, () => 0)
    );
    const queue = [];
    queue.push([y, x]);
    while (queue.length > 0) {
        const [qy, qx] = queue.shift();
        for (let i = 0; i < 4; i++) {
            const ny = qy + dy[i];
            const nx = qx + dx[i];
            if (
                nx >= 0 &&
                ny >= 0 &&
                nx < w + 2 &&
                ny < h + 2 &&
                !visited[ny][nx]
            ) {
                if (prisonMap[ny][nx] === door) {
                    visited[ny][nx] = true;
                    queue.push([ny, nx]);
                    doorMap[ny][nx] = doorMap[qy][qx] + 1;
                }
                if (
                    prisonMap[ny][nx] === empty ||
                    prisonMap[ny][nx] === person
                ) {
                    visited[ny][nx] = true;
                    queue.unshift([ny, nx]);
                    doorMap[ny][nx] = doorMap[qy][qx];
                }
            }
        }
    }
    return doorMap;
};

const getMinimumSum = (person1, person2, person3, prisonMap) => {
    let minSum = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < person1.length; i++) {
        for (let j = 0; j < person1[i].length; j++) {
            if (prisonMap[i][j] === wall || prisonMap[i][j] === empty) continue;
            let sum = person1[i][j] + person2[i][j] + person3[i][j];
            if (prisonMap[i][j] === door) {
                sum -= 2;
            }
            minSum = Math.min(sum, minSum);
        }
    }
    return minSum;
};

for (let i = 0; i < testCases.length; i++) {
    const prison = testCases[i].prison.map((row) => row.trim().split(""));
    const h = testCases[i].rows;
    const w = testCases[i].cols;
    const prisoner = [];
    const prisonMap = Array.from({ length: h + 2 }, () =>
        Array.from({ length: w + 2 }, () => ".")
    );

    prison.forEach((row, i) => {
        row.forEach((col, j) => {
            if (col === person) {
                prisoner.push([i + 1, j + 1]);
            }
        });
    });
    for (let x = 0; x < h; x++) {
        for (let y = 0; y < w; y++) {
            prisonMap[x + 1][y + 1] = prison[x][y];
        }
    }

    const person1 = bfs(h, w, prisoner[0], prisonMap);
    const person2 = bfs(h, w, prisoner[1], prisonMap);
    const person3 = bfs(h, w, [0, 0], prisonMap);
    const test = getMinimumSum(person1, person2, person3, prisonMap);
    console.log(test);
}
