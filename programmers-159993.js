//https://school.programmers.co.kr/learn/courses/30/lessons/159993
// maps[i]는 다음 5개의 문자들로만 이루어져 있습니다.
// S : 시작 지점
// E : 출구
// L : 레버
// O : 통로
// X : 벽

// ["SOOOL","XXXXO","OOOOO","OXXXX","OOOOE"] 16
// ["LOOXS","OOOOX","OOOOO","OOOOO","EOOOO"] -1

const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

function isOutOfIndex(x, y, N, M) {
    return x < 0 || y < 0 || x >= N || y >= M
}

function findLocation(map, goal) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] === goal) {
                return [i, j]
            }
        }
    }
}

function solution(maps) {
    const startLocation = findLocation(maps, 'S');
    const toLever = bfs(maps, startLocation, 'L')

    const leverLocation = findLocation(maps, 'L');
    const toExit = bfs(maps, leverLocation, 'E')

    if(toLever === -1 || toExit === -1) {
        return -1
    }

    return toLever + toExit
}

function bfs(maps, start, goal) {
    let answer = 0;

    const myMap = maps.map(road => road.split(''));
    const N = myMap.length;
    const M = myMap[0].length;

    const [x, y] = start;
    let visited = Array.from({length: N}, () => Array(M).fill(false));
    visited[x][y] = true;
    const queue = [[x, y]];

    while (queue.length > 0) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const [currentX, currentY] = queue.shift();

            if (myMap[currentX][currentY] === goal) {
                return answer;
            }

            // 4방 탐색
            for (let j = 0; j < 4; j++) {
                const toX = currentX + dx[j];
                const toY = currentY + dy[j];

                if (!isOutOfIndex(toX, toY, N, M) && !visited[toX][toY] && myMap[toX][toY] !== 'X') {
                    visited[toX][toY] = true;
                    queue.push([toX, toY]);
                }
            }
        }

        answer++;
    }

    return -1;
}


console.log(solution(["LOOXS","OOOOX","OOOOO","OOOOO","EOOOO"]))
