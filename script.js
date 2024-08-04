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

function Players(){
    const players = [
        {
            name: "playerOne",
            token: 1,
            tokenCounter: 0
        },
        {
            name: "playerTwo",
            token: 2,
            tokenCounter: 0
        }
    ]
    const getPlayers = () => players;
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.info(`${activePlayer.name} turn`)
    }

    return { getActivePlayer, switchPlayer, getPlayers};
}

function checkWinner(){
    const players = Players().getPlayers();
    const [ first, second ] = players;
    const gameBoard = board.getBoard();
    let hasWinner = false;
    //vertical win check
    for(let i = 0; i < gameBoard.length + 1; i++){
        if(hasWinner) break;
        for(let j = 0; j < gameBoard.length; j++){
            if(gameBoard[j][i] === first.token){
                first.tokenCounter++;
                second.tokenCounter = 0;
            }
            else if(gameBoard[j][i] === second.token){
                second.tokenCounter++;
                first.tokenCounter = 0;
            }
            else first.tokenCounter = second.tokenCounter = 0;
            
            announceWinner(first, second);
        }
    }
    //horizontal win check
    for(let k = 0; k < gameBoard.length; k++){
        if(hasWinner) break;
        for(let l = 0; l < gameBoard[k].length; l++){
            if(gameBoard[k][l] === first.token){
                first.tokenCounter++;
                second.tokenCounter = 0;
            }
            else if(gameBoard[k][l] === second.token){
                second.tokenCounter++;
                first.tokenCounter = 0;
            }
            else first.tokenCounter = second.tokenCounter = 0;
            
            announceWinner(first, second);
        }
    }
    //[TODO] diagonal win check
}

function announceWinner(firstPlayer, secondPlayer){
    const winnerMatches = 3;
    if(firstPlayer.tokenCounter === winnerMatches) {
        console.log(`${firstPlayer.name} is a Winner!`);
    }
    if(secondPlayer.tokenCounter === winnerMatches){
        console.log(`${secondPlayer.name} is a Winner!`);
    }
}

const board = Gameboard();
const player = Players();
board.dropToken(0, player.getActivePlayer().token);
player.switchPlayer();
board.dropToken(1, player.getActivePlayer().token);
player.switchPlayer();

checkWinner();