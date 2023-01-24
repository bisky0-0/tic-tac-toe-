//choosing X or O;

let weaponsCard = document.getElementById("weapons");
let weaponsWindow = document.getElementById("first-window");
let weapons = document.getElementsByClassName("weapon");
let openIcon = document.getElementById("nav-icon");
let closeIcon = document.getElementById("close-icon")
let navBar = document.getElementById("nav");
let levels = document.getElementsByClassName("level");
let boardAreas = document.getElementsByClassName("board-areas");
let choosenLevel;
let user;
let bot;

function Player(name, weapon, score) {
    return { name, weapon, score }
}

function BoardArea(number, content, chicked) {
    return { number, content, chicked }
}


//choosing a weapon
for (const weapon of weapons) {
    weapon.addEventListener('click', function () {
        weaponsCard.style.cssText = `font-size: 0; width: 0; height: 0`;
        weaponsWindow.style.cssText = `width: 0`;
        openNav();
        console.log(weapon.dataset.type)
        let choosenWeapon = weapon.dataset.type;
        user = Player(choosenWeapon, choosenWeapon, 0);
        bot = Player(user.name === "x" ? "o" : "x", user.weapon === "x" ? "o" : "x", 0)
    })
}

function openNav() {
    navBar.style.cssText = `width: 100%; font-size: 1rem`;
    openIcon.style.display = 'none';
    closeIcon.style.display = 'block'
}

let chickedAreas = [...boardAreas]
let areasArray = [...boardAreas]

function closeNav() {
    navBar.style.cssText = `width: 0; font-size: 0rem`;
    openIcon.style.display = 'block';
    closeIcon.style.display = 'none';
}

let choosingLevel = (function () {
    for (const level of levels) {
        level.addEventListener('click', function () {
            choosenLevel = level.dataset.type;
            for (const area of boardAreas) {
                area.textContent = "";
                area.classList.remove("x", "o")
                area.chicked = false;
                area.chicked = false;
            }
            console.log(choosenLevel)
            closeNav();
            areasArray = [...boardAreas];
            chickedAreas = [...boardAreas]
            game();
        })
    }
})()

openIcon.addEventListener('click', openNav);
closeIcon.addEventListener('click', closeNav);


//BoardEreas
let step = 1;
let num = 0;
let random = (num) => { return Math.floor(Math.random() * num) }
let stopFun = false;
function game() {
    for (let i = 0; i < boardAreas.length; i++) {
        chickedAreas[i] = BoardArea(i, "", false)

        areasArray[i].addEventListener('click', function () {
            let area = boardAreas[i];

            if (choosenLevel === "twoplayers") {
                if (chickedAreas[i].chicked === false) {
                    if (num % 2 === 0 || num === 0) {
                        area.textContent = user.weapon;
                        chickedAreas[i] = BoardArea(i, user.weapon, true)
                        area.classList.add(user.weapon)
                        num++
                    }

                    else {
                        area.textContent = bot.weapon;
                        chickedAreas[i] = BoardArea(i, bot.weapon, true)
                        area.classList.add(bot.weapon)
                        num++
                    }
                }
                chickForWinner()

            }


            else if (choosenLevel === "easy") {
                area.textContent = user.weapon;
                area.classList.add(user.weapon);
                areasArray.splice(areasArray.indexOf(area), 1);
                chickedAreas[i] = BoardArea(i, user.weapon, true)

                let randomNum = random(areasArray.length);
                if (areasArray.length > 0) {
                    areasArray[randomNum].textContent = bot.weapon;
                    areasArray[randomNum].classList.add(bot.weapon);
                    chickedAreas[randomNum + (chickedAreas.length - areasArray.length)] = BoardArea(randomNum + (chickedAreas.length - areasArray.length), bot.weapon, true)
                    areasArray.splice(randomNum, 1)
                }
                chickForWinner()
            }

            else if (choosenLevel === "hard") {
                if (chickedAreas[i].chicked === false) {
                    area.textContent = user.weapon;
                    area.classList.add(user.weapon);
                    // areasArray.splice(areasArray.indexOf(area), 1);
                    chickedAreas[i] = BoardArea(i, user.weapon, true)

                    //bot turn 
                    if (step === 1) {
                        if (chickedAreas[0].content === user.weapon ||
                            chickedAreas[2].content === user.weapon ||
                            chickedAreas[6].content === user.weapon ||
                            chickedAreas[8].content === user.weapon &&
                            chickedAreas[4].chicked === false) {

                            boardAreas[4].textContent = bot.weapon;
                            chickedAreas[4] = BoardArea(4, bot.weapon, true)
                            boardAreas[4].classList.add(bot.weapon);
                            step = 0
                        }
                        else if (chickedAreas[1].content === user.weapon ||
                            chickedAreas[3].content === user.weapon ||
                            chickedAreas[5].content === user.weapon ||
                            chickedAreas[7].content === user.weapon) {
                            areasArray[i + 1].textContent = bot.weapon;
                            chickedAreas[i + 1] = BoardArea(i, bot.weapon, true)
                            areasArray[i + 1].classList.add(bot.weapon);
                            step = 0
                        }
                        else if (chickedAreas[4].chicked === true && chickedAreas[0].chicked === false) {
                            boardAreas[0].textContent = bot.weapon;
                            chickedAreas[0] = BoardArea(i, bot.weapon, true)
                            boardAreas[0].classList.add(bot.weapon);
                            step = 0;
                        }
                        console.log(step)
                    }



                    else {
                        chickForWinner();
                        chasing(winingArray, bot)
                        if (stopFun === false) {
                            chasing(winingArray, user)
                            if (stopFun === false) {
                                winingArray.forEach(element => {
                                    if (stopFun === false) {
                                        let unChickedResult = element.filter(ele => {
                                            console.log(chickedAreas[Number(ele)])
                                            return chickedAreas[Number(ele)].chicked === false;
                                        })

                                        let botChicked = element.filter(ele => {
                                            return chickedAreas[Number(ele)].content === bot.weapon;
                                        })
                                        if (unChickedResult.length === 2 && botChicked.length === 1) {
                                            stopFun = true;
                                            areasArray[Number(unChickedResult[0])].textContent = bot.weapon;
                                            areasArray[Number(unChickedResult[0])].classList.add(bot.weapon);
                                            chickedAreas[Number(unChickedResult[0])] = BoardArea(Number(unChickedResult[0]), bot.weapon, true)
                                        }
                                    }
                                })
                            }
                        }
                        chickForWinner();
                        stopFun = false;
                    }

                }
            }
        })

    }
}


const winingArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]]
function chasing(array, player) {
    for (let i = 0; i < array.length; i++) {
        if (stopFun === false) {
            let result = array[i].filter(element => { return chickedAreas[Number(element)].content === player.weapon })
            console.log(player.weapon)
            console.log(result)
            if (result.length === 2) {
                let botMove = array[i].filter(element => { return chickedAreas[Number(element)].content === "" })
                console.log(botMove)
                if (chickedAreas[Number(botMove)].chicked === false) {
                    chickedAreas[Number(botMove)] = BoardArea(Number(botMove), bot.weapon, true)
                    areasArray[Number(botMove)].textContent = bot.weapon;
                    areasArray[Number(botMove)].classList.add(bot.weapon)
                    console.log(areasArray[Number(botMove)])
                    console.log(Number(botMove))
                    console.log(chickedAreas[Number(botMove)])
                    stopFun = true;
                }
                console.log(stopFun)

            }

        }

    }
}

function chickForWinner() {
    for (let i = 0; i < winingArray.length; i++) {
        let winner = winingArray[i].filter(element => { return chickedAreas[Number(element)].content === user.weapon })
        if (winner.length < 3) {
            winner = winingArray[i].filter(element => { return chickedAreas[Number(element)].content === bot.weapon })
            if (winner.length < 3) {
                stopFun = false
            }
            else {
                chickedAreas.map(element => { return element.chicked = true })
                winingArray[i].map(element => {
                    return areasArray[Number(element)].style.cssText = `text-shadow: 2px 2px 100px;
                    transition: 0.5s`
                })
                areasArray.map(element => {
                    if (element.textContent === user.weapon) {
                        return element.style.textContent = `text-shadow: 0.5px 0.5px 10px #FD49A0,-0.7px -0.7px 5px #ff84bf`
                    }
                })

                stopFun = true
            }
        }
        else if (winner.length === 3) {
            chickedAreas.map(element => { return element.chicked = true })
            winingArray[i].map(element => {
                return areasArray[Number(element)].style.cssText = `text-shadow: 0px 0px 0px;
                                transform: translate: 40px`
            })
            areasArray.map(element => {
                if (element.textContent === bot.weapon) {
                    return element.style.textContent = `text-shadow: 0.5px 0.5px 10px #BBE7FE,-0.7px -0.7px 5px #d2efff `
                }
            })
            stopFun = true
        }
    }
}
