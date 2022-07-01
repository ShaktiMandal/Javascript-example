// Count triplets with sum smaller than a given value

// Difficulty Level : Medium
// Last Updated : 24 Jun, 2022
// Given an array of distinct integers and a sum value. Find count of triplets with sum smaller than given sum value. The expected Time Complexity is O(n2).
// Examples: 
 

// Input : arr[] = {-2, 0, 1, 3}
//         sum = 2.
// Output : 2
// Explanation :  Below are triplets with sum less than 2
//                (-2, 0, 1) and (-2, 0, 3) 

// Input : arr[] = {5, 1, 3, 4, 7}
//         sum = 12.
// Output : 4
// Explanation :  Below are triplets with sum less than 12
//                (1, 3, 4), (1, 3, 5), (1, 3, 7) and 
//                (1, 4, 5)


const countTripletSum = (arr, sum) => {

    if(arr.length < 3) return 0;

    let count = 0;
    for(let i = 0; i < arr.length; i++)
    {
        const firstVal = arr[i];
        const secondVal = arr[i + 1];

        for(let j = i + 2; j < arr.length; j++)
        {
            if(firstVal + secondVal + arr[j] < sum) 
            {
                count = count + 1;
            }
        }
    }

    return count;

}

console.log("Print the count", countTripletSum([-2, 0, 1, 3], 2));
console.log("Print the coun1", countTripletSum([5, 1, 3, 4, 7], 12));
console.log("Print the coun1", countTripletSum([5, 1], 12));
console.log("Print the coun1", countTripletSum([5, 1, 3, 4, 7], -1));