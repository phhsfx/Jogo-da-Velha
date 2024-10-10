let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let buttons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let secondPlayer;

let player1 = 0;
let player2 = 0;

for (let i = 0; i < boxes.length; i++) { 
    boxes[i].addEventListener("click", function () {
        let el = checkEl(player1, player2);

        if (this.childNodes.length == 0) {
            let cloneEl = el.cloneNode(true);
            this.appendChild(cloneEl);

            if (player1 == player2) {
                player1++;

                if (secondPlayer == 'ai-player') {
                    computerPlay();
                    player2++;
                }

            } else {
                player2++;
            }

            checkWinCondition();
        }
    });
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        secondPlayer = this.getAttribute("id");

        for (let j = 0; j < buttons.length; j++) {
            buttons[j].style.display = 'none';
        }

        setTimeout(function () {
            let container = document.querySelector("#container");
            container.classList.remove("hide");
        }, 300);
    });
}

function checkEl(player1, player2) {
    let el;
    if (player1 == player2) {
        el = x;
    } else {
        el = o;
    }
    return el;
}

function checkWinCondition() {
    let b1 = document.getElementById("block-1");
    let b2 = document.getElementById("block-2");
    let b3 = document.getElementById("block-3");
    let b4 = document.getElementById("block-4");
    let b5 = document.getElementById("block-5");
    let b6 = document.getElementById("block-6");
    let b7 = document.getElementById("block-7");
    let b8 = document.getElementById("block-8");
    let b9 = document.getElementById("block-9");

    // Verificar linhas horizontais
    checkLine(b1, b2, b3);
    checkLine(b4, b5, b6);
    checkLine(b7, b8, b9);

    // Verificar linhas verticais
    checkLine(b1, b4, b7);
    checkLine(b2, b5, b8);
    checkLine(b3, b6, b9);

    // Verificar diagonais
    checkLine(b1, b5, b9);
    checkLine(b3, b5, b7);

    // Verificar se deu velha (empate)
    let counter = 0;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].childNodes.length > 0) {
            counter++;
        }
    }

    if (counter == 9) {
        declareWinner('Deu velha');
    }
}

function checkLine(b1, b2, b3) {
    if (b1.childNodes.length > 0 && b2.childNodes.length > 0 && b3.childNodes.length > 0) {
        let b1Child = b1.childNodes[0].className;
        let b2Child = b2.childNodes[0].className;
        let b3Child = b3.childNodes[0].className;

        if (b1Child == 'x' && b2Child == 'x' && b3Child == 'x') {
            declareWinner('x');
        } else if (b1Child == 'o' && b2Child == 'o' && b3Child == 'o') {
            declareWinner('o');
        }
    }
}

function declareWinner(winner) {
    let scoreboardX = document.querySelector("#scoreboard-1");
    let scoreboardY = document.querySelector("#scoreboard-2");
    let msg = '';

    if (winner == 'x') {
        scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
        msg = "O jogador 1 venceu";
    } else if (winner == 'o') {
        scoreboardY.textContent = parseInt(scoreboardY.textContent) + 1;
        msg = "O jogador 2 venceu";
    } else {
        msg = "Deu velha";
    }

    messageText.innerHTML = msg;
    messageContainer.classList.remove("hide");

    setTimeout(function () {
        messageContainer.classList.add("hide");
    }, 4000);

    player1 = 0;
    player2 = 0;

    let boxesToRemove = document.querySelectorAll(".box div");
    for (let i = 0; i < boxesToRemove.length; i++) {
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }
}

function computerPlay() {
    let cloneO = o.cloneNode(true);
    let counter = 0;
    let filled = 0;

    for (let i = 0; i < boxes.length; i++) {
        let randomNumber = Math.floor(Math.random() * 5);
        if (boxes[i].childNodes.length == 0) {
            if (randomNumber <= 1) {
                boxes[i].appendChild(cloneO);
                counter++;
                break;
            }
        } else {
            filled++;
        }
    }

    if (counter == 0 && filled < 9) {
        computerPlay();
    }
}
