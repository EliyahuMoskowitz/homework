let sum = 0;
const args = global.process.argv;
for (let i = 2; i < args.length; i++) {
    sum += +args[i];
}

console.log(sum);

// console.log('The sum is ', x)

// console.log(global.process.argv)