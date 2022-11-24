// const express = require("express");
// const app = express();

// function fibo(n) {
//   if (n < 2) return 1;
//   else return fibo(n - 2) + fibo(n - 1);
// }

// // app.get("/fibo/:num", (req, res) => {
// //   console.log(req.params.num);
// //   res.status(200).send(`${fibo(req.params.num)}`);
// // });
// // const server = http.createServer((req, res) => {
// //   "use strict";
// //   console.log(req.);
// //   if (req.url == "/fibo") {
// //     let num = parseInt(req.headers.fibo);
// //     console.log(num);
// //     res.end(`${fibo(num)}`);
// //   } else {
// //     res.end("hello world");
// //   }
// // });

// // server.listen(8000, () => console.log("running on port 8000"));
// // app.listen(8000, () => console.log("running on port 8000"));

// const os = require("os");
// const http = require("http");
// const cluster = require("cluster");
// const port = 4000;
// function init() {
//   if (cluster.isMaster) {
//     let numCPUs = os.cpus().length;
//     console.log(" Num of CPU ", numCPUs);
//     for (let idx = 0; idx < numCPUs; idx++) {
//       let worker = cluster.fork();
//       worker.on("message", function (msg) {
//         console.log("Worker " + msg.worker + " served a " + msg.cmd);
//         worker.send("Good work!");
//       });
//     }
//   } else {
//     startHttpServer();
//   }
// }
// function startHttpServer() {
//   process.on("message", function (msg) {
//     console.log(msg);
//   });
//   //   var httpsServer = http.createServer(function (req, res) {
//   //     res.writeHead(200);
//   //     res.end("Hello Viewer!");
//   //     process.send({ worker: cluster.worker.id, cmd: "request" });
//   //   });
//   //   httpsServer.listen(port);
//   app.get("/fibo/:num", (req, res) => {
//     console.log(req.params.num);
//     res.status(200).send(`${fibo(req.params.num)}`);
//     process.send({
//       worker: cluster.worker.id,
//       cmd: `${fibo(req.params.num)} request`,
//     });
//   });
//   app.listen(8000, () => console.log("running on port 8000"));
// }
// init();

const os = require("os");
const cluster = require("cluster");
const express = require("express");
const app = express();
const port = 8000;

//To check whether it's a cluster manager(Master Process)
if (cluster.isMaster) {
  //This method creates the worker processes
  let numCPUs = os.cpus().length;
  console.log(" Num of CPU ", numCPUs);
  for (let idx = 0; idx < numCPUs; idx++) {
    // cluster.fork();
    let worker = cluster.fork();
    worker.on("message", function (msg) {
      console.log(
        "Worker " + msg.worker + " served a " + msg.cmd,
        new Date().toISOString()
      );
      worker.send("Good work!");
    });
  }
  //   cluster.fork();
  //   cluster.fork();
  //   cluster.fork();
  //   cluster.fork(); //Here we created four worker processes
} else {
  {
    /** Application Logic Starts **/
  }
  process.on("message", function (msg) {
    console.log(msg);
  });

  function fib(n) {
    if (n < 2) {
      return n;
    }

    return fib(n - 1) + fib(n - 2);
  }

  app.get("/", (req, res) => {
    console.log(`finding fibo for 42 ${process.pid}`, new Date().toISOString());
    const result = fib(42);
    process.send({
      worker: cluster.worker.id,
      cmd: `${result} request`,
    });
    return res.send({ data: result, time: new Date().toISOString() });
  });

  app.listen(port, () =>
    console.log(`App listening on port ${port} ${process.pid}!`)
  );
  {
    /** Application Logic Ends **/
  }
}
