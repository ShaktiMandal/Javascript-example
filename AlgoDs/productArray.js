// Given an array arr[] of n integers, construct a Product
// Array prod[] (of same size) such that prod[i] is equal to 
//the product of all the elements of arr[] except arr[i]. 
//Solve it without division operator in O(n) time.

// Example : 

// Input: arr[]  = {10, 3, 5, 6, 2}
// Output: prod[]  = {180, 600, 360, 300, 900}
// 3 * 5 * 6 * 2 product of other array 
// elements except 10 is 180
// 10 * 5 * 6 * 2 product of other array 
// elements except 3 is 600
// 10 * 3 * 6 * 2 product of other array 
// elements except 5 is 360
// 10 * 3 * 5 * 2 product of other array 
// elements except 6 is 300
// 10 * 3 * 6 * 5 product of other array 
// elements except 2 is 900

const findProductArray = (arr) => {

    let productValue = 1;
    let output = new Array(arr.length);

    for(let i =0; i < arr.length; i++)
    {
        if(i === 0) output[i] = arr[i];
        else  output[i] = output[i - 1] * arr[i];
    }

    for(let j = output.length - 1; j >= 0; j--)
    {
        // left[j -1] * right[j+1]
         if(j === 0) output[j] = productValue;
         else output[j] = output[j-1] * productValue;
        //calculate product value - productValue * arr[i]
        productValue = productValue * arr[j];
    }
    return output;
}

console.log(findProductArray([10, 3, 5, 6, 2]));