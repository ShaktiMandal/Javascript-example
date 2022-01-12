function curry(func)
{
    return function curried(...args) {
        if(args.length >= func.length)
        {
            return func.apply(this, args);
        }
        else
        {
            return function(...args2)
            {
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}

function sum(x, y , z)
{
    return x + y + z;
}

var curriedFunc = curry(sum);

console.log(curriedFunc(1,2,3));
console.log(curriedFunc(1)(2,3));
console.log(curriedFunc(1)(2)(3));



