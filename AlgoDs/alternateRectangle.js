// Create a matrix with alternating rectangles of O and X

// Difficulty Level : Medium
// Last Updated : 23 Jun, 2022
// Write a code which inputs two numbers m and n and creates a matrix of size m x n (m rows and n columns) in which every elements is either X or 0. The Xs and 0s must be filled alternatively, the matrix should have outermost rectangle of Xs, then a rectangle of 0s, then a rectangle of Xs, and so on.

// Examples:  

// Input: m = 3, n = 3
// Output: Following matrix 
// X X X
// X 0 X
// X X X

// Input: m = 4, n = 5
// Output: Following matrix
// X X X X X
// X 0 0 0 X
// X 0 0 0 X
// X X X X X

// Input:  m = 5, n = 5
// Output: Following matrix
// X X X X X
// X 0 0 0 X
// X 0 X 0 X
// X 0 0 0 X
// X X X X X

// Input:  m = 6, n = 7
// Output: Following matrix
// X X X X X X X
// X 0 0 0 0 0 X
// X 0 X X X 0 X
// X 0 X X X 0 X
// X 0 0 0 0 0 X
// X X X X X X X 

const createAlternateRect = (row, col) => {

    if(row ===1 && col === 1)
    {
        console.log( ["X"] );
    }

    if(row === 1)
    {
        console.log( new Array(1).map( ()=> new Array(col).fill("X")));
    }

    if(col === 1)
    {
        console.log( new Array(row).fill("X").map( ()=> new Array(1)));
    }

    const board = new Array(row).fill("W").map( ()=> new Array(col).fill("W"));

    let rowStartIndex = 0, rowEndIndex = row -1;
    let colStartIndex = 0, colLastIndex = col -1;

    while(rowStartIndex <= rowEndIndex && colStartIndex <= colLastIndex)
    {
        let fillChar = "X";
        if(rowStartIndex > 0 && colLastIndex > 0)
        {
            if( board[rowStartIndex - 1][colStartIndex - 1] === "X" )
            {
                fillChar = "O"
            }
            else
            {
                fillChar = "X"
            }
        }

        fillRows(board, rowStartIndex, rowEndIndex,colStartIndex,  colLastIndex, fillChar);
        fillCols(board, colStartIndex, colLastIndex, rowStartIndex, rowEndIndex,  fillChar);

        rowStartIndex += 1;
        rowEndIndex  -= 1;
        colStartIndex  += 1;
        colLastIndex  -= 1;
    }

    // console.log("Print the board", board);

    const printMatrix = board.map((d) => d.join(" ")).join("\n")
    console.log(printMatrix);
}

const fillRows = (board, rowStartIndex, rowEndIndex, colStartIndex,  colLastIndex, fillChar) => {

    for(let i  = colStartIndex; i <= colLastIndex ; i++)
    {
        board[rowStartIndex][i] = fillChar;
        board[rowEndIndex][i]   = fillChar;
    }
}


const  fillCols = (board, colStartIndex, colLastIndex, rowStartIndex, rowEndIndex, fillChar) => {

    for(let i  = rowStartIndex; i <= rowEndIndex ; i++)
    {
        board[i][colStartIndex] = fillChar;
        board[i][colLastIndex]   = fillChar;
    }
}


createAlternateRect(1, 1);