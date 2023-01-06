//styling nav

let navIcon = document.getElementById("nav-icon")
let navBar = document.getElementById("nav");
let closeBar = document.getElementById("close-icon")

navIcon.addEventListener("click", function () {
    navBar.style.cssText = `width: 100%;
    border: 1px solid #BBE7FE;
    border-left: none;
    font-size: 1.2rem`;
    navIcon.style.display = "none";
    closeBar.style.display = "inline-block"
})

closeBar.addEventListener('click', function () {
    navBar.style.cssText = `width: 0;
    font-size: 0`;
    navIcon.style.display = "inline-block";
    closeBar.style.display = "none"
})

