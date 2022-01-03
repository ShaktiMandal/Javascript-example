var largestRectangleArea = function(heights) {
    
    let left, right, height, maxArea = 0;
    
   
    if(heights.length % 2 !== 0)
        {
             //in case of odd length, find median
            left = right = (heights.length/2) - 1;
        }
    else
        {
             //in case of even length, find median
            left = heights.length/2;
            right = (heights.length/2) + 1;
        }
    debugger;
    while (left >= 0 && right <= heights.length - 1)
        {
            if(left === right)
                {
                    height = heights[left];
                    maxArea = heights[left];
                }
            else if(heights[left] > heights[right])
                {
                    if(height > heights[right])
                        {
                            height = heights[right];
                        }
                    let dist = right - left;
                    let area = heights[right] * dist;
                    if(area > maxArea)
                        {
                            maxArea = area;
                        }
                }
            else(heights[left] < heights[right])
                {
                    if(height > heights[left])
                        {
                            height = heights[left];
                        }
                    let dist = right - left;
                    let area = heights[left] * dist;
                     if(area > maxArea)
                        {
                            maxArea = area;
                        }
                }
            
            left--;
            right++;
        }
    
    return maxArea;
};

console.log(largestRectangleArea([2,1,5,6,2,3]));