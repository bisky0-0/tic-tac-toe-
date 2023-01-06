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



//styling weapons card 
let startWindow = document.getElementById("first-window");
let weaponsCard = document.getElementById("weapons");
let weapons = document.getElementsByClassName("weapon");
let userWeapon;

for (const weapon of weapons) {
    weapon.addEventListener('click', function () {
        userWeapon = weapon.id;
        console.log(userWeapon)
        weaponsCard.style.display = "none"
        startWindow.style.cssText = ` width: 0`;
        navBar.click = openBar();
    })
}

//levels 
let levels = document.getElementsByClassName("level");
let choosenLevel = "easy";

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





