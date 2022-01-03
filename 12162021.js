//Missing number (cyclic sort) - distinct number from  0 to n

var findMissignNumber = (arr) => {
    let i = 0;

    while(i < arr.length)
    {
        let correctIndex = arr[i] - 1;
        if(arr[i] !== arr[correctIndex])
            {
                swap(arr, correctIndex, i);
            }
           else
           {
               i++;
           } 
    }

    let missignNumber = getMissingNumber(arr);
    console.log("Print the repeated/missing number", missignNumber);
}

var getMissingNumber = (arr) => {
    let i = 0;
    let missingNumbers = [];

    while(i < arr.length)
    {
        if(arr[i] !== i +1)
        {
            missingNumbers.push(arr[i])
        }
         
        i++;
    }

    return missingNumbers;
}

var swap = (arr, correctIndex, i) => {

    let temp = arr[i];
    arr[i] = arr[correctIndex];
    arr[correctIndex] = temp;
}

// findMissignNumber([9,6,4,2,3,5,7,0,1]);
// findMissignNumber([4,0,2,1]);
// findMissignNumber([3,0,5,1,4]);
// findMissignNumber([4,3,2,7,8,2,3,1]);
// findMissignNumber([1,1]);
// findMissignNumber([1,3,4,2,2]);
// findMissignNumber([3,1,3,4,2]);

console.log(findMissignNumber([0,1]));
console.log(findMissignNumber([9,6,4,2,3,5,7,0,1]));