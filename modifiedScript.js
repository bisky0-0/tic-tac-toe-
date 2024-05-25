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
    return { name, weapon, score }
}

function BoardArea(number, content, chicked) {
    return { number, content, chicked }
}

// Choosing a weapon
for (const weapon of weapons) {
    weapon.addEventListener('click', function () {
        weaponsWindow.style.cssText = `display: none`;
        openNav();
        console.log(weapon.dataset.type)
        let choosenWeapon = weapon.dataset.type;
        user = Player(choosenWeapon, choosenWeapon, 0);
        bot = Player(user.weapon === "x" ? "o" : "x", user.weapon === "x" ? "o" : "x", 0);
    })
}

function openNav() {
    navBar.style.cssText = `width: 100%; font-size: 1rem`;
    openIcon.style.display = 'none';
    closeIcon.style.display = 'block';
}

// I used chicked areas so I can check for winners later, but areasArray is for textContent and classList
// for HTML elements, because textContent and classList can't be attached to objects of ChickedAreas Array
// so I had to make an array only for HTML elements
let chickedAreas = [...boardAreas];
let areasArray = [...boardAreas];
let completeAreasArray;

function closeNav() {
    navBar.style.cssText = `width: 0; font-size: 0rem`;
    openIcon.style.display = 'block';
    closeIcon.style.display = 'none';
}

// Stop Function variable is important here, it helps me to check which step I should take in
// the hard level which is more complex than any level
// Step variable is to check if it's the first step for the bot or not
// Num variable is to check if the number is even or odd to see who will play, the user or the bot, on the two players level
let stopFun = false;
let step = 1;
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
            step = 1;
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
            oScore.textContent = '0';
        })
    }
})()

openIcon.addEventListener('click', openNav);
closeIcon.addEventListener('click', closeNav);

let random = (num) => { return Math.floor(Math.random() * num) }
              
const winingArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];

function chasing(array, player) {
    for (let i = 0; i < array.length; i++) {
        if (stopFun === false) {
            let result = array[i].filter(element => chickedAreas[element].content === player.weapon);
            if (result.length === 2) {
                let botMove = array[i].filter(element => chickedAreas[element].content === "")[0];
                if (botMove !== undefined && chickedAreas[botMove].chicked === false) {
                    chickedAreas[botMove] = BoardArea(botMove, bot.weapon, true);
                    areasArray[botMove].textContent = bot.weapon;
                    areasArray[botMove].classList.add(bot.weapon);
                    stopFun = true;
                }
            }
        }
    }
}
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
            } else if (choosenLevel === "easy") {
                if (chickedAreas[i].chicked === false) {
                    // User move
                    area.textContent = user.weapon;
                    area.classList.add(user.weapon);
                    chickedAreas[i] = BoardArea(i, user.weapon, true);
                    areasArray = areasArray.filter(a => a !== area); // Remove the chosen area
                    chickForWinner();

                    // Bot move
                    if (stopFun === false && areasArray.length > 0) {
                        let randomNum = random(areasArray.length);
                        let botMoveArea = areasArray[randomNum];
                        botMoveArea.textContent = bot.weapon;
                        botMoveArea.classList.add(bot.weapon);
                        chickedAreas[botMoveArea.dataset.index] = BoardArea(botMoveArea.dataset.index, bot.weapon, true);
                        areasArray = areasArray.filter(a => a !== botMoveArea); // Remove the bot's chosen area
                        chickForWinner();
                    }
                }
            } else if (choosenLevel === "hard") {
                console.log(step);
                if (chickedAreas[i].chicked === false) {
                    area.textContent = user.weapon;
                    area.classList.add(user.weapon);
                    chickedAreas[i] = BoardArea(i, user.weapon, true);

                    // Bot turn
                    if (step === 1) {
                        if (chickedAreas[4].chicked === false) {
                            boardAreas[4].textContent = bot.weapon;
                            chickedAreas[4] = BoardArea(4, bot.weapon, true);
                            boardAreas[4].classList.add(bot.weapon);
                        } else {
                            boardAreas[0].textContent = bot.weapon;
                            chickedAreas[0] = BoardArea(0, bot.weapon, true);
                            boardAreas[0].classList.add(bot.weapon);
                        }
                        step = 0;
                    } else {
                        chickForWinner();
                        chasing(winingArray, bot);

                        if (stopFun === false) {
                            chasing(winingArray, user);

                            if (stopFun === false) {
                                for (let ele of winingArray.flat()) {
                                    if (chickedAreas[ele].chicked === false) {
                                        chickedAreas[ele] = BoardArea(ele, bot.weapon, true);
                                        boardAreas[ele].textContent = bot.weapon;
                                        boardAreas[ele].classList.add(bot.weapon);
                                        stopFun = true;
                                        break;
                                    }
                                }
                            }
                        }
                        chickForWinner();
                        stopFun = false;
                    }
                }
            }
        });
    }
}

function chickForWinner() {
    completeAreasArray = [...boardAreas];
    for (let i = 0; i < winingArray.length; i++) {
        let winner = winingArray[i].filter(element => chickedAreas[element].content === user.weapon);
        if (winner.length < 3) {
            winner = winingArray[i].filter(element => chickedAreas[element].content === bot.weapon);
            if (winner.length < 3) {
                stopFun = false;
            } else {
                bot.score++;
                oScore.textContent = bot.score;
                chickedAreas.forEach(element => element.chicked = true);
                winingArray[i].forEach(element => completeAreasArray[element].style.cssText = `
                    animation: anim-popoutin 0.5s linear 0s 5 alternate;
                    text-shadow: 1px 1px 60px #fff
                `);
                completeAreasArray.forEach(element => {
                    if (element.textContent === user.weapon) {
                        element.style.cssText = `text-shadow: 0.5px 0.5px 10px #FD49A0,-0.7px -0.7px 5px #ff84bf`;
                    }
                });
                stopFun = true;
            }
        } else if (winner.length === 3) {
            user.score++;
            xScore.textContent = user.score;
            chickedAreas.forEach(element => element.chicked = true);
            winingArray[i].forEach(element => completeAreasArray[element].style.cssText = `
                animation: anim-popoutin 0.5s linear 0s 5 alternate;
                text-shadow: 1px 1px 60px #fff
            `);
            completeAreasArray.forEach(element => {
                if (element.textContent === bot.weapon) {
                    element.style.cssText = `text-shadow: 0.5px 0.5px 10px #BBE7FE,-0.7px -0.7px 5px #d2efff`;
                }
            });
            stopFun = true;
        }
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
    step = 1;
    areasArray = [...boardAreas];
    chickedAreas = [...boardAreas];
    completeAreasArray = [...boardAreas];
    game();
    if (choosenLevel === "chooseWeapon") {
        weaponsWindow.style.cssText = `display: flex`;
    }
    completeAreasArray.forEach(ele => ele.style.cssText = `text-shadow: none`);
});
