import { initializeGameModes } from './gameModes.js';
import { resetBoard, closeNav, openNav } from './events.js';
import { Player } from './player.js';
import { choosenLevel, setLevel } from './state.js';

let choosenWeapon;
export let user;
export let bot;

export const initializeGame = () => {
    Array.from(document.getElementsByClassName("weapon")).forEach(weapon => {
        weapon.addEventListener('click', () => {
            document.getElementById("first-window").style.display = "none";
            openNav();
            choosenWeapon = weapon.dataset.type;
            user = Player(choosenWeapon, choosenWeapon, 0);
            bot = Player(user.weapon === "x" ? "o" : "x", user.weapon === "x" ? "o" : "x", 0);
        });
    });

    Array.from(document.getElementsByClassName("level")).forEach(level => {
        level.addEventListener('click', () => {
            console.log(level.dataset.type)
            setLevel(level.dataset.type);
            console.log(choosenLevel)
            resetBoard();
            closeNav();
            initializeGameModes(user, bot);
            if (choosenLevel === "chooseWeapon") {
                document.getElementById("first-window").style.display = "flex";
            }
        });
    });

    resetBoard();
    document.getElementById("x-scores").textContent = "0";
    document.getElementById("o-scores").textContent = "0";
};
