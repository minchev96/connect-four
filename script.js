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

function playersTurn(){
    const players = [
        {
            name: "playerOne",
            token: 1
        },
        {
            name: "playerTwo",
            token: 2
        }
    ]
    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        console.info(`${activePlayer.name} turn`)
    }

    return { getActivePlayer, switchPlayer};
}

function checkWinner(){
    const winnerMatches = 3;
    const test = board.getBoard();
    let matches = 0;
    let hasWinner = false;
    console.error(board.getBoard());
    //vertical win check
    for(let i = 0; i < test.length + 1; i++){
        if(hasWinner) break;
        for(let j = 0; j < test.length; j++){
            if(test[j][i] === 1){
                matches++;
            }
            else{
                matches = 0;
            }
            if(matches === winnerMatches) {
                console.log('win');
                hasWinner = true;
                break;
            }
        }
    }
}

const board = Gameboard();
const player = playersTurn();
board.dropToken(0, player.getActivePlayer().token);
player.switchPlayer();
board.dropToken(1, player.getActivePlayer().token);
player.switchPlayer();

console.log(board.getBoard());

checkWinner();