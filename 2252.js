const fs = require('fs');
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const inDegree = Array.from({length: N+1}, () => 0);
const graph = Array.from({length: N+1}, () => []);
const visited = Array.from({length: N+1}, () => false);
const answer =[];

for(let i=1; i<M+1; i++){
	const [s, e] = input[i].split(" ").map(Number)
	graph[s].push(e)
	inDegree[e]+=1;
}

const topoLogicalSort = (start, inDegree) => {
	const q = [start];

	while(q.length > 0) {
		const node = q.shift();
		visited[node] = true;
		answer.push(node)

		for(const next of graph[node]){
			inDegree[next]--;
			if(inDegree[next] == 0 && !visited[next]) q.push(next);
		}
	}
}

for(let i=1; i<=N; i++) {
	if(!visited[i] && inDegree[i] == 0){
		topoLogicalSort(i, inDegree)
	}
}

console.log(answer.join(" "))