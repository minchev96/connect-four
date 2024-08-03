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

    return { getBoard }
}

const board = Gameboard();
console.log(board.getBoard());