const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split("\n");
const [N, X] = input[0].split(" ").map(Number);
const visitors = input[1].split(" ").map(Number);
let count = 0;
const numbers = {};

for(let i=0; i<X; i++){
	count += visitors[i]
}
numbers[count] = 1

for(let i=1; i<N; i++){
	if(i+X-1 >= N) break;
	count -= visitors[i-1];
	count += visitors[i+X-1];
	if(count in numbers) numbers[count] += 1;
	else numbers[count] = 1;
}

const sorted = Object.entries(numbers).sort((k, v) => v[1] - v[0]);
if(sorted[0][0] == "0") console.log("SAD");
else {
	console.log(sorted[0][0])
	console.log(sorted[0][1])
}