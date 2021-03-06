const first = document.querySelector('#number1');
const second = document.querySelector('#number2');
const result = document.querySelector('#result');

if (!!window.Worker) {
    const myWorker = new Worker("worker.js");

    first.onchange = () => {
        myWorker.postMessage([first.value,second.value]);
        console.log('Main (first.onchange): Message posted to worker');
    }

    second.onchange = () => {
        myWorker.postMessage([first.value,second.value]);
        console.log('Main (second.onchange): Message posted to worker');
    }

    myWorker.onmessage = (e) => {
        result.textContent = e.data;
        console.log('Main (myWorker.onmessage): Message received from worker');
    }
}
