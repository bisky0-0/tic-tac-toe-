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
let choosenWeapon;
let user;
let bot;
let oScore = document.getElementById("o-scores");
let xScore = document.getElementById("x-scores");
let restart = document.getElementById("restart")

//factory function for USER and the BOT-------and board areas---->>>>
function Player(name, weapon, score) {
    return { name, weapon, score }
}

function BoardArea(number, content, chicked) {
    return { number, content, chicked }
}


//choosing a weapon
for (const weapon of weapons) {
    weapon.addEventListener('click', function () {
        weaponsWindow.style.cssText = `display: none`;
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


//I used chicked areas so I can chick for winners later, but areasArray is for textContent and classList----
//for HTML elements, because textContent and classList can't be attached to objects of ChickedAreas Array---
//so I had to make an array only for HTML elements 
let chickedAreas = [...boardAreas]
let areasArray = [...boardAreas]
let completeAreasArray;

function closeNav() {
    navBar.style.cssText = `width: 0; font-size: 0rem`;
    openIcon.style.display = 'block';
    closeIcon.style.display = 'none';
}

//stop Function variable is so important here, it helps me to check which step I should take in----
//the hard level which more complex than any level
//step variable is to check if it's the it's the first step for the bot or not
//num variable is to chick if the number is even or odd to see who will play the user or the bot on the two players level
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
                area.classList.remove("x", "o")
                area.chicked = false;
            }
            console.log(choosenLevel)
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
                console.log("choose weapon")
                weaponsWindow.style.cssText = `display: flex`;
            }

            completeAreasArray.map(ele => {
                return ele.style.cssText = `text-shadow: none`
            })

            xScore.textContent = "0";
            oScore.textContent = '0';
        })
    }
})()

openIcon.addEventListener('click', openNav);
closeIcon.addEventListener('click', closeNav);




let random = (num) => { return Math.floor(Math.random() * num) }
function game() {
    for (let i = 0; i < boardAreas.length; i++) {
        chickedAreas[i] = BoardArea(i, "", false)
        areasArray[i].addEventListener('click', function () {
            area = boardAreas[i];


            if (choosenLevel === "twoplayers") {
                if (chickedAreas[i].chicked === false) {
                    if (num % 2 === 0 || num === 0) {
                        area.textContent = user.weapon;
                        chickedAreas[i] = BoardArea(i, user.weapon, true)
                        area.classList.add(user.weapon)
                        num++
                        chickForWinner()
                    }

                    else {
                        area.textContent = bot.weapon;
                        chickedAreas[i] = BoardArea(i, bot.weapon, true)
                        area.classList.add(bot.weapon)
                        num++
                        chickForWinner()
                    }
                }
            }


            else if (choosenLevel === "easy") {
                if (chickedAreas[i].chicked === false) {
                    area.textContent = user.weapon;
                    area.classList.add(user.weapon);
                    areasArray.splice(areasArray.indexOf(area), 1);
                    chickedAreas[i] = BoardArea(i, user.weapon, true)
                    chickForWinner()


                    console.log(stopFun)
                    //bot turn 
                    if (stopFun === false) {
                        let randomNum = random(areasArray.length);
                        if (areasArray.length > 0) {
                            console.log(randomNum)
                            areasArray[randomNum].textContent = bot.weapon;
                            areasArray[randomNum].classList.add(bot.weapon);
                            chickedAreas[randomNum - (areasArray.length - (2 * i))] = BoardArea(randomNum - (areasArray.length - (2 * i)), bot.weapon, true)
                            areasArray.splice(randomNum, 1)
                            chickForWinner()
                        }
                    }
                }
            }

            else if (choosenLevel === "hard") {
                console.log(step)
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
                        //after every move from the user or the Bot the ptogram would search if anyone of them win the game
                        chickForWinner();

                        chasing(winingArray, bot)


                        //stopFun would be false if ther's no area bot would win if it choose, so the program would search for an area which 
                        //the user can win
                        if (stopFun === false) {
                            chasing(winingArray, user)

                            //stopFun would still be false if there's no whare the user can win in
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

                                if (stopFun === false) {
                                    stopFun = true;
                                    let unChicked = chickedAreas.filter(ele => { return ele.chicked === false })
                                    console.log(unChicked)
                                    areasArray[Number(unChicked[0].number)].textContent = bot.weapon;
                                    areasArray[Number(unChicked[0].number)].classList.add(bot.weapon);
                                    chickedAreas[Number(unChicked[0].number)] = BoardArea((Number(unChicked[0])), bot.weapon, true)
                                }
                            }


                        }

                        chickForWinner();

                        //reassign stopFun to false so the game would be completed 
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
                    stopFun = true;
                }
            }
        }
    }
}

function chickForWinner() {
    completeAreasArray = [...boardAreas];
    console.log(completeAreasArray)
    for (let i = 0; i < winingArray.length; i++) {
        let winner = winingArray[i].filter(element => { return chickedAreas[Number(element)].content === user.weapon })
        if (winner.length < 3) {
            winner = winingArray[i].filter(element => { return chickedAreas[Number(element)].content === bot.weapon })
            if (winner.length < 3) {
                stopFun = false
            }
            else {
                oScore.textContent = Number(oScore.textContent) + 1
                chickedAreas.map(element => { return element.chicked = true })
                winingArray[i].map(element => {
                    console.log(Number(element))
                    return completeAreasArray[Number(element)].style.cssText = `animation: anim-popoutin 0.5s linear 0s 5 alternate;
                    text-shadow: 1px 1px 60px #fff`

                })
                completeAreasArray.map(element => {
                    if (element.textContent === user.weapon) {

                        return element.style.textContent = `text-shadow: 0.5px 0.5px 10px #FD49A0,-0.7px -0.7px 5px #ff84bf`
                    }
                })
                stopFun = true
            }
        }
        else if (winner.length === 3) {
            xScore.textContent = Number(xScore.textContent) + 1
            chickedAreas.map(element => { return element.chicked = true })
            winingArray[i].map(element => {
                return completeAreasArray[Number(element)].style.cssText = `animation: anim-popoutin 0.5s linear 0s 5 alternate ;`
            })
            completeAreasArray.map(element => {
                if (element.textContent === bot.weapon) {
                    return element.style.textContent = `text-shadow: 0.5px 0.5px 10px #BBE7FE,-0.7px -0.7px 5px #d2efff `
                }
            })
            stopFun = true
        }
    }
}


restart.addEventListener('click', function () {
    for (const area of boardAreas) {
        area.textContent = "";
        area.classList.remove("x", "o")
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
        console.log("choose weapon")
        weaponsWindow.style.cssText = `display: flex`;
    }

    completeAreasArray.map(ele => {
        return ele.style.cssText = `text-shadow: none`
    })
}
