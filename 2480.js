const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split(" ").map(Number);
const numberInfo = new Map();

for(const v of input){
	if(numberInfo.has(v)) numberInfo.set(v, numberInfo.get(v)+1);
	else numberInfo.set(v, 1)
}
const [k, v] = [...numberInfo].sort((a, b) => b[1] - a[1])[0]

if(v === 3){
	console.log(10000 + (k * 1000));
	return;
} else if (v == 2) {
	console.log(1000 + (k * 100));
	return;
} else {
	console.log(Math.max(...numberInfo.keys()) * 100);
	return;
}