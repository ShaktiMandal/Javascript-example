//Merge sort - Another sorting algorith with o(nlogn) / o(nlogn)
//How works -> Can be done in two ways - Inplace wheer existing array will be changed
// another way is to take addtional array to store and then return new array
//Find the mid of the array
//Call left side of the arrau until starting index > ending index (start = 0, end = mid)
//Call right side of the arrau until starting index > ending index (start= mid, end = array,length)
//merge the array every time left, right side cimpletes
//copy the elment in the right place in the existing array
// Drawbacks - extra space requires to store the newly constructed array
// loop will continue until comple array is over
//please note, this is being done using recusive method - inplace 


var performMergeSort = (arr) => {
    mergeSort(arr, 0, arr.length);
    console.log("Merge sort", arr);
}

var mergeSort = (arr, start, end) => {

    //edge case , basically checking whether start value is greater than end value
    if(end - start === 1)
    {
        return;
    }

    //find the mid
    let mid = Math.floor((start + end)/2);

    //call left side of the array
    mergeSort(arr, start, mid);
    //call right side side of the array
    mergeSort(arr, mid, end);

    //merge the left and right of the array
    merge(arr, start, mid, end);

}

var merge = (arr, start, mid, end) => {

    let newArray = [];

    // initializing the starting point of both left and right of the array
    let i = start;
    let j = mid;

    //comparing the value from left part to right part
    // if left part is smaller then move the left index (start / i)
    // if not then move the right positioned index
    // in addition add the samller value to the new array
    while(i < mid && j < end)
    {
        if(arr[i] < arr[j])
        {
            newArray.push(arr[i]);
            i++;
        }
        else{
            newArray.push(arr[j]);
            j++
        }
    }

    // if left part of the array still not completed
    while(i < mid)
    {
        newArray.push(arr[i]);
        i++;
    }

        // if right part of the array still not completed
    while(j < end)
    {
        newArray.push(arr[j]);
        j++
    }

    //copy the value from the new array to the existing array
    for(let index = 0; index < newArray.length; index++)
    {
        arr[start + index] = newArray[index];
    }
}

performMergeSort([7,4,5,3,2]);