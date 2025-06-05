const fs = require('fs');
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");
let T = +input[0]; // 테스트케이스 갯수
let line = 1;
const readLine = () =>  input[line++];
const readNumber = () => readLine().split(" ").map(Number);
let graph = null;
let degree = null;
let counts = null;
let numbers = [];
let q = [];

const initValues = (M) => {
	q = [];
	graph = Array.from({length: M+1}, () => []);
	degree = Array.from({length: M+1}, () => 0);
 	counts = Array.from({length: M+1}, () => 0);
 	numbers = Array.from({length: M+1}, () => []);
}

const topologicalSort = () => {
	while(q.length > 0) {
		const node = q.shift();
		const currentCount = counts[node];

		for(const next of graph[node]){
			degree[next]--;
			numbers[next].push(currentCount)
			
			if(degree[next] === 0){
				q.push(next)
				const max = Math.max(...numbers[next]);
				if(numbers[next].filter(value => value == max).length >= 2) {
					counts[next] = max+1;
				}else {
					counts[next] = max;
				}
			}
		}
	}
}

while(T > 0){
	let [K, M, P] = readNumber();
	initValues(M);
	
	while(P > 0) {
		const [start, end] = readNumber();
		graph[start].push(end);
		degree[end]++;
		P--;
	}

	for(let i=1; i<=M; i++){
		if(degree[i] === 0){
			counts[i] = 1;
			q.push(i);
		}
	}


	topologicalSort();
	console.log(K, counts[M])

	T--;
}