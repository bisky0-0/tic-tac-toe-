import { handleTwoPlayers, handleEasyMode, handleHardMode } from './moves.js';
import { chickedAreas, BoardArea } from './board.js';
import { choosenLevel } from './state.js';

export const initializeGameModes = (user, bot) => {
    console.log(choosenLevel)
    Array.from(document.getElementsByClassName("board-areas")).forEach((area, i) => {
        chickedAreas[i] = BoardArea(i, "", false);
        area.addEventListener('click', () => {
            console.log(choosenLevel)
            if (chickedAreas[i].chicked) return;
            if (choosenLevel === "twoplayers") {
                handleTwoPlayers(area, i, user, bot);
            } else if (choosenLevel === "easy") {
                handleEasyMode(area, i, user, bot);
            } else if (choosenLevel === "hard") {
                handleHardMode(area, i, user, bot);
            }
        });
    });
};
