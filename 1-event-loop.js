// this will not simulate the order, because we not put the asynchronous operations in callback

const fs = require('fs');

fs.readFile('test.txt', () => {
    console.log('I/O finished');
});

setTimeout(() => {
    console.log('timeout 1 finished');
}, 0);

setImmediate(() => {
    console.log('immediate 1 finished');
});


console.log('Hello from top level code');