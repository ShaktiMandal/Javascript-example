// this is to understand the execution of micro and macro task exceution 
// in the event queue. 


//Macro task - setTimeout, setInterval, setImmediate , I/O operation, UI rendering

//Micro tasks - MutationObserver, promise.then(), promise.catch(), process.nextTick();


const promise1 = new Promise((resolve, reject) => {
    console.log(1);
    resolve('success')
  }); // This is one macro task
  promise1.then(() => {
    console.log(3);
  }); // This is one micro task
  console.log(4); // This is macro task

  //Now At first all will move to macro task queue
  //Then execution will start, first will complete macro task queue
  //then it will move o micro task queue.


  const promise2 = new Promise((resolve, reject) => {
    console.log(1); // this looks like same as above, you can see that promise is not returning resolve/ reject
    // thus it will be always in pending state.
  });
  promise2.then(() => {
    console.log(3); // this will execute only after promise2 moved to resolved / rejected state
  });
  console.log(4);


  const promise3 = new Promise((resolve, reject) => {
    console.log(1) //print firsr as macro task
    resolve('resolve1')
  })
  const promise4 = promise3.then(res => {
    console.log(res) // this will print fourth as micro task 
  })
  // this will print second as macro task
  console.log('promise3:', promise3); 
  // this will print third as macro task
  console.log('promise4:', promise4);// Promiose4 will be always in pending state as then block retrun promise again



  const fn = () => (new Promise((resolve, reject) => {
    console.log(1)
    resolve('success')
  })); // this is macro task , just returning promise state in a function

  fn().then(res => {
    console.log(res) // this will move to micro task
  }); 
  console.log(2) // this is macro taks



console.log('start')
setTimeout(() => {
  console.log('setTimeout')
})
Promise.resolve().then(() => {
  console.log('resolve')
})
console.log('end')


const promise = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
      console.log("timerStart");
      resolve("success");
      console.log("timerEnd");
    }, 0);
    console.log(2);
  });
  promise.then((res) => {
    console.log(res);
  });
  console.log(4);



  const timer1 = setTimeout(() => {
    console.log('timer1');
  const timer3 = setTimeout(() => { 
      console.log('timer3')
    }, 0)
  }, 0)
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log('start')


  const timer4 = setTimeout(() => {
    console.log('timer4');
    const promise1 = Promise.resolve().then(() => {
      console.log('promise1')
    })
  }, 0)
  const timer5 = setTimeout(() => {
    console.log('timer5')
  }, 0)
  console.log('start')



  const promise7 = Promise.resolve().then(() => {
    console.log('promise7');
    const timer2 = setTimeout(() => {
      console.log('timer2')
    }, 0)
  });
  const timer7 = setTimeout(() => {
    console.log('timer7')
    const promise2 = Promise.resolve().then(() => {
      console.log('promise2')
    })
  }, 0)

  console.log('start');





  const promise9 = new Promise((resolve, reject) => {
    const timer1 = setTimeout(() => {
      resolve('success')
    }, 1000)
  })
  const promise10 = promise9.then(() => {
    throw new Error('error!!!')
  })
  
  console.log('promise9', promise9)
  console.log('promise10', promise10)
  
  const timer8 = setTimeout(() => {
    console.log('promise9', promise9);
    console.log('promise10', promise10);
  }, 2000)