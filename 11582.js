const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split("\n");
const N = +input[0];
let scoreList = input[1].split(" ").map((Number));
const K = +input[2];

const divide = (size, k) => {
	if(k < K) return;
	let jump = Math.floor(size / k);

	for(let i=0; i<size; i+=jump){
		const temp = scoreList.slice(i, i+jump).sort((a, b) => a-b);
		merge(temp, i, i+jump)
	}
	divide(size, Math.floor(k/2))
}

const merge = (arr, s, e) => {
	let index = 0;
	let scoreIndex = s;
	while(index < arr.length && scoreIndex < e){
		scoreList[scoreIndex] = arr[index];
		scoreIndex++;
		index++;
	}
}

divide(N, N/2);
console.log(scoreList.join(" "))