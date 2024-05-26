export let stopFun = false;
export let choosenLevel = 'easy';

export const setStopFun = (value) => {
    stopFun = value;
};

export const setLevel = (level) => {
    return choosenLevel = level;
}