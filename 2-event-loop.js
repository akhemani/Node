const fs = require('fs');

fs.readFile('test.txt', () => {
    console.log('I/O finished');
    
    setTimeout(() => {
        console.log('timeout 2 finished');
    }, 0);

    setTimeout(() => {
        console.log('timeout 3 finished');
    }, 3000);

    setImmediate(() => {
        console.log('immediate 2 finished');
    });
});

setTimeout(() => {
    console.log('timeout 1 finished');
}, 0);

setImmediate(() => {
    console.log('immediate 1 finished');
});

console.log('Hello from top level code');