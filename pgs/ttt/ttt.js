cells = document.querySelectorAll('.cell');

playerTurn = true;
pturnTag = document.querySelector('.pturn');
fill = 'X'
cellText = [[null,null,null],[null,null,null],[null,null,null]];
turnCount = 0;

for (i=0; i<cells.length; i++) {
    cells[i].addEventListener("click", function () {
        // console.dir(this);
        if (!this.classList.contains('filled') && !pturnTag.classList.contains('over')) {
            this.classList.add('filled');
            turnCount += 1;
            cellNum = parseInt(this.classList[1][this.classList[1].length-1]);
            if (playerTurn) {
                this.innerHTML = fill;
                gameState = gameCondition(cellNum, fill)
                fill = 'O'
                if (gameState==1) {
                    pturnTag.classList.add('over');
                    pturnTag.innerHTML = 'Player 1 Wins!';
                } else if (gameState==2) {
                    pturnTag.classList.add('over');
                    pturnTag.innerHTML = "It's a draw!";
                } else {
                    pturnTag.innerHTML = 'Player 2 Turn';
                }
            } else {
                this.innerHTML = fill;
                gameState = gameCondition(cellNum, fill)
                fill = 'X'
                if (gameState==1) {
                    pturnTag.classList.add('over');
                    pturnTag.innerHTML = 'Player 2 Wins!';
                } else if (gameState==2) {
                    pturnTag.classList.add('over');
                    pturnTag.innerHTML = "It's a draw!";
                } else {
                    pturnTag.innerHTML = 'Player 1 Turn';
                }
            }
            // setTimeout(function () {
            // }, 50);
            // console.log(gameState);
            playerTurn = !playerTurn;
            // console.dir(this.classList);
        }
    });
}

function gameCondition (cellNum, cellState) {
    // Set board state and checking params
    row = Math.floor(cellNum/3);
    col = cellNum % 3;
    cellText[row][col] = cellState;
    cellStreak = 3;
    console.log(cellText);

    // Check col
    for (i=0; i<cellStreak; i++) {
        if (cellText[i][col] != cellState) break;
        if (i == cellStreak - 1) return 1;
    }

    // Check row
    for (i=0; i<cellStreak; i++) {
        if (cellText[row][i] != cellState) break;
        if (i == cellStreak - 1) return 1;
    }

    // Check diag
    for (i=0; i<cellStreak; i++) {
        if (cellText[i][i] != cellState) break;
        if (i == cellStreak - 1) return 1;
    }

    // Check r-diag
    for (i=0; i<cellStreak; i++) {
        if (cellText[i][cellStreak-1-i] != cellState) break;
        if (i == cellStreak - 1) return 1;
    }

    console.log(turnCount);
    if (turnCount >= 9) return 2;

    return 0;
}