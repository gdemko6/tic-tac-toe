const Gameboard = (function () {

    //create gameboard and create three rows of 3 columns
    let gameboard = [];
    for (let i = 0; i < 3; i++) {
        gameboard[i] = ["", "", ""]; 
    }
    return {gameboard};
})();

const displayBoard = (function () {
    const board = document.querySelector('.gameboard');

    let update = () => {
        board.innerHTML = '';

        Gameboard.gameboard.forEach((row, rowIndex) => {
            const boardRow = document.createElement('div');
            row.forEach((space, colIndex) => {
                let boardSpace;
                if (String(space) === "X" || String(space) === "O") {
                    boardSpace = document.createElement('span');
                    boardSpace.innerText = String(space);
                } else {
                    boardSpace = document.createElement('button');
                    boardSpace.innerText = ""; // Button is initially empty
                    boardSpace.onclick = () => {
                        const currentPlayer = Game.whosTurn();
                        if (!currentPlayer.hasWon && Gameboard.gameboard[rowIndex][colIndex] === "") {
                            Game.placePiece(currentPlayer, rowIndex, colIndex);
                            update(); // Update the board after placing a piece
                        }
                    };
                }
                boardRow.appendChild(boardSpace);
            });
            board.appendChild(boardRow);
        });
    };

    return { update };
})();


const Game = (function (player1, player2) {
    player1.setPlayerPiece("X");
    player2.setPlayerPiece("O");
    
    function whosTurn(){
        if (player1.isTheirTurn)
            return player1;
        if (player2.isTheirTurn)
            return player2;
        return player1; //start of game
    }
    function placePiece(player, row, column){
        Gameboard.gameboard[row][column] = player.getPlayerPiece();
        checkWin(player);
        displayBoard.update;
        console.log(Gameboard.gameboard);
    }
    function checkWin(player) {
        const piece = player.getPlayerPiece();
    
        for (let row = 0; row < 3; row++) {
            if (Gameboard.gameboard[row][0] === piece && Gameboard.gameboard[row][1] === piece && Gameboard.gameboard[row][2] === piece) {
                player.incrementWins();
                player.hasWon = true;
                return true;
            }
        }
    
        for (let col = 0; col < 3; col++) {
            if (Gameboard.gameboard[0][col] === piece && Gameboard.gameboard[1][col] === piece && Gameboard.gameboard[2][col] === piece) {
                player.incrementWins();
                player.hasWon = true;
                return true;
            }
        }
    
        if (Gameboard.gameboard[0][0] === piece && Gameboard.gameboard[1][1] === piece && Gameboard.gameboard[2][2] === piece) {
            player.incrementWins();
            player.hasWon = true;
            return true;
        }
        if (Gameboard.gameboard[0][2] === piece && Gameboard.gameboard[1][1] === piece && Gameboard.gameboard[2][0] === piece) {
            player.incrementWins();
            player.hasWon = true;
            return true;
        }
    
        return false;
    }
    
    

    return {player1, player2, placePiece, whosTurn};

})(createPlayer("John"), createPlayer("Mark"));

function createPlayer (name) {
    let wins = 0;
    let hasWon = false;
    let isTheirTurn = false;
    let playerPiece;
    const setPlayerPiece = (piece) => {
        playerPiece = piece;
    }
    const getPlayerPiece = () => {
        return playerPiece;
    }
    const incrementWins = () => wins++;
    return {name, hasWon, isTheirTurn, incrementWins, setPlayerPiece,
            getPlayerPiece
    };
}



displayBoard.update();