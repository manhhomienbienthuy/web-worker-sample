const first = document.querySelector('#number1');
const second = document.querySelector('#number2');
const result = document.querySelector('#result');

if (!!window.Worker) {
    const blob = new Blob([
        `onmessage = (e) => {
            console.log('Worker: Message received from main script');
            const workerResult = 'Result: ' + (e.data[0] * e.data[1]);
            console.log('Worker: Posting message back to main script');
            postMessage(workerResult);
        }`
    ]);
    const blobURL = window.URL.createObjectURL(blob);
    const myWorker = new Worker(blobURL);

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
