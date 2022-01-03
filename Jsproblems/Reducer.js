Array.prototype.CustomReducer = function(reducer, initialValue)
{
    if(this.length === 0)
    {
        return;
    }

    let result = initialValue ? initialValue : this[0];

    for(let index = initialValue ? 0 : 1; index < this.length; index++)
    {
        result = reducer(result, this[index], index, this)
    }

    return result;

}


var result =["1", "2", "3"].CustomReducer((acc, initalValue) => {
    return acc + initalValue
}, 4)

console.log("Reducer result", result);


Array.prototype.customMap = function(callbackFn){
    let result = [];

    for(let index = 0; index < this.length; index++)
    {
        let output = callbackFn.call(null, this[index], index, this);
        result.push(output)
    }

    return result;
}

let output = [1,2,3].customMap((item, index)=> {
    return item + 1;
});

console.log("Map output", output);


Array.prototype.customFilter = function(callbackFn, context){

    let result = [];

    for(let index = 0; index < this.length; index++)
    {
        if(callbackFn.call(context, this[index], index, this))
        {
            result.push(this[index]);
        }
    }
    return result;
}

let filterOutput = [2,3,4,5,6,7,8].customFilter((item, index) => {
        return item % 2 === 0;
});

console.log("Customfilter", filterOutput);

Array.prototype.customFlat = function(){

    let innerDepth = isNaN(arguments[0]) ? 1 : arguments[0];
    
    innerDepth ? Array.prototype.reduce.call(this, (acc, cur) => {
        if(Array.isArray(cur))
        {
            acc.push.apply(acc, Array.prototype.customFlat.call(cur, innerDepth - 1))
        }
        {
            acc.push(cur)
        }

        return acc;
    }, []) : Array.prototype.slice.call(this);
}

console.log([1, [1,2], [3,4,[5,6]]].customFlat());

//Memoization function

var memo = function(callbackFn, key = Array.from(arguments).join('_') ){

    debugger;
    let cache = new Map();
    return function(...args)
    {
        debugger;
        if(cache.has(key))
        {
            return cache.get(key);
        }
        else
        {
            let result = callbackFn.call(null, args);
            cache.set(key, result);
            return result;
        }
    }
}

var sum = (item1, item2) => {

    debugger;
    return item1 + item2;
}

console.log(memo(sum(1,2)));
