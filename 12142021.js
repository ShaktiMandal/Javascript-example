//currying function
function sum(num)
{
    const fn =  function(num1)
    {
        return num1 ? sum(num + num1) : num;
    }

    // fn.valueOf = () => num;
    fn[Symbol.toPrimitive] = () => num;
    return fn;
}

const sum1 = sum(1)
console.log(sum1(2) == 3) // true
console.log(sum1(3) == 4) // true
console.log(sum(1)(2)(3) == 6) // true
console.log(sum(5)(-1)(2) == 6)// true

// flatten the array

var flat = function(arr, depth = 1)
{
    return depth > 0 ? arr.reduce((accumulated, current) => {
         return accumulated.concat(Array.isArray(current)? flat(current): current)
    }, []) : arr.slice();
}

console.log("flatten array", flat([1, [2], [3, [4], [5]]]));


function flatDeep(arr, d = 1) {

    return arr.reduce((acc, val) => {
        return acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val)
    }, [])
    // return d > 0 ? arr.reduce((acc, val) => {
    //     return acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val)
    // }, []) : arr.slice();
 };

 console.log(flatDeep(['item1', 'item2', 'item3', ['item11', 'item12', ["item31", "item32"]]], Infinity))
// let flatArray = [].concat.apply([], [1, [2], [3, [4]]]);

//let flatArray = [].concat(...[1, [2], [3, [4]]]);
//console.log("flattten Array", flatArray);