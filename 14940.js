const fs = require('fs');
const input = fs.readFileSync("./예제.txt").toString().trim().split("\n");
const inputLine = input[0].split(" ").map((v) => +v);
const [n, m] = [inputLine[0], inputLine[1]];
const graph = input.slice(1).map(line => line.split(" ").map(v => +v));
const visited = Array.from({length: n}, () => Array.from({length: m}, ()=> 0))
const direction = [[-1, 0], [1, 0], [0, -1], [0, 1]];
let start = null;

for(let i=0; i<n; i++){
    for(let j=0; j<m; j++){
        if(graph[i][j] === 2){
            start = [i, j];
            break;
        } 
    }
}

class Queue {
    constructor() {
        this.front = 0;
        this.rear = 0;
        this.q = [];
    }

    enqueue(v) {
        this.q.push(v);
        this.rear++;
    }

    dequeue(){
        const value = this.q[this.front];
        this.front++;
        return value;
    }

    empty() {
        return this.front === this.rear;
    }
}

const bfs = (start) => {
    const myQ = new Queue();
    myQ.enqueue(start);

    while(!myQ.empty()){
        const [cx, cy] = myQ.dequeue();
        for(let d=0; d<4; d++){
            const dx = cx + direction[d][0];
            const dy = cy + direction[d][1];
            
            if(dx < 0 || dx >= n || dy < 0 || dy >= m) continue;
            if(graph[dx][dy] === 0) continue;
            if(visited[dx][dy] === 0){
                visited[dx][dy] = visited[cx][cy] + 1;
                myQ.enqueue([dx, dy])
            }
        }
    }
    visited[start[0]][start[1]] = 0;
}

bfs(start)

for(let x=0; x<n; x++){
    for(let y=0; y<m; y++){
        if(graph[x][y] === 1 && visited[x][y] === 0){
            visited[x][y] = -1;
        }
    }
}
console.log(visited.map(v => v.join(" ")).join("\n"))