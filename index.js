// function Cell() {
//     let value  = '';

//     const addValue = (player) => {
//         value = player
//     };

//     const getValue = () => value;

//     return { addValue, getValue, value };
// }

function Gameboard() { 
    let rows = 3;
    let columns = 3;
    let board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push('');
        }
    }

    const getBoard = () => board;

    //row and columns both start at 0
    const playerChoice = (row, column, player) => {
        const isCellAvailable = (board[row][column] === '');
        
        if(!isCellAvailable) return;

        board[row][column] = player;
    };

    const printBoard = () => {
        for(let i = 0; i < board.length; i++){
            console.log(board[i], '\n');
        };
    }

    return { getBoard, playerChoice, printBoard };
}

function GameController(playerOne = "playerOne", playerTwo = "playerTwo") {
    let games = 0;
    
    const board = Gameboard();

    const players = [
        {
            name: playerOne,
            value: 'x',
        },
        {
            name: playerTwo,
            value: 'o',
        },
    ]

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (row, column) => {
        console.log(`You placed ${getActivePlayer().value} at row ${row} and column ${column}.`)
        board.playerChoice(row, column, getActivePlayer().value);

        games += 1;
        console.log(games)
        
        if(games >= 1){
            checkWinner();
        }
    
        switchPlayer();
        printNewRound();
    }

    const checkWinner = () => {
        let checkBoard = board.getBoard();

        let tracker = {
            x: 0,
            y: 0,
        }

        let check = false;

        //Horizontal Check
        for(let i = 0; i < checkBoard.length; i++) {
            checkBoard[i].forEach((column) => {
                if(!column === ''){
                    tracker[column] += 1;
                }
                console.log(tracker)
            })
            if(tracker.x === 3 || tracker.y === 3){
                console.log(`${getActivePlayer.name} wins!`);
                return;
            }
        }
    
    }
    

    printNewRound();

    return { playRound, getActivePlayer }
}

const game = GameController();