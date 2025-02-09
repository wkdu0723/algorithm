const fs = require("fs");
const readFileSyncUrl = "/dev/stdin";
const input = fs.readFileSync(readFileSyncUrl).toString().trim().split("\n");
const [N, B] = input[0].split(" ").map(Number);
let matrix = input.slice(1).map((row) => row.split(" ").map(Number));
let unitMatrix = Array.from({ length: N }, (_, i) =>
    Array.from({ length: N }, (_, j) => (i === j ? 1 : 0))
);
const mod = 1000;

/**
 *
 * @param {*} A: 행렬
 * @param {*} B: 행렬
 * @param {*} N: 열/행 갯수
 */
const mul = (A, B, N) => {
    const result = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => 0)
    );
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < N; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
            result[i][j] %= mod;
        }
    }
    return result;
};

const solution = (count) => {
    while (count) {
        if (count % 2 === 1) {
            unitMatrix = mul(unitMatrix, matrix, N);
            count--;
        }

        matrix = mul(matrix, matrix, N);
        count = Math.floor(count / 2);
    }
    return unitMatrix;
};

solution(B);

unitMatrix.forEach((item) => {
    console.log(item.join(" "));
})
