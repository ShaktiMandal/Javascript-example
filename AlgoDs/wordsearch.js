/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function(board, word) {
    
    let rowLen  = board.length;
    let colLen  = board[0].length;
    
    let visited = new Array(rowLen).fill(false).map( () => new Array(colLen).fill(false));
    
    for(let i  = 0; i < rowLen; i++)
        {
            for(let j= 0; j < colLen; j++)
                {
                    if(board[i][j] === word[0] && dfs(board, word, visited, 0, i, j)) return true;
                }
        }
    return false;
   
};

const dfs = (board, word, visited, wordIndex, row, col) => {
    if(wordIndex === word.length - 1)  return true;
    visited[row][col] = true;
    if( row - 1 > 0 
       && row - 1 < board.length 
       && !visited[row -1][col] 
       && board[row -1][col] === word[wordIndex + 1]
       && dfs(board, word, visited, wordIndex + 1, row - 1, col )) return true;
       
     if( row + 1 < board.length 
       && !visited[row + 1][col] 
       && board[row + 1][col] === word[wordIndex + 1]
       && dfs(board, word, visited, wordIndex + 1, row + 1, col )) return true;
       
    if( col - 1 > 0 
       && col - 1 < board[0].length 
       && !visited[row][col - 1] 
       && board[row][col - 1] === word[wordIndex + 1]
       && dfs(board, word, visited, wordIndex + 1, row, col - 1 )) return true;
       
     if( col + 1 < board[0].length 
       && !visited[row][col + 1] 
       && board[row][col + 1] === word[wordIndex + 1]
       && dfs(board, word, visited, wordIndex + 1, row, col + 1 )) return true;
     
      visited[row][col] = false;
    return false
    
}

console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"));
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "AEE"));
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"));
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"));