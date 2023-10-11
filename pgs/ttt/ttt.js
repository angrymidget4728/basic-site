const cells = document.querySelectorAll('.cell');
const nextGameButton = document.querySelector('.next');
const giveUpButton = document.querySelector('.give-up');
const title = document.querySelector('.pturn');
const score = document.querySelectorAll('.score');
const fill = ['', 'X', 'O']

var turnCount = 0;
var playerTurn = Math.floor(Math.random() * 2) + 1;
var lastWinner = null;

updateTitle();


for (var i=0; i<cells.length; i++) {
    cells[i].addEventListener("click", function () {
        if (cellIsEmpty(this) && !isGameOver()) {
            // Global Events
            fillCell(this, fill[playerTurn]);
            cellNum = parseInt(this.classList[1][this.classList[1].length-1]);
                
            // Check Game State
            gameState = gameCondition(cellNum, fill[playerTurn])

            // Game ends if state is 1 (winner) or 2 (draw). Next turn triggers if state is 0.
            if (gameState!=0) {
                setGameOver();
                setActive(nextGameButton);
                setInactive(giveUpButton);

                // Game ends regardless of 1 or 2. But score is updated only when someone wins.
                if (gameState == 1) {
                    updateScore(playerTurn);
                    lastWinner = playerTurn;
                } else {
                    // Since there is no winner, last winner is set at random.
                    lastWinner = Math.floor(Math.random() * 2) + 1;
                }
            } else {
                turnCount += 1;
                playerTurn = swapPlayer(playerTurn);
            }
            updateTitle(gameState);
        }
    });
}

function gameCondition (cellNum, cellState) {
    // Set board state and checking params
    const row = Math.floor(cellNum/3);
    const col = cellNum % 3;
    const cellStreak = 3;

    // Check col
    for (var i=0; i<cellStreak; i++) {
        if (cells[(i*3)+col].innerHTML != cellState) break;
        if (i == cellStreak - 1) return 1;
    }

    // Check row
    for (var i=0; i<cellStreak; i++) {
        if (cells[(row*3)+i].innerHTML != cellState) break;
        if (i == cellStreak - 1) return 1;
    }

    // Check diag
    for (var i=0; i<cellStreak; i++) {
        if (cells[(i*3)+i].innerHTML != cellState) break;
        if (i == cellStreak - 1) return 1;
    }

    // Check r-diag
    for (var i=0; i<cellStreak; i++) {
        if (cells[(i*3)+(cellStreak-1-i)].innerHTML != cellState) break;
        if (i == cellStreak - 1) return 1;
    }

    // console.log(turnCount);
    if (turnCount >= 8) return 2;

    return 0;
}

// When 'Next Game' is clicked
nextGameButton.addEventListener('click', function () {
    if (isActive(this)) {
        unsetGameOver();
        turnCount = 0;
        for (var i=0; i<cells.length; i++) clearCell(cells[i]);

        setInactive(this);
        setActive(giveUpButton);

        playerTurn = swapPlayer(lastWinner);

        updateTitle();

    }
})

giveUpButton.addEventListener('click', function () {
    if (isActive(this)) {
        setGameOver();
        setInactive(this);
        setActive(nextGameButton);

        updateScore(swapPlayer(playerTurn));
        updateTitle(1, swapPlayer(playerTurn));

}
})

function swapPlayer (currPlayer) {return -currPlayer+3;}
function updateScore (currPlayer) {score[currPlayer-1].innerHTML = parseInt(score[currPlayer-1].innerHTML)+1;}
function updateTitle (gameState=0, currPlayer=playerTurn) {
    switch (gameState){
        case 0:
            // Next Turn
            title.innerHTML = 'Player ' + currPlayer + ' Turn (' + fill[currPlayer] + ')';
            break;
        case 1:
            // Winner Found
            title.innerHTML = 'Player ' + currPlayer + ' Wins!';
            break;
        case 2:
            // Draw
            title.innerHTML = "It's a draw!";
            break;
        default:
            title.innerHTML = 'Player ' + currPlayer + ' Turn (' + fill[currPlayer] + ')';
    }
}

function isGameOver () {return document.querySelector('.pturn').classList.contains('over');}
function setGameOver () {document.querySelector('.pturn').classList.add('over');}
function unsetGameOver () {document.querySelector('.pturn').classList.remove('over');}

function cellIsEmpty (cell) {return !cell.classList.contains('filled');}
function getCellData (cell) {return cell.innerHTML;}
function fillCell (cell, data) {
    cell.innerHTML = data;
    cell.classList.add('filled');
}
function clearCell (cell) {
    cell.innerHTML = '';
    cell.classList.remove('filled');
}

function isActive (button) {return !button.classList.contains('inactive');}
function setActive (button) {button.classList.remove('inactive');}
function setInactive (button) {button.classList.add('inactive');}