const fs = require('fs');
const crypto = require('crypto');
const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 1;

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

    process.nextTick(() => console.log('process nextTick'));

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    });
    
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    });
    
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    });
    
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    });
});

setTimeout(() => {
    console.log('timeout 1 finished');
}, 0);

setImmediate(() => {
    console.log('immediate 1 finished');
});

console.log('Hello from top level code');