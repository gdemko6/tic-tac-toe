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
        Gameboard.gameboard.forEach((row) => {
            const boardRow = document.createElement('div');
            row.forEach((space) => {
                
                const boardSpace = document.createElement('span');
                boardSpace.innerText = String(space);
                boardRow.appendChild(boardSpace);
            })
            board.appendChild(boardRow);
        })

    }
    return {update};
})();

const Game = (function (player1, player2) {
    player1.setPlayerPiece("X");
    player2.setPlayerPiece("O");
    while (!player1.hasWon && !player2.hasWon){
        placePiece(player1, 0, 0);
        placePiece(player1, 0, 1);
        placePiece(player1, 0, 2);
        placePiece(player1, 1, 0);
        console.log(Gameboard.gameboard);
        displayBoard.update();
    }
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



