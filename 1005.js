const fs = require('fs');
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");
let line = 0;
const readLine = () => input[line++];
const readNumber = () => readLine().split(" ").map(Number);
let T = +readLine();

class minHeap {
    constructor() {
        this.heap = [];
    }

    isEmpty() {
        return this.heap.length == 0
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    push(value) {
        this.heap.push(value);
        let index = this.heap.length - 1;
        while(index > 0){
            let parent = Math.floor((index-1) / 2);
            if(this.heap[parent][0] <= this.heap[index][0]) break;
            this.swap(parent, index);
            index = parent;
        }
    }

    pop() {
        if(this.isEmpty()) return null;
        if(this.heap.length  === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        let index=0;
        const heapSize = this.heap.length;

        while(true) {
            let smallest = index;
            const left = (2*index)+1;
            const right = (2*index)+2;

            if(left < heapSize && this.heap[left][0] < this.heap[smallest][0]){
                smallest = left
            }

            if(right <heapSize && this.heap[right][0] < this.heap[smallest][0]){
                smallest = right
            }

            if(smallest == index) break;
            this.swap(smallest, index);
            index = smallest;
        }
        return root;
    }
}


const topoLogicalSort = (q, graph, degree, times, endTime) => {
    while(!q.isEmpty()) {
        const [t, node] = q.pop();

        for(const next of graph[node]){
            degree[next]--;
            endTime[next] = Math.max(endTime[next], t + times[next-1])
            if(degree[next] == 0){
                q.push([endTime[next], next])
            }
        }
    }
}


while(T>0){
    T--;
    let [N, K] = readNumber(); // N: 건물갯수, K:건설 순서 규칙 수
    const takeTimes = readNumber(); // 건물별 걸리는 시간
    let graph = Array.from({length: N+1}, () => []);
    let degree = Array.from({length: N+1}, () => 0);
    let endTime = Array.from({length: N+1}, () => 0);
    
    while(K > 0){
        const [S, E] = readNumber();
        K--;
        graph[S].push(E);
        degree[E]++;
    }

    const W = +readLine();
    const q = new minHeap();
    
    for(let i=1; i<=N; i++){
        if(degree[i] == 0) {
            endTime[i] = takeTimes[i-1]
            q.push([endTime[i], i])
        }
    }

    topoLogicalSort(q, graph, degree, takeTimes, endTime)
    console.log(endTime[W])
}