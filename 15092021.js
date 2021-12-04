const add = (num1, num2) => {
    return num1 + num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

const compose = (fn1, fn2) => (num1, num2) => {
    return fn1(num2, fn2(num1, num2));
}

console.log(compose(add, multiply)(4,5)); // passing multiple function and have the output to the previous func