const { log } = require("./../events/log");

import http from "http";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import EventEmitter from "events";

class MyEmitter extends EventEmitter {}

// inicializar o objecto emitter
const myEmitter: EventEmitter = new MyEmitter();

const port = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
});

server.listen(port, () => console.log(`server running on port ${port}`));


 


















// add listen for the log event
// myEmitter.on("log", (msg: string) => {
//   log(msg);
// });

// myEmitter.emit("log", "Log event emitted");

