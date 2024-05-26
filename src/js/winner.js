import { chickedAreas, updateBoardArea, completeAreasArray } from './board.js';
import { boardAreas, oScore, xScore } from './domElements.js';
import { stopFun, setStopFun } from './state.js';
import { bot } from './game.js';

export const winningArray = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 4, 8], [0, 3, 6], [1, 4, 7],
    [2, 5, 8], [2, 4, 6]
];

export const chasing = (array, player) => {
    array.forEach(pattern => {
        if (!stopFun) {
            let result = pattern.filter(index => chickedAreas[index].content === player.weapon);
            if (result.length === 2) {
                let botMove = pattern.find(index => chickedAreas[index].content === "");
                if (botMove !== undefined && !chickedAreas[botMove].chicked) {
                    updateBoardArea(botMove, bot.weapon, true);
                    boardAreas[botMove].textContent = bot.weapon;
                    boardAreas[botMove].classList.add(bot.weapon);
                    setStopFun(true);
                }
            }
        }
    });
};

export const checkForWinner = (user, bot) => {
    completeAreasArray = Array.from(boardAreas);
    winningArray.forEach(pattern => {
        let userWin = pattern.every(index => chickedAreas[index].content === user.weapon);
        let botWin = pattern.every(index => chickedAreas[index].content === bot.weapon);

        if (userWin || botWin) {
            setStopFun(true);
            pattern.forEach(index => {
                completeAreasArray[index].style.cssText = `
                    animation: anim-popoutin 0.5s linear 0s 5 alternate;
                    text-shadow: 1px 1px 60px #fff
                `;
            });
            if (userWin) {
                user.score++;
                xScore.textContent = user.score;
                styleWinnerElements(bot.weapon);
                setTimeout(() => {
                    alert('You Won!')
                }, 2000)
            } else {
                bot.score++;
                oScore.textContent = bot.score;
                styleWinnerElements(user.weapon);
                setTimeout(() => {
                    alert(`Bot Won!, you're a shame to humanity!`)
                }, 2000)
            }
            chickedAreas.forEach(area => area.chicked = true);
        }
    });

    if (!stopFun && chickedAreas.every(area => area.chicked)) {
        stopFun = true;
        setTimeout(() => {
            alert(`It's a draw!`);
        }, 300)
    }
};

const styleWinnerElements = (loserWeapon) => {
    completeAreasArray.forEach(element => {
        if (element.textContent === loserWeapon) {
            element.style.cssText = `
                text-shadow: 0.5px 0.5px 10px ${loserWeapon === "x" ?
                    "#FD49A0,-0.7px -0.7px 5px #ff84bf" : "#BBE7FE,-0.7px -0.7px 5px #d2efff"}
            `;
        }
    });
};
