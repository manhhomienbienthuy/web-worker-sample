class QueryableWorker {
    constructor(url, defaultHandler, errorHandler) {
        this.worker = new Worker(url);
        this.handlers = {};
        this.defaultHandler = defaultHandler || function(){};

        if (errorHandler) {
            this.worker.onerror = errorHandler;
        }

        this.worker.onmessage = (event) => {
            if (event.data instanceof Object &&
                event.data.hasOwnProperty('method') &&
                event.data.hasOwnProperty('arguments')) {
                    this.handlers[event.data.method].apply(this,
                        event.data.arguments);
            } else {
                this.defaultHandler.call(this, event.data);
            }
        }
    }

    postMessage(message) {
        this.worker.postMessage(message);
    }

    terminate() {
        this.worker.terminate();
    }

    addHandler(name, listener) {
        this.handlers[name] = listener;
    }

    removeHandler(name) {
        delete this.handlers[name];
    }

    sendQuery(...args) {
        if (args.length < 1 ) {
            throw new TypeError('at least 1 argument');
        }

        this.worker.postMessage({
            method: args[0],
            arguments: Array.prototype.slice.call(args, 1)
        })
    }
}

const myTask = new QueryableWorker('worker.js');
myTask.addHandler('printStuff', (result) => {
    document.querySelector("#result").innerHTML = result;
})
myTask.addHandler('doAlert', (time, unit) => {
    alert(`Worker waited for ${time} ${unit}`);
})
