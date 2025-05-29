const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split("\n");
const N = +input[0]
const graph = Array.from({length: N+1}, () => []);
const times = Array.from({length: N+1}, () => 0);
const inDegree = Array.from({length: N+1}, ()=> 0);
const endTime = Array.from({length: N+1}, () => 0);

for(let i=1; i<=N; i++){
	const [time, count, ...prev] = input[i].split(" ").map(Number);
		times[i] = time;
	for(let j=0; j<count; j++){
		graph[prev[j]].push(i);
		inDegree[i]++;
	}
}

class MinHeap {
	constructor() {
		this.heap = [];
	}

	size() {
		return this.heap.length;
	}

	push(value) {
		this.heap.push(value);
		let index = this.heap.length - 1


		while(index > 0) {
			const parentIdx = Math.floor((index-1)/ 2);

			if(this.heap[parentIdx][0] <= this.heap[index][0]) break;
			this.swap(parentIdx, index)
			index = parentIdx;
		}
	}

	pop() {
		if(this.isEmpty()) return null;
		if(this.heap.length == 1) return this.heap.pop();
		const value = this.heap[0];
		this.heap[0] = this.heap.pop();
		const heapSize = this.heap.length;
		let index = 0;

		while(true) {
			let smallest = index;
			const leftIdx = (2*index)+1;
			const rightIdx = (2*index)+2;

			if(leftIdx < heapSize && this.heap[leftIdx][0] < this.heap[smallest][0]){
				smallest = leftIdx;
			}

			if(rightIdx < heapSize && this.heap[rightIdx][0] < this.heap[smallest][0]) {
				smallest = rightIdx;
			}


			if(smallest == index) break;
			this.swap(index, smallest)
			index = smallest;
		}

		return value;
	}

	swap(a, b) {
		[this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
	}

	isEmpty() {
		return this.heap.length == 0
	}
}

const q = new MinHeap();
for(let i=1; i<inDegree.length; i++){
	if(inDegree[i] === 0) {
		endTime[i] = times[i]
		q.push([endTime[i], i])
	}
}

const topoLogicalSort = () => {
	while(q.size() > 0){
		const [t, node] = q.pop();

		for(const next of graph[node]){
			inDegree[next]--;
			endTime[next] = Math.max(endTime[next], t + times[next]);
			if(inDegree[next] === 0){
				q.push([endTime[next], next])
			}
		}
	}
}

topoLogicalSort();

console.log(Math.max(...endTime))