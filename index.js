const demo = require('./demo');

const fs = require("node:fs");

// const text = fs.readFileSync('text.txt', 'utf-8')
// console.log(text)

fs.readFile('text.txt', 'utf-8', (err, text)=>{
    console.log(text);
});

console.log(demo.add(1,2));