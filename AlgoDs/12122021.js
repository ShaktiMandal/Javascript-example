var setZeroes = function(matrix) {
    let col0 = 1;
     let rowLength = matrix.length;
     let colLength = matrix[0].length;
     
     debugger;
     for(let i = 0; i < rowLength; i++)
         {
             if(matrix[i][0] === 0)
                 {
                     col0 = 0;
                 }
             for(let j = 1; j < colLength; j++)
                 {
                     if(matrix[i][j] === 0)
                         {
                             matrix[i][0] = 0;
                             matrix[0][j] = 0;
                         }
                 }
         }
     
     for(let i = rowLength -1; i >= 0; i--)
         {
             for(let j= colLength -1 ; j >= 0; j--)
                 {
                     if(matrix[i][0] === 0 || matrix[0][j] === 0)
                         {
                             matrix[i][j] = 0;
                         }
                 }
             if(col0 === 0)
                 {
                     matrix[i][0] = 0;
                 }
         }

         console.log("Matrix", matrix);
    
 };

//  console.log(setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]]));

var pascalTriangle = function(rows){

    let output = [];
    if(rows < 1)
    {
        return output;
    }


    output.push([1]);
    if(rows === 1)
    {
        return output;
    }

    output.push([1,1]);
    if(rows === 2)
    {
        return output;
    }

    for(let row = 2; row < rows; row++)
    {
        let newArray = getNewArray(output[row - 1]);
        output.push(newArray);
    }

    return output;
}

var getNewArray =  function(prevArray){

    let newArray = [];
    for(let i = 0; i <= prevArray.length; i++)
    {
        if(i === 0)
        {
            newArray.push(prevArray[0]);
        }
        else if(i === prevArray.length)
        {
            newArray.push(prevArray[i -1])
        }
        else
        {
            let value = prevArray[i - 1] + prevArray[i];
            newArray.push(value);
        }
    }

    return newArray;
}

console.log("Output the array", pascalTriangle(5));