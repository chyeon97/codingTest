const fs = require('fs');
const input = fs.readFileSync("./input.txt").toString().trim().split("\n")
let [A, B] = input[0].split(" ").map(Number); // 시 분
const C = +input[1]; // 분 단위
let time = A;
let minute = B + C;

const getTimeMinute = (value) => {
	const time = Math.floor(value / 60);
	const minute = value % 60;
	return [time, minute]
}

while(minute >= 60){ // O(1)
	const [afterTime, afterMinute] = getTimeMinute(minute)
	time += afterTime;
	minute = afterMinute
	if(time >= 24) time -= 24;
}

console.log(time, minute)