let weaponsCard = document.getElementById("weapons");
let weaponsWindow = document.getElementById("first-window");
let weapons = document.getElementsByClassName("weapon");
let openIcon = document.getElementById("nav-icon");
let closeIcon = document.getElementById("close-icon")
let navBar = document.getElementById("nav");
let levels = document.getElementsByClassName("level");
let boardAreas = document.getElementsByClassName("board-areas");
let choosenLevel;
let choosenWeapon;
let user;
let bot;
let oScore = document.getElementById("o-scores");
let xScore = document.getElementById("x-scores");
let restart = document.getElementById("restart");

// Factory function for USER and the BOT and board areas
function Player(name, weapon, score) {
    return { name, weapon, score };
}

function BoardArea(number, content, chicked) {
    return { number, content, chicked };
}

// Choosing a weapon
for (const weapon of weapons) {
    weapon.addEventListener('click', function () {
        weaponsWindow.style.cssText = `display: none`;
        openNav();
        console.log(weapon.dataset.type);
        choosenWeapon = weapon.dataset.type;
        user = Player("User", choosenWeapon, 0);
        bot = Player("Bot", user.weapon === "x" ? "o" : "x", 0);
    });
}

function openNav() {
    navBar.style.cssText = `width: 100%; font-size: 1rem`;
    openIcon.style.display = 'none';
    closeIcon.style.display = 'block';
}

function closeNav() {
    navBar.style.cssText = `width: 0; font-size: 0rem`;
    openIcon.style.display = 'block';
    closeIcon.style.display = 'none';
}

let chickedAreas = [...boardAreas];
let areasArray = [...boardAreas];
let completeAreasArray;

let stopFun = false;
let num = 0;
let area;

let choosingLevel = (function () {
    for (const level of levels) {
        level.addEventListener('click', function () {
            choosenLevel = level.dataset.type;
            for (const area of boardAreas) {
                area.textContent = "";
                area.classList.remove("x", "o");
                area.chicked = false;
            }
            console.log(choosenLevel);
            stopFun = false;
            num = 0;
            area = 0;
            closeNav();
            areasArray = [...boardAreas];
            chickedAreas = [...boardAreas];
            completeAreasArray = [...boardAreas];
            game();
            if (choosenLevel === "chooseWeapon") {
                console.log("choose weapon");
                weaponsWindow.style.cssText = `display: flex`;
            }

            completeAreasArray.map(ele => {
                return ele.style.cssText = `text-shadow: none`;
            });

            xScore.textContent = "0";
            oScore.textContent = "0";
        });
    }
})();

openIcon.addEventListener('click', openNav);
closeIcon.addEventListener('click', closeNav);

let random = (num) => { return Math.floor(Math.random() * num); };

function game() {
    for (let i = 0; i < boardAreas.length; i++) {
        chickedAreas[i] = BoardArea(i, "", false);
        areasArray[i].addEventListener('click', function () {
            area = boardAreas[i];

            if (choosenLevel === "twoplayers") {
                if (chickedAreas[i].chicked === false) {
                    if (num % 2 === 0 || num === 0) {
                        area.textContent = user.weapon;
                        chickedAreas[i] = BoardArea(i, user.weapon, true);
                        area.classList.add(user.weapon);
                        num++;
                        chickForWinner();
                    } else {
                        area.textContent = bot.weapon;
                        chickedAreas[i] = BoardArea(i, bot.weapon, true);
                        area.classList.add(bot.weapon);
                        num++;
                        chickForWinner();
                    }
                }
            } else if (choosenLevel === "easy") { // Fixed easy level bot moves
                if (chickedAreas[i].chicked === false) {
                    area.textContent = user.weapon;
                    area.classList.add(user.weapon);
                    chickedAreas[i] = BoardArea(i, user.weapon, true);
                    areasArray = areasArray.filter(ele => ele !== area);
                    chickForWinner();

                    if (stopFun === false && areasArray.length > 0) {
                        let randomNum = random(areasArray.length);
                        areasArray[randomNum].textContent = bot.weapon;
                        areasArray[randomNum].classList.add(bot.weapon);
                        chickedAreas[areasArray[randomNum].dataset.index] = BoardArea(areasArray[randomNum].dataset.index, bot.weapon, true);
                        areasArray = areasArray.filter(ele => ele !== areasArray[randomNum]);
                        chickForWinner();
                    }
                }
            } else if (choosenLevel === "hard") { // Improved hard level with Minimax algorithm
                if (chickedAreas[i].chicked === false) {
                    area.textContent = user.weapon;
                    area.classList.add(user.weapon);
                    chickedAreas[i] = BoardArea(i, user.weapon, true);
                    chickForWinner();

                    if (stopFun === false) {
                        bestMove(); // Call bestMove function to make the optimal move
                    }
                }
            }
        });
    }
}

const winingArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]];

function bestMove() { // Added bestMove function using Minimax algorithm
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < chickedAreas.length; i++) {
        if (chickedAreas[i].content === "") {
            chickedAreas[i].content = bot.weapon;
            let score = minimax(chickedAreas, 0, false);
            chickedAreas[i].content = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    chickedAreas[move].content = bot.weapon;
    chickedAreas[move].chicked = true;
    boardAreas[move].textContent = bot.weapon;
    boardAreas[move].classList.add(bot.weapon);
    chickForWinner();
}

let scores = { // Added scoring system for Minimax algorithm
    x: 1,
    o: -1,
    tie: 0
};

function minimax(newBoard, depth, isMaximizing) { // Added Minimax function for unbeatable bot
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i].content === "") {
                newBoard[i].content = bot.weapon;
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i].content = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i].content === "") {
                newBoard[i].content = user.weapon;
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i].content = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner() { // Added function to check for winner or tie
    let winner = null;
    for (let combo of winingArray) {
        const [a, b, c] = combo;
        if (chickedAreas[a].content && chickedAreas[a].content === chickedAreas[b].content && chickedAreas[a].content === chickedAreas[c].content) {
            winner = chickedAreas[a].content;
        }
    }

    let openSpots = 0;
    for (let i = 0; i < chickedAreas.length; i++) {
        if (chickedAreas[i].content === "") {
            openSpots++;
        }
    }

    if (winner === null && openSpots === 0) {
        return "tie";
    } else {
        return winner;
    }
}

function chickForWinner() {
    let completeAreasArray = [...boardAreas];
    for (let combo of winingArray) {
        let [a, b, c] = combo;
        if (chickedAreas[a].content && chickedAreas[a].content === chickedAreas[b].content && chickedAreas[a].content === chickedAreas[c].content) {
            stopFun = true;
            if (chickedAreas[a].content === user.weapon) {
                xScore.textContent = Number(xScore.textContent) + 1;
                combo.map(index => completeAreasArray[index].style.cssText = `animation: anim-popoutin 0.5s linear 0s 5 alternate;`);
                completeAreasArray.map(element => {
                    if (element.textContent === bot.weapon) {
                        return element.style.cssText = `text-shadow: 0.5px 0.5px 10px #BBE7FE,-0.7px -0.7px 5px #d2efff`;
                    }
                });
            } else {
                oScore.textContent = Number(oScore.textContent) + 1;
                combo.map(index => completeAreasArray[index].style.cssText = `animation: anim-popoutin 0.5s linear 0s 5 alternate;`);
                completeAreasArray.map(element => {
                    if (element.textContent === user.weapon) {
                        return element.style.cssText = `text-shadow: 0.5px 0.5px 10px #FD49A0,-0.7px -0.7px 5px #ff84bf`;
                    }
                });
            }
            return;
        }
    }

    if (chickedAreas.every(area => area.chicked)) {
        stopFun = true;
    }
}

restart.addEventListener('click', function () {
    for (const area of boardAreas) {
        area.textContent = "";
        area.classList.remove("x", "o");
        area.chicked = false;
    }
    stopFun = false;
    num = 0;
    area = 0;
    areasArray = [...boardAreas];
    chickedAreas = [...boardAreas];
    completeAreasArray = [...boardAreas];
    game();
    if (choosenLevel === "chooseWeapon") {
        weaponsWindow.style.cssText = `display: flex`;
    }

    completeAreasArray.map(ele => {
        return ele.style.cssText = `text-shadow: none`;
    });
});
