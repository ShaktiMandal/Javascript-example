//Quick sort - Another sorting algorith with o(nlogn) / o(n2)
//How works -> find the pivot element(any element from start/end/middle)
//place the pivot element in the right place of the array
//now sort left half of the pivot 
//sort the right half of the pivot
//Quick sort - can be better than merge sort (merge sort take extra space, also merge sort excute the complete left/right array even after sorted)


var performQuickSort = (arr) => {
    quickSort(arr,0, arr.length - 1);
    console.log("Print sorted array", arr);
}

//going to perform quick sort now
var quickSort = (arr, low, high) => {
    //check if low croossed high
    if(low >= high)
    {
        return; //Array has sorted so bereak the loop
    }

    let start = low;
    let end   = high;

    //find the pivot, taking the middle element, can be taken start / end as well
    let pivotIndex = Math.floor(start + ((end - start)/2));

    while(start <= end )
    {
        // if left side of the pivot element are in the right place, if so then traverse
        while(arr[start] < arr[pivotIndex])
        {
            start++;
        }

        while(arr[end] > arr[pivotIndex])
        {
            end--;
        }

        //make sure that starting position not crossed the ending position
        if(start <= end)
        {
            //swaping the value as values are not in the correct position

            let temp  = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            // as we have swapped the value no need to validate the same element again hence moving forward
            start++;  
            end--;
        }
    }

    //pivotIndex is in the right place now, let sort left and right side array
    quickSort(arr, low, end);
    quickSort(arr, start, high);
}

performQuickSort([7,4,5,3,2]);