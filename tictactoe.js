const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6]
]
const cellElements = document.querySelectorAll('[data-cell]'); //Pulls in the data for each cell in HTML
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame) //allows restart button to restart game, but does not clear board status

function startGame() {
    circleTurn = false; // This sets the game to start with X's turn and calls the hover class to display the X
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})  //Allows the eventlistener to only activate once
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
//This function must:
//placeMark
//Check for win
//Check for tie
//Switch turns
const cell = e.target //grabs target cell
const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; //if circle's turn returns circle_class, otherwise return x_class
placeMark(cell, currentClass);
if (checkWin(currentClass)) {
    endGame(false);
} else if (isDraw()) {
    endGame(true);
} else {
    swapTurns()
    setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!` //Shows text when someone wins
    }
    winningMessageElement.classList.add('show'); //shows winning element
}

function isDraw() {
    return [...cellElements].every(cell => { //since cellElements does not have an 'every' method it must be de-structured into an array
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function placeMark(cell, currentClass) {
cell.classList.add(currentClass);
}

function swapTurns() { //function for changing turns
    circleTurn = !circleTurn;
}
function setBoardHoverClass() { //function to set which class is shown in hover
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }

}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}