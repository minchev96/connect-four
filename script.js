function Gameboard(){
    const rows = 6;
    const columns = 7;

    let board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++)
            board[i].push(0);
    }

    const getBoard = () => board;

    const dropToken = function(column, player) {
        const availablePositions = board.filter(row => row[column] === 0).map(row => row[column]);
        if(!availablePositions.length) return;

        const lowestRow = availablePositions.length - 1;
        board[lowestRow][column] = player;
    }

    return { getBoard, dropToken}
}

const board = Gameboard();
board.dropToken(0, 1);
board.dropToken(1, 1);

console.log(board.getBoard());