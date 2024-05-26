import { userMove, botMove, firstBotMove, makeRandomMove } from './botLogic.js';
import { checkForWinner, chasing, winningArray } from './winner.js';
import { updateBoardArea, chickedAreas, areasArray } from './board.js';
import { setStopFun, stopFun } from './state.js';

let num = 0;
let step = 1;

export const handleTwoPlayers = (area, i, user, bot) => {
    if (!chickedAreas[i].chicked) {
        // Alternate between the two players based on the turn number
        const currentPlayer = (num % 2 === 0) ? user : bot;
        area.textContent = currentPlayer.weapon;
        updateBoardArea(i, currentPlayer.weapon, true);
        area.classList.add(currentPlayer.weapon);
        num++;
        checkForWinner(user, bot);
    }
};


export const handleEasyMode = (area, i, user, bot) => {
    console.log('easy')
    if (!chickedAreas[i].chicked) {
        userMove(area, i, user);
        if (!stopFun && areasArray.length > 0) {
            botMove(bot);
        }
    }
};

export const handleHardMode = (area, i, user, bot) => {
    console.log('hard')
    if (!chickedAreas[i].chicked) {
        userMove(area, i, user);
        if (step === 1) {
            firstBotMove(bot);
            step = 0;
        } else {
            checkForWinner(user, bot);
            chasing(winningArray, bot);
            if (!stopFun) chasing(winningArray, user);
            if (!stopFun) makeRandomMove(bot);
            checkForWinner(user, bot);
            setStopFun(false);
        }
    }
};
