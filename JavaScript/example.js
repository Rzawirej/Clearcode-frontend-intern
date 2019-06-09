function riddleSolver(board){
    const boardClone = JSON.parse(JSON.stringify(board));
    let adjacents = findAdjacents(boardClone)
    while(adjacents.length > 0){
        changeAdjacentsToZero(boardClone, adjacents)
        fillHoles(boardClone)
        adjacents = findAdjacents(boardClone)
    }
    return boardClone;
}

function findAdjacents(board){
    const adjacents = []
    for (let i = 0; i < board[0].length; i++) {
        let matchLength = 1;
        for (let j = 0; j < board.length; j++) {
            let checkCluster = false;
            if (j == board.length - 1) {
                checkCluster = true;
            } else {
                if (board[i][j] == board[i][j + 1] && board[i][j] != 0) {
                    matchLength += 1;
                } else {
                    checkCluster = true;
                }
            }
            if (checkCluster) {
                if (matchLength >= 3) {
                    adjacents.push({
                        column: i, row: j + 1 - matchLength,
                        length: matchLength, vertical: false
                    });
                }
                matchLength = 1;
            }
        }
    }
    for(let j = 0; j < board.length; j++){
        let matchLength = 1;
        for(let i = 0; i < board[0].length; i++){
            let checkCluster = false;
            if(i == board[0].length - 1){
                checkCluster = true;
            }else{
                if(board[i][j] == board[i + 1][j] && board[i][j] != 0){
                    matchLength += 1;
                }else{
                    checkCluster = true;
                }
            }
            if(checkCluster){
                if(matchLength >= 3){
                    adjacents.push({
                        column: i + 1 - matchLength, row: j,
                        length: matchLength, vertical: true
                    });
                }
                matchLength = 1;
            }
        }
    } 
    return adjacents;
}

function changeAdjacentsToZero(board, adjacents){
    adjacents.forEach(el => {
        if(!el.vertical){
            for(j = el.row; j < el.row + el.length; j++){
                board[el.column][j] = 0;
            }
        }else{
            for(i = el.column; i < el.column + el.length; i++){
                board[i][el.row] = 0;
            }
        }
    });
}

function fillHoles(board){
    for(j = 0; j < board.length; j++){
        for (i = board[0].length-1; i >= 0; i--){
            if(board[i][j] != 0){
                let i_temp = i
                while (i_temp + 1 < board[0].length && board[i_temp + 1][j] == 0){
                    [board[i_temp][j], board[i_temp + 1][j]] = [board[i_temp + 1][j], board[i_temp][j]]
                    i_temp++
                }
            }
        }
    }
}
module.exports.riddleSolver = riddleSolver
