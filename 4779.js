const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split("\n").map(Number);

const divide = (str) => {
	if(str.length <= 1) return str
	let size = Math.floor(str.length / 3); // 3등분
	let left = str.slice(0, size); // 0~size 까지
	let mid = " ".repeat(size) // size만큼 공백 처리
	let right = str.slice(2*size); // 문자열의 left + mid 이후 모든 문자들

	const left_str = divide(left); // 분할
	const right_str = divide(right); // 분할

	return left_str + mid + right_str; // 정복
}


for(const N of input){
	const value = "-".repeat(Math.pow(3, N));
	console.log(divide(value))
}

