"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { log } = require('./events');
const events_1 = __importDefault(require("events"));
class MyEmitter extends events_1.default {
}
;
// inicializar o objecto emitter
const myEmitter = new MyEmitter();
// add listen for the log event
myEmitter.on('log', (msg) => {
    log(msg);
});
setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted');
}, 3000);
