//Rotate matrix - 90 deg
//Main logic is swaping the item
// top left => top right 
// top left => bottom left
// bottom left => bottom right
//bottom right => top right
var rotateMatrixBy90Deg = (matrix) => {

    
    if(matrix.length === 0) 
    {
        return;
    }

    debugger;
    console.log("Print the matrix", matrix);

    //run through each column till half as it will cover
    //from both side
    for(let layer = 0; layer < matrix.length / 2; layer++)
    {
        let start = layer;
        let end = matrix.length - 1 - layer;

        // run throguh each row
        for(let index = start; index < end ; index++)
        {
            //take the difference from the start to the position where its 
            //currently excuted
            let offSet = index - start;

            //take to top left item
            let temp = matrix[start][index];
            //swap bottom left item to top left item
            matrix[start][index] = matrix[end-offSet][start];

            //swap bottom left item to bottom right item
            matrix[end-offSet][start] = matrix[end][end-offSet];
            //swap bottom right item to top right item
            matrix[end][end-offSet] = matrix[index][end];

            //swap top right item to top left item
            matrix[index][end] = temp;
        }
    }

    console.log("Print the matrix", matrix);

}


//rotateMatrixBy90Deg([[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15], [16,17,18,19,20], [21,22,23,24,25]])

// Zero Matrix 

//Approach 1 - go through each item, if found 0, make that whole column and row 0
//however, in this approach, various scenarios will not work as it will replace the 
//value in the matrix in advanced. 

//APproach 2 - Now as we found that first approach will not help as we will loose the data
// why can we store data, later we can go through the data and replace in the marix.
// so we have to take two arrays - col, row , strore the index/flag(true/false) of the col and row in those array
// As you can see that we are taking two array which means space complexity will be o(length of row * length of col)
//Need to find if this can be improved

//Approach 3 - the main problem for us now to store the data as its taking extra space 
//so why cant we store it in the fisrt col and row. thus, no extra space is required
//However, we have to have two flags to indicate whether first row / col has any zero value,
//if so then set the flag as true else false. In this way we can save the state of the first row /col


var zeroMatrix = (matrix) => {

    console.log("Before set zero", matrix)
    //take two flags
    let isFirstRowHasZero = false;
    let isFirstColHasZero = false;

    //Go through first row and set the flag 
    for(let index = 0; index < matrix[0].length; index++)
    {
        if(matrix[0][index] === 0)
        {
            isFirstColHasZero = true;
            break;
        }
    }

    //go through first column
    for(let index = 0; index < matrix.length; index++)
    {
        if(matrix[index][0] === 0)
        {
            isFirstColHasZero = true;
            break;
        }
    }

    //set zero in the first row / col if any element is zero
    for(let col = 1; col < matrix.length; col++)
    {
        for(let row = 1; row < matrix[0].length; row++)
        {
            if(matrix[row][col] === 0)
            {
                matrix[0][col] = 0;
                matrix[row][0] = 0;
            }
        }
    }

    //Now making whole row set to zero
    for(let index = 1; index < matrix.length ; index++)
    {
        if(matrix[index][0] === 0)
        {
            for(let row = 0; row < matrix[0].length ; row++)
            {
                matrix[index][row] = 0;
            }
        }
    }

    //setting whole col set to zero
    for(let index = 1; index < matrix[0].length ; index++)
    {
        if(matrix[0][index] === 0)
        {
            for(let col = 0; col < matrix.length ; col++)
            {
                matrix[col][index] = 0;
            }
        }
    }

    if(isFirstColHasZero)
    {
        for(row = 0; row < matrix.length; row++)
        {
            matrix[row][0] = 0;
        }
    }

    if(isFirstRowHasZero)
    {
        for(col = 0; col < matrix[0].length; col++)
        {
            matrix[0][col] = 0;
        }
    }

    console.log("After set zero", matrix);
}



zeroMatrix([[1,2,3,4,5], [6,7,8,0,10], [11,12,13,14,15], [16,17,18,19,20], [21,22,23,24,0]])