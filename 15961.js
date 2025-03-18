const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split("\n");
const [N, d, k, c] = input[0].split(" ").map(Number);
const susi = [];
const infos = {};
let unique = 0;
let answer = [];
for(let i=1; i<N+1; i++){
	susi.push(+input[i])
}
// 문제는 회전초밥 : 배열 확장
for(let i=0; i<k-1; i++){
	susi.push(susi[i]);
}

// 처음 슬라이드 윈도우
for(let i=0; i<k; i++){
	if(susi[i] in infos) infos[susi[i]] +=1;
	else {
		infos[susi[i]] = 1;
		unique++;
	}
}
// 쿠폰 추가
if(c in infos) infos[c] +=1;
else {
	infos[c] =1;
	unique++;
}
answer.push(unique)

for(let i=1; i<N; i++){
	// 쿠폰 추가
	if(c in infos) infos[c] +=1;
	else {
		infos[c] = 1;
		unique++;
	}

	const minus = susi[i-1];
	const plus = susi[(i+k)-1];
	infos[minus] -=1;
	if(infos[minus] == 0){
		unique--;
		delete infos[minus]
	}
	if(plus in infos) infos[plus] +=1;
	else {
		infos[plus] =1;
		unique++;
	}

	answer.push(unique)
}

console.log(Math.max(...answer));