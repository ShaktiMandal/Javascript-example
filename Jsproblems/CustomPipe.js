
/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
 function sequence(funcs) {
    const promiseFuncs = funcs.map(promisify)
    debugger;
    return function (callback, input) {
      // init promise
      debugger;
      let promise = Promise.resolve(input)
      
      // add all promiseFuncs to promise
      promiseFuncs.forEach((promiseFunc) => {
        promise = promise.then(promiseFunc)
      })
      
      // handle resolved or rejected promise
      promise.then((data) => {
        callback(undefined, data)
      }).catch(callback)
    }   
  }
  
  function promisify(callback) {
    return function (input) {
      return new Promise((resolve, reject) => {
        callback((err, data) => {
          if (err) {
            reject(err)
            return
          }
  
          resolve(data)
        }, input)
      })
    } 
  }


  console.log("Print the data", sequence( [
      ()=> {return 1}, 
      ()=>{return 2}
    ] ))