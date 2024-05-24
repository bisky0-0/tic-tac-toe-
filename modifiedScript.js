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
        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        handleResultValidation();
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        boardContainer.classList.toggle('x-turn');
        boardContainer.classList.toggle('o-turn');
    }

    function checkWin(board = gameBoard) {
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
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return board.includes('') ? null : 'Draw';
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

        if (gameMode !== 'twoplayers' && currentPlayer === 'O') {
            if (gameMode === 'easy') {
                handleEasyComputerMove();
            } else if (gameMode === 'hard') {
                handleHardComputerMove();
            }
        }
    }

    function handleRestartGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        boardContainer.classList.remove('o-turn');
        boardContainer.classList.add('x-turn');

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

    function handleEasyComputerMove() {
        let availableCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        if (availableCells.length > 0) {
            let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            handleCellPlayed(boardAreas[randomIndex], randomIndex);
        }
    }

    function handleHardComputerMove() {
        let bestMove = minimax(gameBoard, 'O').index;
        handleCellPlayed(boardAreas[bestMove], bestMove);
    }

    function minimax(newBoard, player) {
        let availableCells = newBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        let winner = checkWin(newBoard);

        if (winner === 'X') {
            return { score: -10 };
        } else if (winner === 'O') {
            return { score: 10 };
        } else if (availableCells.length === 0) {
            return { score: 0 };
        }

        let moves = [];
        for (let i = 0; i < availableCells.length; i++) {
            let move = {};
            move.index = availableCells[i];
            newBoard[availableCells[i]] = player;

            if (player === 'O') {
                let result = minimax(newBoard, 'X');
                move.score = result.score;
            } else {
                let result = minimax(newBoard, 'O');
                move.score = result.score;
            }

            newBoard[availableCells[i]] = '';
            moves.push(move);
        }

        let bestMove;
        if (player === 'O') {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = moves[i];
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = moves[i];
                }
            }
        }

        return bestMove;
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
