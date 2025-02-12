// N, M, B
// N * M 좌표, B의 아이템 갯수
// 좌표 (i, j)의 가장 위에 있는 블록을 제거하여 인벤토리에 넣는다. - 2초
// 인벤토리에서 블록 하나를 꺼내어 좌표 (i, j)의 가장 위에 있는 블록 위에 놓는다. - 1초
// ‘땅 고르기’ 작업에 걸리는 최소 시간과 그 경우 땅의 높이를 출력하시오.
const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split("\n").map(v => v.split(' ').map(Number))
const [N, M, B] = input[0];
const land = input.slice(1);
let time = 0;
let minHeight = 0;
let min_time = Infinity;

// 모든 땅의 높이에 대해 구해야함
for(let h=0; h<=256; h++){
	let remove = 0;
	let add = 0;
	for(let x=0; x<N; x++){
		for(let y=0; y<M; y++){
			if(land[x][y] == h) continue; // 같으면 넘어감
			if(land[x][y] > h){
				remove += land[x][y] - h; // 제거해야할 블록 수 -> 최소 높이가 h가 됨
			}else {
				add += h - land[x][y]; // 쌓아야하는 블록 수 -> 최소 높이가 h가 됨
			}
		}
	}

	if(remove + B >= add){ // 제거하고 인벤토리에 있는 블록 수 > 쌓아야하는 블록 수 -- 인벤토리에 있는 블록이 부족하지 않는지 체크하는 조건(평탄화 조건)
		time = remove * 2 + add;
		if(time < min_time || (time === min_time && h > minHeight)){
			min_time = time;
			minHeight = h;
		}
	}
}

console.log(min_time, minHeight)