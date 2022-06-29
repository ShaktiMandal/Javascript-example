/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
//  var exist = function(board) {
    
//     let ilandCount = 0;
//     let rowLen  = board.length;
//     let colLen  = board[0].length;
    
//     let visited = new Array(rowLen).fill(false).map( () => new Array(colLen).fill(false));
//     for(let i  = 0; i < rowLen; i++)
//         {
//             for(let j= 0; j < colLen; j++)
//                 {
//                     if(board[i][j] === "1") {
//                         dfs(board, visited, i, j, count = 0)
//                         ilandCount = ilandCount + 1;
//                     }
//                 }
//         }
//     return ilandCount;
   
// };

// const dfs = (board, visited, row, col, count) => {
//     if( visited[row][col] === false)
//         visited[row][col] = true;
//     if(board[row][col] === "1")
//         board[row][col] = "5";

//     if( row - 1 >= 0 
//        && row - 1 < board.length 
//        && !visited[row -1][col] 
//        && board[row -1][col] === "1"
//        && dfs(board, visited, row - 1, col, count + 1 )) {
//         return true
//     };
       
//      if( row + 1 < board.length 
//        && !visited[row + 1][col] 
//        && board[row + 1][col] === "1"
//        && dfs(board, visited, row + 1, col, count + 1 )) {
//         return true
//     };
       
//     if( col - 1 >= 0 
//        && col - 1 < board[0].length 
//        && !visited[row][col - 1] 
//        && board[row][col - 1] === "1"
//        && dfs(board, visited, row, col - 1, count + 1)) {
//         return true
//     };
       
//      if( col + 1 < board[0].length 
//        && !visited[row][col + 1] 
//        && board[row][col + 1] === "1"
//        && dfs(board, visited, row, col + 1,count + 1)) {
//         return true
//     };
//     return false
// }


var exist = function(board) {
    
    let ilandCount = 0;
    let rowLen  = board.length;
    let colLen  = board[0].length;
    
    //let visited = new Array(rowLen).fill(false).map( () => new Array(colLen).fill(false));
    for(let i  = 0; i < rowLen; i++)
        {
            for(let j= 0; j < colLen; j++)
                {
                    if(board[i][j] === "1") {
                        dfs(board, i, j, count = 0)
                        ilandCount = ilandCount + 1;
                    }
                }
        }
    return ilandCount;
   
};

const dfs = (board, row, col, count) => {
    if(board[row][col] === "1")
        board[row][col] = "5";

    if( row - 1 >= 0 
       && row - 1 < board.length 
       && board[row -1][col] === "1"
       && dfs(board, row - 1, col, count + 1 )) {
        return true
    };
       
     if( row + 1 < board.length 
       && board[row + 1][col] === "1"
       && dfs(board, row + 1, col, count + 1 )) {
        return true
    };
       
    if( col - 1 >= 0 
       && col - 1 < board[0].length 
       && board[row][col - 1] === "1"
       && dfs(board, row, col - 1, count + 1)) {
        return true
    };
       
     if( col + 1 < board[0].length 
       && board[row][col + 1] === "1"
       && dfs(board, row, col + 1,count + 1)) {
        return true
    };
    return false
}

console.log(exist(
    [["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]]
))

console.log(exist(
    [["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]]
))


console.log(exist(
    [["1","1"],
    ["1","1"],
    ["0","0"],
    ["0","0"]]
))

console.log(exist(
    [
    ["0","0"],
    ["0","0"]]
))