const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const numbers = input[1].split(' ').map(Number);
let swap = 0;

const divide = (arr) => {
	if(arr.length == 1) return arr;

	const mid = Math.floor(arr.length / 2);
	let left = divide(arr.slice(0, mid));
	let right = divide(arr.slice(mid));

	return merge(left, right);
}

const merge = (left, right) => {
	let result = [];
	let [l, r] = [0, 0];

	while(l < left.length && r < right.length){
		if(left[l] <= right[r]) {
			result.push(left[l]);
			l++;
		}else {
			result.push(right[r])
			r++;
			swap += left.length - l; // 왼쪽 > 오른쪽 경우, swap은 왼쪽에 남은 원소 갯수만큼 이루어짐(왼쪽의 나머지 원소는 현재 원소보다 무조건 크기 때문)
		}
	}
	result = result.concat(left.slice(l))
	result = result.concat(right.slice(r))
	return result;
}

divide(numbers)
console.log(swap)
