// https://www.acmicpc.net/problem/2178
// N*M 크기의 배열로 표현되는 미로
// 미로에서 1은 이동할 수 있는 칸을 나타내고 0은 이동할 수 없다.
// (1, 1)에서 출발하여 (N, M)위치로 이동할때 최소의 칸 수 (최단거리 = BFS)

// 탐색방향 시계방향 (상, 우, 하, 좌)
const dy = [0, 1, 0, -1]
const dx = [-1, 0, 1, 0]

function isOutOfIndex (x, y, N, M) {
    return x < 0 || y < 0 || x >= N || y >= M
}

function bfs (start, N, M, map) {
    const visited = Array.from({length: N}, () => Array(M).fill(false))
    visited[start[0]][start[1]] = true;

    const queue = [start]

    let count = 0
    while (queue.length > 0) {
        count++
        const size = queue.length;
        for (let i=0; i <size; i++) {
            const [currentX, currentY] = queue.shift();


            if (currentX === N - 1 && currentY === M - 1) {
                return count
            }


            for(let j= 0; j < 4; j++) {
                const toX =  currentX + dx[j];
                const toY = currentY + dy[j];

                if(!isOutOfIndex(toX, toY, N, M) && map[toX][toY] === 1 && !visited[toX][toY]) {
                    visited[toX][toY] = true
                    queue.push([toX, toY])
                }
            }

        }

    }

    return -1;
}
function solution(N, M, map) {
   return bfs([0, 0], N, M, map)

}


const example1= solution(4, 6, [[1,0,1,1,1,1], [1,0,1,0,1,0], [1,0,1,0,1,1], [1,1,1,0,1,1]]) //15
console.log(example1)
const example2= solution(4, 6, [[1,1,0,1,1,0], [1,1,0,1,1,0], [1,1,1,1,1,1], [1,1,1,1,0,1]]) //9
console.log(example2)
const example3= solution(2, 25, [[1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1], [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1]]) //38
console.log(example3)
const example4 = solution(7, 7, [[1,0,1,1,1,1,1],[1,1,1,0,0,0,1],[1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1]])
console.log(example4)
