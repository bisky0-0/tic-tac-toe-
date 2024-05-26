import { user, bot } from './game.js';
import { winningArray as winCombos } from './winner.js';

export const minimax = (newBoard, player) => {
    const availSpots = emptyIndices(newBoard);

    if (checkWin(newBoard, user)) {
        return { score: -10 };
    } else if (checkWin(newBoard, bot)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < availSpots.length; i++) {
        const move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player.weapon;

        if (player == bot) {
            const result = minimax(newBoard, user);
            move.score = result.score;
        } else {
            const result = minimax(newBoard, bot);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    let bestMove;
    if (player === bot) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
};

const emptyIndices = (board) => {
    return board.filter(s => s !== "O" && s !== "X");
};

const checkWin = (board, player) => {
    let plays = board.reduce((a, e, i) => (e === player.weapon) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
    return gameWon;
};
