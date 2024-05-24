document.addEventListener('DOMContentLoaded', () => {
    const boardAreas = document.querySelectorAll('.board-areas');
    const xScores = document.getElementById('x-scores');
    const oScores = document.getElementById('o-scores');
    const restartButton = document.getElementById('restart');
    const weapons = document.querySelectorAll('.weapon');
    const firstWindow = document.getElementById('first-window');
    const levelButtons = document.querySelectorAll('.level');
    const navIcon = document.getElementById('nav-icon');
    const closeIcon = document.getElementById('close-icon');
    const nav = document.getElementById('nav');
    const boardContainer = document.getElementById('board-container');

    let currentPlayer = 'X';
    let scores = { X: 0, O: 0 };
    let gameMode = 'twoplayers'; // Default game mode
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        boardContainer.classList.toggle('x-turn');
        boardContainer.classList.toggle('o-turn');
    }

    function checkWin() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes('') ? null : 'Draw';
    }

    function handleResultValidation() {
        const roundWin = checkWin();

        if (roundWin) {
            if (roundWin === 'Draw') {
                alert('Game is a draw!');
            } else {
                alert(`Player ${roundWin} wins!`);
                scores[roundWin]++;
                updateScores();
            }
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = Array.from(boardAreas).indexOf(clickedCell);

        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

    function handleRestartGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';

        boardAreas.forEach(cell => cell.textContent = '');
    }

    function updateScores() {
        xScores.textContent = scores.X;
        oScores.textContent = scores.O;
    }

    function handleWeaponChoice(event) {
        currentPlayer = event.target.dataset.type.toUpperCase();
        firstWindow.style.display = 'none';
    }

    function handleNavClick(event) {
        gameMode = event.target.dataset.type;
        if (gameMode === 'chooseWeapon') {
            firstWindow.style.display = 'flex';
        } else {
            handleRestartGame();
        }
        nav.style.width = '0';
        navIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }

    navIcon.addEventListener('click', () => {
        nav.style.width = '100%';
        navIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    });

    closeIcon.addEventListener('click', () => {
        nav.style.width = '0';
        navIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    });

    boardAreas.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
    weapons.forEach(weapon => weapon.addEventListener('click', handleWeaponChoice));
    levelButtons.forEach(level => level.addEventListener('click', handleNavClick));
});
