"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { log } = require("./../events/log");
const http_1 = __importDefault(require("http"));
const events_1 = __importDefault(require("events"));
class MyEmitter extends events_1.default {
}
// inicializar o objecto emitter
const myEmitter = new MyEmitter();
const port = process.env.PORT || 3500;
const server = http_1.default.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
});
server.listen(port, () => console.log(`server running on port ${port}`));
// add listen for the log event
// myEmitter.on("log", (msg: string) => {
//   log(msg);
// });
// myEmitter.emit("log", "Log event emitted");
