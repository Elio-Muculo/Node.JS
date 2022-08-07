const { log } = require('./events');

import EventEmitter from "events";

class MyEmitter extends EventEmitter {

};


// inicializar o objecto emitter
const myEmitter: EventEmitter = new MyEmitter();

// add listen for the log event
myEmitter.on('log', (msg: string) => {
    log(msg);
});


setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted');
}, 3000);




