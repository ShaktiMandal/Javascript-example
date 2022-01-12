
temp = "this is a outside";
i =0;

for(; i < 10; i++)
{
    setTimeout( function(i, temp) {
        console.log("print i", i);
    }, 1000, i);
}

console.log("Print outside i", i);

var y = 1;
if (function F(){})
{
    y += typeof F;
}
console.log(y);

//Print day an date

(function(){
    let day = new Date().getDay();
    let currentTiem = new Date().getTime();

    console.log("Day", day);
    console.log("time", currentTiem);
})();


// (function(data, len){
//     let output;
//     let intervalHandler;

//     intervalHandler = setInterval((data)=> {
//       let poppedItem = data.slice(data.length -1 , data.length -1);
//       console.log("print output1", poppedItem);
//       data = data.slice(0, data.length -2);
//       console.log("print output2", data);
//       output = poppedItem.concat(data);

//       if(len === output.length)
//       {
//           clearInterval(intervalHandler);
//       }
//   }, 1, data);

//   console.log("print data", output);
// })("w3resource", "w3resource".length);


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var searchRange = function(nums, target) {

    let output = [];
    let start = 0, end = nums.length - 1;
 
    debugger;
    while(start < end)
    {
        let middle = Math.floor((start + end)/ 2);
        if(nums[middle] < target)
            {
                start = middle + 1;
            }
        end = middle;
    }
    
    if(nums[start] != target) return [-1, -1];
    output.push(start)
    
    
    end = nums.length - 1;
    while(start < end)
        {
            let middle = (start + end)/ 2 + 1;
            if(nums[middle] > target)
            {
                end = middle -1;
            }
            start = middle;
        }
    output.push(end);
    return output;

};

console.log(searchRange([1,2,3], 1));





