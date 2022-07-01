// Given an unsorted array and a number n, find if there exists a pair of elements in the array whose difference is n. 
// Examples: 

// Input: arr[] = {5, 20, 3, 2, 50, 80}, n = 78
// Output: Pair Found: (2, 80)

// Input: arr[] = {90, 70, 20, 80, 50}, n = 45
// Output: No Such Pair

const findPair = (arr, diff) => {

    const map = new Map();
    for(let index = 0; index < arr.length; index++)
    { 
        if(map.has(arr[index]))
        {
             return true;
        }
        else
        {
            const toBePaired = arr[index] + diff;
            map.set(toBePaired, index);
        }
    }
     return false;
 }

console.log(findPair([5, 20, 3, 2, 50, 80], 78));
console.log(findPair([90, 70, 20, 80, 50], 45));
console.log(findPair([3,1,4,1,5], 2));