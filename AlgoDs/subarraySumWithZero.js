// Print all subarrays with 0 sum

// Difficulty Level : Hard
// Last Updated : 05 Jul, 2022
// Given an array, print all subarrays in the array which has sum 0.

// Examples: 

// Input:  arr = [6, 3, -1, -3, 4, -2, 2,
//              4, 6, -12, -7]
// Output:  
// Subarray found from Index 2 to 4
// Subarray found from Index 2 to 6          
// Subarray found from Index 5 to 6
// Subarray found from Index 6 to 9
// Subarray found from Index 0 to 10



const subarraySumZero = (arr) =>{

    let sum = 0;
    let result = [];
    let map = {};

    for(let index = 0; index < arr.length ; index++)
    {
        debugger;
        sum += arr[index];

        if(sum === 0)
        {
            result.push([0, index]);
        }

        if(map.hasOwnProperty(sum))
        {
            let range = map[sum];
            for(let data of range)
            {
                result.push([data + 1, index])
            }
        }
        else
        {
            map[sum] = [];
        }

        map[sum].push(index);
    }

    return result;
}


console.log("Print the subarry", subarraySumZero([6, 3, -1, -3, 4, -2, 2, 4, 6, -12, -7]))