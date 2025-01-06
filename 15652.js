const fs = require('fs');
const [N, M] = fs.readFileSync("./예제.txt", 'utf-8').trim().split(" ").map(Number);
let arr = Array(M).fill("");

const dfs = (depth, start) => {
  if(depth == M){
    console.log(arr.join(" "))
    return;
  }
  for(let i=start;i <= N; i++){
    arr[depth] = i;
    dfs(depth+1, i);
  }
}

dfs(0, 1)