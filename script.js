//styling nav
let navIcon = document.getElementById("nav-icon")
let navBar = document.getElementById("nav");
let closeBar = document.getElementById("close-icon")

navIcon.addEventListener("click", openBar)
function openBar() {
    navBar.style.cssText = `width: 100%;
    border-bottom: 2px solid #BBE7FE;
    font-size: 1.2rem`;
    navIcon.style.display = "none";
    closeBar.style.display = "inline-block"
}

closeBar.addEventListener('click', closeNav);
function closeNav() {
    navBar.style.cssText = `width: 0;
    font-size: 0`;
    navIcon.style.display = "inline-block";
    closeBar.style.display = "none"
}



//styling weapons card and choosing weapon
let startWindow = document.getElementById("first-window");
let weaponsCard = document.getElementById("weapons");
let weapons = document.getElementsByClassName("weapon");
let levels = document.getElementsByClassName("level");
let boardEreas = document.getElementsByClassName("board-areas");
let choosenLevel = "easy";
let user;
let aiPlayer;

/*
board areas so if the tex content of them was equal the game will anounce the winner
using html classes rather than typing a lot of script here;
 */
let row1 = document.getElementsByClassName("row1")
let row2 = document.getElementsByClassName("row2")
let row3 = document.getElementsByClassName("row3")
let col1 = document.getElementsByClassName("col1")
let col2 = document.getElementsByClassName("col2")
let col3 = document.getElementsByClassName("col3")
let xrow1 = document.getElementsByClassName("xrow1")
let xrow2 = document.getElementsByClassName("xrow2")


//factory function for user and AI or other user 
function Player(name, scores) {
    scores = 0;
    return { name, scores }
}



for (const weapon of weapons) {
    weapon.addEventListener('click', function () {
        weaponsCard.style.display = "none";
        startWindow.style.cssText = ` width: 0`;
        navBar.click = openBar();
        let choosenWeapon = weapon.id;

        user = Player(choosenWeapon, 0);
        aiPlayer = user.name == "x" ? Player("o", 0) : Player("x", 0)
    })
}

for (const level of levels) {
    level.addEventListener("click", function () {
        navBar.click = closeNav();
        choosenLevel = level.id;
        levelFun();
    })
}





let areasArray = [...boardEreas]
function random() { return Math.floor(Math.random() * areasArray.length) }
//areas 
function levelFun() {
    // let aiTurn = false;
    for (const area of areasArray) {
        if (choosenLevel === "easy") {
            area.addEventListener('click', function () {
                if (!area.classList.contains("chicked")) {
                    area.textContent = user.name;
                    area.classList.add(`${user.name}`, "chicked");
                    area.style.cssText = `transition: 0s; text-shadow: none`
                    areasArray.splice(areasArray.indexOf(area), 1);
                    comparing();

                    //Ai turn
                    if (areasArray.length > 1) {
                        let randomNum = random();
                        areasArray[randomNum].textContent = aiPlayer.name;
                        console.log(randomNum)
                        areasArray[randomNum].classList.add(`${aiPlayer.name}`, "chicked")
                        areasArray[randomNum].style.cssText = `transition: 2s; text-shadow: none`
                        areasArray.splice(randomNum, 1);
                        comparing();
                    }
                }
            })

        }
    }
}

let resultWindow = document.getElementById("result-window");
let resultCard = document.getElementById("result-card");
let winner = document.getElementById("winner");
let restart = document.getElementById("restart");

function checkTextByClassName(classNameTags) {
    if (classNameTags[0].textContent !== "" && classNameTags[0].textContent == classNameTags[1].textContent &&
        classNameTags[1].textContent == classNameTags[2].textContent) {
        classNameTags[0].style.cssText = `text-shadow: 1px 1px 40px #fff; transition: 3s`
        classNameTags[1].style.cssText = `text-shadow: 1px 1px 40px #fff; transition: 3s`
        classNameTags[2].style.cssText = `text-shadow: 1px 1px 40px #fff; transition: 3s`
        resultWindow.style.cssText = `width: 100%;
        height: 100%;
        animation-delay: 4s`;
        resultCard.style.cssText = `width: 340px;
        height: 340px;
        font-size: 2rem`;
        winner.classList.add(`${classNameTags[0].textContent}`)
        winner.style.fontSize = '8rem'
        winner.textContent = `${classNameTags[0].textContent}`
        restart.style.cssText = `width: 160px; height: 40px; font-size: 1.3rem`
    }
}

restart.addEventListener('click', function () {
    resultWindow.style.cssText = `width: 0;
    height: 0;
    animation-delay: 1`;
    resultCard.style.cssText = `width: 0;
    height: 0;
    font-size: 0`;
    winner.style.fontSize = `0`
    restart.style.cssText = `width: 0; height: 0; font-size: 0`
    openBar()
})

function comparing() {
    checkTextByClassName(row1)
    checkTextByClassName(row2)
    checkTextByClassName(row3)
    checkTextByClassName(col1)
    checkTextByClassName(col2)
    checkTextByClassName(col3)
    checkTextByClassName(xrow1)
    checkTextByClassName(xrow2)
}



