// 영업의 신
// 영업왕? 자신이 담당한 모든 매장에서 누적 매출 1위인 사원
// 사원별 담당 매장, 매장 누적 매출액 - empStore => 사원별 {담당매장 : 매장 누적 매출액}
// 매장별 담당 사원 - storeEmp
// 매장별 영업왕 - bestManager

const fs = require('fs');
const input = fs.readFileSync("./예제.txt").toString().trim().split("\n").map((item) => item.split(" ").map(Number))
const [N, M, K] = input[0];
const infos = input.slice(1, N+1)
const Q = input[N+1];
let count = 0;
const empStore = {};
const storeEmp = {};
const bestManager = {}; // 매장별 누적 매출액 1등
const answer = [];


for(let empNum=0; empNum<infos.length; empNum++){
    const row = infos[empNum];
    empStore[empNum+1] = {};
    // 짝수: 매장번호, 홀수: 매출액
    for(let i=0; i<row.length; i+=2){
        const storeNum = row[i];
        const revenue = row[i+1];

        empStore[empNum +1][storeNum] = revenue;
        
        if(!storeEmp[storeNum]) storeEmp[storeNum] = [];
        storeEmp[storeNum].push(empNum+1);

        if(!bestManager[storeNum] || bestManager[storeNum].revenue < revenue) {
            bestManager[storeNum] = {employee: empNum + 1, revenue}
        }
    }
}

const addSalesHistory = ([empNum, storeNum, money]) => {
    if(empStore[empNum].hasOwnProperty(storeNum)){
        empStore[empNum][storeNum] += +money;
    }else{
        empStore[empNum][storeNum] = +money;
    }
}

const bestSelesmanCount = () => {
    let result = 0; // 영엉왕 수 - 자신이 담당한 매장 모두 누적 매출액이 1위인 경우
    
    for(let empNum=1; empNum<=N; empNum++){
        let isKing = true;
        for(const storeNum of Object.keys(empStore[empNum])){
            if(bestManager[storeNum].employee != empNum){
                isKing = false;
                break;
            }
        }
        if(isKing) result++;
    }
    return result;
}


while(count < Q){
    const [사원, 매장, 매출액] = input[(N+2)+count];
    addSalesHistory([사원, 매장, 매출액]);
    // 기존 1위 직원 확인
    const prevLeader = bestManager[매장].employee;
    const maxRevenue = bestManager[매장].revenue;

    // 새로운 1위 찾기 (매장별 직원 리스트만 확인)
    let newLeader = prevLeader;
    let newMax = maxRevenue;

    for (const manager of storeEmp[매장]) {
        if (empStore[manager][매장] > newMax) {
            newLeader = manager;
            newMax = empStore[manager][매장];
        }
    }

    bestManager[매장] = {employee: newLeader, revenue: newMax};

    if(prevLeader != newLeader) {
        answer.push(bestSelesmanCount()); // 영업왕 재계산
    }else{
        if(answer.length == 0) answer.push(bestSelesmanCount())
        else answer.push(answer[answer.length -1]); // 기존값 유지
    }

    count++;
}

console.log(answer.join("\n"))