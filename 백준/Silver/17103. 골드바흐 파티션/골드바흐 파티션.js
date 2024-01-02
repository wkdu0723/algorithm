const fs = require('fs');
const input = fs.readFileSync("./dev/stdin").toString().trim().split('\n').map(Number);
const nums = input.splice(1);

const answer = [];
let prime = new Array(1000001).fill(true);
prime[0] = false;
prime[1] = false;

const prime_sqrt = Math.floor(Math.sqrt(1000001));

for(let i = 2; i<prime_sqrt; i++){
  if(!prime[i]) continue;
  let isPrime = true;
  for(let j=2; j<i; j++){
    if(i%j==0){
      isPrime = false;
      break;
    }
  }
  if(isPrime){
    for(let k = i+i; k<=1000001; k+=i){
      prime[k]=false;
    }
  }
}

nums.forEach(v=>{
  let cnt = 0;
  for(let i = 2; i<=Math.floor(v/2); i++){
    if(prime[i]&&prime[v-i]){
      cnt++;
    }
  }
  answer.push(cnt)
})
console.log(answer.join('\n'))