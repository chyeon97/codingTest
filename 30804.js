const fs = require('fs');
const input = fs.readFileSync("./input.txt").toString().trim().split("\n");
const N = +input[0];
const inputLine = input[1].toString().trim().split(" ").map((v) => +v);
const fruit = {};

let answer = 0;
let [s, e] = [0, 0];

const maxLength = () => {
    return Object.values(fruit).reduce((acc, cur) => acc + cur , 0);
}

while(e < N){
    if(Object.keys(fruit).length <= 2){
        if(inputLine[e] in fruit){
            fruit[inputLine[e]] +=1;
        }else {
            fruit[inputLine[e]] = 1;
        }
        e++;
    }
    
    if(Object.keys(fruit).length > 2){
        fruit[inputLine[s]] -=1;
        if(fruit[inputLine[s]] == 0) delete fruit[inputLine[s]];
        s++;
    }

    answer = Math.max(answer, maxLength());
    
}

console.log(answer)