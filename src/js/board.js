import { setStopFun } from "./state";
export const BoardArea = (number, content, chicked) => ({ number, content, chicked });

export const chickedAreas = Array.from(document.getElementsByClassName("board-areas"));
export let areasArray = Array.from(document.getElementsByClassName("board-areas"));
export let completeAreasArray;


export const resetBoardAreas = () => {
    setStopFun(false)
    chickedAreas.forEach((area) => {
        area.content = '';
        area.chicked = false
    });

    areasArray = Array.from(document.getElementsByClassName("board-areas"));

    Array.from(document.getElementsByClassName("board-areas")).forEach(area => {
        area.classList.remove('x', 'o')
        area.textContent = '';
        area.style.animation = '';
        area.style.textShadow = ''
    })
};

export const updateBoardArea = (index, content, isChicked) => {
    chickedAreas[index] = BoardArea(index, content, isChicked);
};

export const findBoardAreaIndex = (elem) => {
    return Array.from(document.getElementsByClassName("board-areas")).
        findIndex(area => area.dataset.key === elem.dataset.key);
};
