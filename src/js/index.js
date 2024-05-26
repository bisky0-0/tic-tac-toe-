import { openNav, closeNav, resetBoard } from './events.js';
import { initializeGame } from './game.js';

document.getElementById("nav-icon").addEventListener('click', openNav);
document.getElementById("close-icon").addEventListener('click', closeNav);
document.getElementById("restart").addEventListener('click', resetBoard);

initializeGame();
