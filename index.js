function Player(id, name, color) {
  this.id = id;
  this.name = name;
  this.color = color;
  this.score = 0;
}
const GameController = (function () {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const winnings = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const player1 = new Player(1, "Player 1", "red");
  const player2 = new Player(2, "Player 2", "black");
  let hasFreezed = false;
  let opponent = player1;
  function setOpponet() {
    if (opponent.color === "red") {
      opponent = player2;
    } else {
      opponent = player1;
    }
  }
  function hasWin() {
    for (const row of winnings) {
      if ((board[row[0]] & board[row[1]] & board[row[2]]) !== 0) {
        return true;
      }
    }
    return false;
  }
  function isDraw() {
    for (let i = 0; i < 9; i++) {
      if (board[i] === 0) {
        return false;
      }
    }
    return true;
  }
  function playAgain() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    hasFreezed = false;
    resetBoard();
  }
  function reset() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    hasFreezed = false;
    player1.score = 0;
    player2.score = 0;
    document.getElementById("score1").textContent = player1.score;
    document.getElementById("score2").textContent = player2.score;
    resetBoard();
  }
  function resetBoard() {
    for (let i = 0; i < 9; i++) {
      const cell = document.getElementById(i);
      if (cell.classList[0] === "cell-red") {
        cell.classList.replace("cell-red", "cell-white");
      } else if (cell.classList[0] === "cell-black") {
        cell.classList.replace("cell-black", "cell-white");
      }
    }
    document.getElementById("turn").textContent = "Player 1's turn";
  }
  function cellSelection(cellId) {
    const cell = document.getElementById(cellId);
    cell.classList.replace("cell-white", "cell-" + opponent.color);
    board[parseInt(cellId)] = parseInt(opponent.id);
    if (hasWin() === true) {
      hasFreezed = true;
      opponent.score += 1;
      document.getElementById("score" + opponent.id).textContent =
        opponent.score;
      document.getElementById("turn").textContent =
        "Player " + opponent.id + " won the match!";
    } else if (isDraw()) {
      hasFreezed = true;
      document.getElementById("turn").textContent = "Draw!";
    } else {
      setOpponet();
      document.getElementById("turn").textContent =
        "Player " + opponent.id + "'s turn";
    }
  }
  return {
    get hasFreezed() {
      return hasFreezed;
    },
    cellSelection,
    playAgain,
    reset,
  };
})();
function onReset() {
  GameController.reset();
}
function onPlayAgain() {
  GameController.playAgain();
}
const gameContainer = document.querySelector(".game-container");
gameContainer.addEventListener("click", (e) => {
  const className = e.target.classList[0];
  if (GameController.hasFreezed === false && className === "cell-white") {
    GameController.cellSelection(e.target.id);
  }
});
