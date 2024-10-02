//,https://www.acmicpc.net/problem/14940

const dx = [0, 1, 0, -1]
const dy = [-1, 0, 1, 0]

function isOutOfIndex(x, y, N, M) {
    return x < 0 || y < 0 || x >= N || y >= M
}

function resolve(N, M, Map) {
    const visited = Array.from({length: N}, () => Array(M).fill(false));
    const result = Array.from({length: N}, () => Array(M).fill(-1));

    let count = 0;
    const queue = [[0, 0]];

    result[0][0] = count;
    visited[0][0] = true;
    while (queue.length > 0) {
        count++;
        const size = queue.length;

        for(let j=0; j<size; j++) {
            const [currentX, currentY] = queue.shift();
            for (let i = 0; i < 4; i++) {
                const toX = currentX + dx[i];
                const toY = currentY + dy[i];
                if (!isOutOfIndex(toX, toY, N, M) && !visited[toX][toY]) {
                    if(Map[toX][toY] !== 0) {
                        visited[toX][toY] = true
                        result[toX][toY] = count

                        queue.push([toX, toY]);
                    } else {
                        visited[toX][toY] = true
                        result[toX][toY] = 0
                    }
                }
            }
        }
    }

    return result
}

const N = 15
const M = 15
const map = [[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]]

console.log(resolve(N, M, map))
