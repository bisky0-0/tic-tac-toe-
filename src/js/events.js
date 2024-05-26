import { resetBoardAreas } from './board.js';

export const openNav = () => {
    document.getElementById("nav").style.cssText = "width: 100%; font-size: 1rem";
    document.getElementById("nav-icon").style.display = 'none';
    document.getElementById("close-icon").style.display = 'block';
};

export const closeNav = () => {
    document.getElementById("nav").style.cssText = "width: 0; font-size: 0rem";
    document.getElementById("nav-icon").style.display = 'block';
    document.getElementById("close-icon").style.display = 'none';
};

export const resetBoard = () => {
    resetBoardAreas();
};
