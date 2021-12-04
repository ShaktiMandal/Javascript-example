self.addEventListener('fromMain', (event) => {
  postMessage('From worker');
});

onmessage = (event) => {
    postMessage('From worker');
  };
  