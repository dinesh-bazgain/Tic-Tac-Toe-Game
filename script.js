let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let restartBtn = document.querySelector(".restartBtn");
let msgContainer = document.querySelector(".msgContainer");
let main = document.querySelector(".main");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  main.classList.add("hide");
};

const tieGame = () => {
  msg.innerText = "It's a Tie!!!";
  main.classList.add("hide");
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  main.classList.remove("hide");
};

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      winnerFound = true;
      return;
    }
  }

  let allFilled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      allFilled = false;
    }
  });

  if (!winnerFound && allFilled) {
    tieGame();
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#000000";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#EA2B1F";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

restartBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
