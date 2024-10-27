let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let winMsg = document.querySelector(".winMassage");
let msg = document.querySelector("#msg");
let main = document.querySelector(".main");
let nowTrun = document.querySelector("#nowTurntext");
let tapAudio = new Audio("tapp.wav");
//let winAudio = new Audio("win.mp3");
//let drawAudio = new Audio("draw.wav");
let scoreCountx = document.querySelector("#scorex")
let scoreCounto = document.querySelector("#scoreo")

let scoreo = 0;
let scorex = 0;

let turnO = true;

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulation winner is ${winner}`;
    //winAudio.play();
    winMsg.classList.remove("hide");
}

const draw = () => {
    msg.innerText = `Upss Match Draw`;
    //drawAudio.play();
    winMsg.classList.remove("hide");
    main.classList.add("hide")

}
const checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                main.classList.add("hide");
                if ( pos1 === 'X') {
                    scorex++;
                    scoreCountx.innerText = `X : ${scorex}`;
                }
                else if (pos1 === 'O') {
                    scoreo++;
                    scoreCounto.innerText = `O : ${scoreo}`;
                }
                disableBox();
            }
        }
    }
}
const checkDraw = () => {
    let isDraw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }
    if (isDraw === true) {
        draw();
    } else {
        checkWinner();
    }
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        tapAudio.play();
        if (turnO) {
            box.innerText = "O"
            turnO = false;
            if (turnO === false) {
                nowTrun.innerText = "Now trun of X"
            }
        } else {
            box.innerText = "X"
            turnO = true;
            if (turnO) {
                nowTrun.innerText = "Now trun of O"
            }
        }
        box.disabled = true
        checkDraw();
    })
});

const resetGame = () => {
    turnO = true;
    enableBox();
    winMsg.classList.add("hide")
}

newGame.addEventListener("click", () => {
    resetGame();
    main.classList.remove("hide");
    nowTrun.innerText = ""
})
reset.addEventListener("click", () => {
    resetGame();
    nowTrun.innerText = ""
})
