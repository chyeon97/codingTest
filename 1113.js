const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map((v) => +v);
const MAPS = input.slice(1).map(info => info.split("").map(v => +v));
const visited = Array.from({length: N}, () => Array.from({length: M},  () => false));
const direction = [[1, 0], [-1, 0], [0, -1], [0, 1]];
let water = 0;

class MaxHeap {
	constructor() {
		this.heap = [null];
	}

	enqueue(value) {
		this.heap.push(value);
		let [curIdx, parentIdx] = [this.heap.length-1, Math.floor((this.heap.length - 1) / 2)];
		while(parentIdx > 0 && this.heap[parentIdx][2] > value[2]){
			this.swap(parentIdx, curIdx);
			curIdx = parentIdx;
			parentIdx = Math.floor(curIdx/2);
		}
	}

	dequeue() {
		if(this.heap.length <= 2) return this.heap.pop(); // 루트 정점만 남은 경우
		const result = this.heap[1];
		this.heap[1] = this.heap.pop();
		let [curIdx, leftIdx, rightIdx] = [1, 2, 3];


		while(this.heap[leftIdx]){
			let smallIdx = leftIdx
			if(this.heap[rightIdx] && this.heap[rightIdx][2] < this.heap[leftIdx][2]){
				smallIdx = rightIdx;
			}

			if(this.heap[curIdx][2] <= this.heap[smallIdx][2]){
				break;
			}
			this.swap(smallIdx, curIdx);
			curIdx = smallIdx;
			leftIdx = curIdx * 2;
			rightIdx =  curIdx * 2 + 1;
		}

		return result;
	}

	isEmpty(){
		return this.heap.length === 1
	}

	swap(a, b){
		[this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
	}
}

const myHeap = new MaxHeap();

// Step 1: 외곽 테두리를 큐에 삽입하고 방문처리
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (i === 0 || j === 0 || i === N - 1 || j === M - 1) {
            myHeap.enqueue([i, j, MAPS[i][j]]);
            visited[i][j] = true;
        }
    }
}

while(!myHeap.isEmpty()) {
	const [cx, cy, ch] = myHeap.dequeue();

	for(let i=0; i<4; i++){
		const [dx, dy] = [cx + direction[i][0], cy + direction[i][1]];
		if(dx < 0 || dx >= N || dy < 0 || dy >= M || visited[dx][dy]) continue;
		visited[dx][dy] = true;
		if(MAPS[dx][dy] < ch) { // 물이 고인다면
			water += (ch - MAPS[dx][dy]);
			myHeap.enqueue([dx, dy, ch]) // 물이 찬 높이
		}else {
			myHeap.enqueue([dx, dy, MAPS[dx][dy]]) // 물이 찬 높이
		}
	}
}
console.log(water)
