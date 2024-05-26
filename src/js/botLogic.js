import { updateBoardArea, findBoardAreaIndex } from './board.js';
import { random } from './utils.js';
import { areasArray } from './board.js';
import { checkForWinner, winningArray } from './winner.js';
import { user, bot } from './game.js';
import { chickedAreas } from './board.js';
import { boardAreas } from './domElements.js';
import { setStopFun } from './state.js';

export const userMove = (area, i, user) => {
    area.textContent = user.weapon;
    area.classList.add(user.weapon);
    updateBoardArea(i, user.weapon, true);
    areasArray = areasArray.filter(a => a !== area);
    checkForWinner(user, bot);
};

export const botMove = (bot) => {
    let randomNum = random(areasArray.length);
    let botMoveArea = areasArray[randomNum];
    const index = findBoardAreaIndex(botMoveArea);
    botMoveArea.textContent = bot.weapon;
    botMoveArea.classList.add(bot.weapon);
    updateBoardArea(index, bot.weapon, true);
    areasArray = areasArray.filter(a => a !== botMoveArea);
    checkForWinner(user, bot);
};

export const firstBotMove = (bot) => {
    if (!chickedAreas[4].chicked) {
        updateBoardArea(4, bot.weapon, true);
        boardAreas[4].textContent = bot.weapon;
        boardAreas[4].classList.add(bot.weapon);
    } else {
        updateBoardArea(0, bot.weapon, true);
        boardAreas[0].textContent = bot.weapon;
        boardAreas[0].classList.add(bot.weapon);
    }
};

export const makeRandomMove = (bot) => {
    for (let ele of winningArray.flat()) {
        if (!chickedAreas[ele].chicked) {
            updateBoardArea(ele, bot.weapon, true);
            boardAreas[ele].textContent = bot.weapon;
            boardAreas[ele].classList.add(bot.weapon);
            setStopFun(true);
            break;
        }
    }
};
