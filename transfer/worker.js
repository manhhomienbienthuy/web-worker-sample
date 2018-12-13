const defaultReply = (message) => {}

const reply = (...args) => {
    if (args.length < 1 ) {
        throw new TypeError('at least 1 argument');
    }
    postMessage({
        method: args[0],
        arguments: Array.prototype.slice.call(args, 1)
    })
}

const queryableFunctions = {
    getRandom: () => {
        reply('printStuff', Math.random());
    },
    waitSomeTime: () => {
        setTimeout(() => {reply('doAlert', 1, 'seconds')}, 1000);
    }
}

onmessage = (event) => {
    if (event.data instanceof Object &&
        event.data.hasOwnProperty('method') &&
        event.data.hasOwnProperty('arguments')) {
        queryableFunctions[event.data.method].apply(self,
            event.data.arguments)
    } else {
        defaultReply(event.data);
    }
}
