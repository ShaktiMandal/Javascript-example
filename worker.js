

// Write Javascript code!

(window.onload = () => {
  const appDiv = document.getElementById('app');
  const workerButton = document.getElementById('webWorker');
  const workerResult = document.getElementById('displayResult');
  const clickBtn = document.getElementById('clickMe');
  const clickResult = document.getElementById('clickMeResult');

  const onClick = (event) => {
    const webWorkerObj = new Worker('./workerFile.js');
    if (event.target.id === 'webWorker') {
      webWorkerObj.postMessage('fromMain');
      webWorkerObj.onMessage = (event) => {
        alert('I have received from worker');
      };
    } else {
      clickResult.textContent = 'non worker';
    }
  };

  workerButton.addEventListener('click', onClick);
  clickBtn.addEventListener('click', onClick);
})();
