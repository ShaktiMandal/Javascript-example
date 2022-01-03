//Observer patterns - if subcribes, function gets call
// const Observable = function () {
//   let observers = [];
//   const subscribe = (fn) => {
//     observers.push(fn);
//   };

//   const unsubscribe = (fn) => {
//     observers = this.observers.filter((item) => item != fn);
//   };

//   const invoke = () => {
//     observers.forEach((fn) => fn());
//   };

//   return {
//     subscribe,
//     unsubscribe,
//     invoke,
//   };
// };

// const observable = new Observable();
// observable.subscribe(() => console.log("Function called"));
// observable.subscribe(() => console.log("Function called1"));
// observable.subscribe(() => console.log("Function called2"));
// observable.invoke();

//Proxy pattern - this is required in case of calling third party API / validating data from outside

// var getStockValueApi = function(){
 
//   const getValue = (stockName) =>{

//     if (stockName.length !== 0) {
//         return "";
//     }
    
//     switch (stockName) {
//         case "TCS":
//             {
//                 return 1235.52;
//             }
//           case "CTS":
//             {
//                 return 1305.52;
//             }
//           case "WIPRO":
//             {
//                 return 12035.52;
//             }
//           case "ACCENTURE":
//             {
//                 return 125.52;
//             }
//           case "GOOGLE":
//             {
//                 return 135.52;
//             }
//           case "TESLA":
//             {
//                 return 123.52;
//             }
//       }
//   }

//   return {
//       getValue
//   }
// };

// var getStockProxy = function(stockName){
//     let cache = {};
//     if(!cache[stockName])
//     {
//         let api = new getStockValueApi();
//         cache[stockName] = api.getValue(stockName);
//     }
//     else
//     {
//         return cache[stockName];
//     }
// }


// console.log(getStockProxy("CTS"));
// console.log(getStockProxy("TCS"));
// console.log(getStockProxy("WIPRO"));
// console.log(getStockProxy("ajsdhgjasdg"));

//signleton patter // instantiate the object only one time

// const singletonPattern = (function(){

//     var instance = {};
//     const Init = () => {
//         let initializeVlaue = 8;
//         const first = function() {
//             console.log("Print first")
//         }

//         const second = function() {
//             console.log("Print second")
//         }

//         return {
//             first,
//             second
//         }
//     }

//     return {
//         getInstance: function(){
//             if(!instance)
//             {
//                 instance = Init();
//             }
//             else{
//                 instance;
//             }
//         }
//     }
// })()

// var obj = singletonPattern.getInstance();

// obj.first();

//create an event emitter 

const Emitter = function(){

    var eventList = {};
    const subscribe = function(eventName, eventAction){
        
        if(!eventList[eventName])
        {
            eventList[eventName] = eventAction;
        }       

        return {
            release : function() {
        
                // eventList = eventList.map(event => {
        
                //     console.log("print event", event);
                //     return  !event[0].eventName.includes(eventId);
                // })
        
                if(eventList[eventName])
                {
                    delete eventList[eventName];
                }
            }
        }
       
    }

    

    const emit = (eventName, ...params) => {
        params.forEach(item => {
            
            // eventList.forEach( event => {
            //     if(event[0] === eventName)
            //     {
            //         event[1].call(null, item);
            //     }
            // })

            let action = eventList[eventName];
            if(action)
            {
                action.call(null, item);
            }
        })
    }

    const eventCount = function(){
        return Object.values(eventList).length;
    }

    return {
        subscribe,
        subscribedEventCount: eventCount,
        emit
    }
};

var eventEmitter = new Emitter();

const sub1= eventEmitter.subscribe("click", (item) => {
    console.log("Printing the click event", item)
});

const sub2 = eventEmitter.subscribe("move", (item) => {
    console.log("Printing the move event", item)
});

eventEmitter.emit("click", 1 ,2, 3);

console.log(eventEmitter.subscribedEventCount());
sub1.release();

console.log(eventEmitter.subscribedEventCount());
eventEmitter.emit("click", 1 ,2, 3);

//Create a counter object -> every time acceess the property, count should increase

var incrementalCounter = {

    count: 0,
    
}

console.log("counter", incrementalCounter.count)
console.log("counter", incrementalCounter.count)
console.log("counter", incrementalCounter.count)






