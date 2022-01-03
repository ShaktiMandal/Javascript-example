// question - 1

// console.log(1)
// const promise = new Promise((resolve) => {
//   console.log(2)
//   resolve()
//   console.log(3)
// })

// console.log(4)

// promise.then(() => {
//   console.log(5)
// }).then(() => {
//   console.log(6)
// })

// console.log(7)

// setTimeout(() => {
//   console.log(8)
// }, 10)

// setTimeout(() => {
//   console.log(9)
// }, 0)

//output - 1 2 3 4 7 5 6 9 10

//question - 2

// const obj = {
//     dev: 'bfe',
//     a: function() {
//       return this.dev
//     },
//     b() {
//       return this.dev
//     },
//     c: () => {
//       return this.dev
//     },
//     d: function() {
//       return (() => {
//         return this.dev
//       })()
//     },
//     e: function() {
//       return this.b()
//     },
//     f: function() {
//       return this.b
//     },
//     g: function() {
//       return this.c()
//     },
//     h: function() {
//       return this.c
//     },
//     i: function() {
//       return () => {
//         return this.dev
//       }
//     }
//   }
  
//   console.log(obj.a()) // 'def'
//   console.log(obj.b()) // def
//   console.log(obj.c()) // undefined
//   console.log(obj.d()) // def
//   console.log(obj.e()) // def 
//   console.log(obj.f()()) // undefined
//   console.log(obj.g())  // undefined
//   console.log(obj.h()()) // undefined
//   console.log(obj.i()()) // undefined

  //Question - 3

//   Promise.resolve(1)
// .then((val) => {
//   console.log(val)
//   return val + 1
// }).then((val) => {
//   console.log(val)
// }).then((val) => {
//   console.log(val)
//   return Promise.resolve(3)
//     .then((val) => {
//       console.log(val)
//     })
// }).then((val) => {
//   console.log(val)
//   return Promise.reject(4)
// }).catch((val) => {
//   console.log(val)
// }).finally((val) => {
//   console.log(val)
//   return 10
// }).then((val) => {
//   console.log(val)
// })

//output - 1 2 undeined 3 undefined 4 undefined undefined undefined

//Question - 4

// Promise.resolve(1)
// .then(() => 2)
// .then(3)
// .then((value) => value * 3)
// .then(Promise.resolve(4))
// .then(console.log)

// Promise.resolve(1)
// .then(() => "Shakti")
// .then("mandal")
// .then((value) => value + " " + 3)
// .then(Promise.resolve("developer"))
// .then(val => console.log(val))


// for (var i = 0; i < 5; i++) {
//     setTimeout(() => console.log(i), 0)
//   }
  
//   for (let i = 0; i < 5; i++) {
//     setTimeout(() => console.log(i), 0)
//   }

//   var temp = new Promise((resolve, reject) => {

//     resolve(1)
//     resolve(2)
//     reject('error')
//   }).then((value) => {
//     console.log(value)
//   }, (error) => {
//     console.log('error')
//   });

//   console.log("Temp" , temp.then(data => console.log("sdasd" + data)));


const obj = {
    a: 1,
    b: function() {
      console.log(this.a)
    },
    c() {
      console.log(this.a)
    },
    d: () => {
      console.log(this.a)
    },
    e: (function() {
      return () => {
        console.log(this.a);
      }
    })(),
    f: function() {
      return () => {
        console.log(this.a);
      }
    }
  }
  
  console.log(obj.a) // 1
  obj.b(); // 1
  (obj.b)() // 1
  const b = obj.b
  b() // undefined
  obj.b.apply({a: 2}) // 2
  obj.c() // 1
  obj.d() // undefined
  ;(obj.d)()
  obj.d.apply({a:2})
  obj.e()
  ;(obj.e)()
  obj.e.call({a:2})
  obj.f()()
  ;(obj.f())()
  obj.f().call({a:2})


foo()
function foo(){ console.log(1) }
var foo = 2
function foo(){ console.log(3) }



// console.log(0 == '0')
// console.log(0 === '0')
// console.log(Object.is(0, '0'))

// console.log(0 == 0)
// console.log(0 === 0)
// console.log(Object.is(0, 0))

// console.log(0 == -0)
// console.log(0 === -0)
// console.log(Object.is(0, -0))

// console.log(NaN == NaN)
// console.log(NaN === NaN)
// console.log(Object.is(NaN, NaN))

// console.log(0 == false)
// console.log(0 === false)
// console.log(Object.is(0, false))

// (async () => {
//     await Promise.all([]).then((value) => {
//       console.log(value)
//     }, (error) => {
//       console.log(error)
//     })
    
//     await Promise.all([1,2,Promise.resolve(3), Promise.resolve(4)]).then((value) => {
//       console.log(value)
//     }, (error) => {
//       console.log(error)
//     })
    
//     await Promise.all([1,2,Promise.resolve(3), Promise.reject('error')]).then((value) => {
//       console.log(value)
//     }, (error) => {
//       console.log(error)
//     })
//   })()

// var a = 1;
(function() {
  console.log("Print this", this)
  console.log(this.a);
  var a = '2'
  console.log(a + this.a);
})();