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
let choosenLevel = "easy";
let boardEreas = document.getElementsByClassName("board-areas");


function Player(name, scores) {
    scores = 0;
    return { name, scores }
}

/*I put all logic in the weapon function because the immediatly invoked function
ake the undefined value of userWeapon before adding event to weapons */
for (const weapon of weapons) {
    weapon.addEventListener('click', function () {
        weaponsCard.style.display = "none"
        startWindow.style.cssText = ` width: 0`;
        navBar.click = openBar();
        let userWeapon = weapon.id;


        //level choosing 
        for (const level of levels) {
            level.addEventListener('click', function () {
                if (level.id == "chooseWeapon") {
                    startWindow.style.cssText = `width: 100%`;
                    weaponsCard.style.display = "flex"
                }

                else {
                    choosenLevel = level.id;
                }
                navBar.click = closeNav();
            })
        }


        //after choosing level I start putting logic
        (function game() {
            let userPlayer = Player(userWeapon, 0);
            let PlayerAI;
            if (userPlayer.name == "x") {
                PlayerAI = Player("o", 0);
            }
            else if (userPlayer.name !== "x") {
                PlayerAI = Player("x", 0)
            }

            let areasArray = []
            for (const area of boardEreas) {
                areasArray.push(area);
                if (area.textContent !== "x" || area.textContent !== "o")
                    area.addEventListener('click', function () {
                        areasArray.splice(areasArray.indexOf(area), 1);
                        area.classList.add(userPlayer.name);
                        area.textContent = userPlayer.name;



                        let random = Math.floor(Math.random() * areasArray.length);
                        console.log(areasArray.length)
                        boardEreas[random].classList.add(PlayerAI.name);
                        boardEreas[random].textContent = PlayerAI.name;
                        console.log(random)
                        areasArray.splice(areasArray.indexOf(random), 1);
                    })

            }
        })()
    })
}





