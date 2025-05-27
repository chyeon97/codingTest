const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const graph = Array.from({length: N+1}, () => []);
const inDegree = Array.from({length: N+1}, () => 0);
const answer = [];

class MinHeap {
	constructor() {
		this.heap = [];
	}

	push(node) {
		this.heap.push(node);

		// 마지막 인덱스로 들어오고, 상단을 최소값으로 유지해야하
		let index = this.heap.length - 1;
		while(index > 0){
			const parentIdx = Math.floor((index-1) / 2);
			if(this.heap[parentIdx] <= this.heap[index]) break; // 부모가 이미 작은 수이면 -> 최소힙을 유지
			this.swap(parentIdx, index)
			index = parentIdx;
		}
	}
	pop() {
		if(this.isEmpty()) return null;
		if(this.heap.length === 1 ) return this.heap.pop();
		// 가장 앞에 있는 노드 반환, 가장 마지막에 있는 노드를 맨 앞으로 가져와서 재배치
		const root = this.heap[0];
		this.heap[0] = this.heap.pop();
		let index = 0; // 가장 마지막에서 가져온 노드의 인덱스
		const heapSize = this.heap.length;

		while(true) {
			let smallest = index;
			const leftIdx = (2*index) + 1;
			const rightIdx = (2*index) + 2;

			if(leftIdx < heapSize && this.heap[leftIdx] < this.heap[smallest]){
				smallest = leftIdx;
			}
			if(rightIdx < heapSize && this.heap[rightIdx] < this.heap[smallest]){
				smallest = rightIdx;
			}

			if(index === smallest) break;

			this.swap(index, smallest);
			index = smallest;
		}

		return root;
	}

	swap(a, b) {
		[this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
	}

	isEmpty() {
		return this.heap.length === 0
	}

	size() {
		return this.heap.length
	}
}

for(let i=1; i<=M; i++){
	const [s, e] = input[i].split(" ").map(Number);
	graph[s].push(e);
	inDegree[e]+=1;
}

const q = new MinHeap();

for(let i=1; i<=N; i++){
	if(inDegree[i] == 0){
		q.push(i)
	}
}

const topoLogicalSort = () => {
	while(q.size() > 0) {
		const node = q.pop();

		if(node) {
			answer.push(node)
			for(const next of graph[node]){
				inDegree[next]--;
				if(inDegree[next] == 0){
					q.push(next)
				}
			}
		}

	}
}

topoLogicalSort()
console.log(answer.join(" "))
