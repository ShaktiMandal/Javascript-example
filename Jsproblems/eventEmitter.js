// There is Event Emitter in Node.js, Facebook once had its own implementation but now it is archived.

// You are asked to create an Event Emitter Class

// const emitter = new Emitter()
// It should support event subscribing

// const sub1  = emitter.subscribe('event1', callback1)
// const sub2 = emitter.subscribe('event2', callback2)

// // same callback could subscribe 
// // on same event multiple times
// const sub3 = emitter.subscribe('event1', callback1)
// emit(eventName, ...args) is used to trigger the callbacks, with args relayed

// emitter.emit('event1', 1, 2);
// // callback1 will be called twice
// Subscription returned by subscribe() has a release() method that could be used to unsubscribe

// sub1.release()
// sub3.release()
// // now even if we emit 'event1' again, 
// // callback1 is not called anymore


class EventEmitter {

    constructor()
    {
        this.subscribers = new Map();
    }

    subscriber(eventName, callbackFn)
    {
        if(this.subscribers[eventName])
        {
            this.subscribers.set(eventName, [...this.subscribers[eventName], callbackFn]);
        }
        else
        {
            this.subscribers.set(eventName,  [{callbackFn}]);
        }

        debugger;
        return {            
            release: () =>
            {
                this.subscribers.delete(eventName);
            }
        }
    }

    emit(eventName, ...args)
    {
        if(this.subscribers.get(eventName))
        {
            this.subscribers.get(eventName).forEach(cb => {
               
                cb.callbackFn.apply(null, args);
            })
        }
        else
        {
            throw new Error("Typeerror - invalid event name/please subscribe the event");
        }
    }
    
}


var emitter = new EventEmitter();

const sub1 = emitter.subscriber("event1", function(){
    console.log("Event1 is printed");
})

const sub2 = emitter.subscriber("event2", function(){
    console.log("Event2 is printed");
})

const sub3 = emitter.subscriber("event1", function(){
    console.log("Event1 again is printed");
})

emitter.emit("event1", 123);
emitter.emit("event2", 1434);


sub1.release();

