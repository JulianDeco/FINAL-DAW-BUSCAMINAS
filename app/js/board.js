'use strict';

// Se formatean minutes y segundos a dos digitos cada uno
// Ejemplo minuto 5 transformado a 05
function formatTwoDigits(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
}

//Funcion que crea el objeto celda
function createCell(row, column, opened, flagged, mined, neighborMineCount) {
	return {
		row: row,
		column: column,
		opened: opened,
		flagged: flagged,
		mined: mined,
		neighborMineCount: neighborMineCount,
	};
}

//Funcion para asignar aleatoriamente minas al tablero
function randomlyAssignMines(gameBoard, minesCount, boardSize) {
	var minesPlaced = 0;
	//loop hasta que genera la cantidad de minas correspondientes
	while (minesPlaced < minesCount) {
		//genera una fila aleatoria para alojar una mina
		var randomRow = Math.floor(Math.random() * boardSize);
		//genera una columna aleatoria para alojar una mina
		var randomCol = Math.floor(Math.random() * boardSize);
		//verifica que la columna y la fila generadas (la celda) tiene una mina
		if (!gameBoard[randomRow][randomCol].mined) {
			gameBoard[randomRow][randomCol].mined = true;
			minesPlaced++;
		}
	}

	gameVar.bomb = minesPlaced;
	gameVar.flags = gameVar.bomb;
	return gameBoard;
}

function countMinesAroundCell(gameBoard, boardSize, row, col) {
	var countMines = 0;

	// Verifica las 8 celdas alrededor exceptuando las que esta fuera del tablero
	for (
		var r = Math.max(0, row - 1);
		r <= Math.min(boardSize - 1, row + 1);
		r++
	) {
		for (
			var c = Math.max(0, col - 1);
			c <= Math.min(boardSize - 1, col + 1);
			c++
		) {
			// Evita la celda actual
			if (r === row && c === col) continue;

			if (gameBoard[r][c].mined) {
				countMines++;
			}
		}
	}
	return countMines;
}
function countAdjacentMines(gameBoard, boardSize) {
	// Calcula minas adyacentes para cada celda
	for (var row = 0; row < boardSize; row++) {
		for (var col = 0; col < boardSize; col++) {
			if (!gameBoard[row][col].mined) {
				gameBoard[row][col].neighborMineCount = countMinesAroundCell(
					gameBoard,
					boardSize,
					row,
					col
				);
			}
		}
	}
	return gameBoard;
}

function flagHandlerCountHtml() {
	var flag_html = document.getElementById('stat-value-flags');
	flag_html.textContent = gameVar.flags;
}

function mineHandlerCountHtml() {
	var mines_html = document.getElementById('stat-value-remaining');
	mines_html.textContent = gameVar.minesCount;
}
//Funcion que se encarga de crear el tablero
function createBoard(boardSize, minesCount) {
	for (var row = 0; row < boardSize; row++) {
		gameBoard[row] = [];
		for (var column = 0; column < boardSize; column++) {
			gameBoard[row][column] = createCell(
				row,
				column,
				false,
				false,
				false,
				0
			);
		}
	}

	gameBoard = randomlyAssignMines(gameBoard, minesCount, boardSize);
	gameBoard = countAdjacentMines(gameBoard, boardSize);
	flagHandlerCountHtml();
	mineHandlerCountHtml();
	return gameBoard;
}

function adjustBoardSize(boardSize) {
	var gameBoard = document.querySelector('.game-board');
	var width = boardSize * 2.5;
	gameBoard.style.maxWidth = `${width}rem`;
}

function renderBoard(boardSize) {
	var gameBoardContainer = document.querySelector('.game-board');
	while (gameBoardContainer.firstChild) {
		gameBoardContainer.removeChild(gameBoardContainer.firstChild);
	}

	for (var row = 0; row < boardSize; row++) {
		for (var col = 0; col < boardSize; col++) {
			var container = document.createElement('div');
			container.className = 'cell-container';
			container.setAttribute('data-row', row);
			container.setAttribute('data-col', col);

			var button = document.createElement('button');
			button.className = 'cell-btn';

			var img = document.createElement('img');
			img.src = './app/img/tile.png';
			img.alt = 'Celda';
			img.className = 'cell-img';

			button.appendChild(img);
			container.appendChild(button);
			gameBoardContainer.appendChild(container);
		}
	}
}

// Handler del timer que se ejecuta una vez presionada alguna celda tanto con click izquierdo como derecho
function timeHandler() {
	var timerHtml = document.getElementById('stat-value-time');

	timer =
		formatTwoDigits(gameVar.minutes) +
		':' +
		formatTwoDigits(gameVar.seconds);
	timerHtml.textContent = timer;
	if (gameVar.seconds == 59) {
		gameVar.minutes += 1;
		gameVar.seconds = 0;
		return;
	}
	gameVar.seconds += 1;
}

function gameLose(gameBoard) {
	//Frena el contador
	clearInterval(timeInterval);
	//Llama a la funcion para revelear el resto de minas en el tablero
	revealAllMines(gameBoard);
	//Cambia la imagen del boton de reset
	revealResetFace('Loose');

	gameVar.gameStarted = false;
	//Reiniciamos timer
	gameVar.minutes = 0;
	gameVar.seconds = 0;
	timeHandler();
}

function updateCellImage(gameBoard, row, col, originalClick) {
	var boardCell = gameBoard[row][col];
	var cellElement = document.querySelector(
		'.cell-container[data-row="' +
			boardCell.row +
			'"][data-col="' +
			boardCell.column +
			'"]'
	);
	var img = cellElement.querySelector('img');
	//Es por la recusion que se vuelve a comprobar
	if (!boardCell.opened && !boardCell.flagged) {
		if (boardCell.mined && originalClick) {
			gameLose(gameBoard);
			return false;
		} else if (boardCell.neighborMineCount > 0) {
			var numberImgMap = {
				1: './app/img/number_one.png',
				2: './app/img/number_two.png',
				3: './app/img/number_three.png',
				4: './app/img/number_four.png',
				5: './app/img/number_five.png',
				6: './app/img/number_six.png',
				7: './app/img/number_seven.png',
				8: './app/img/number_eight.png',
			};
			img.src = numberImgMap[boardCell.neighborMineCount];
			gameBoard[row][col].opened = true;
			return false;
		} else if (boardCell.mined === true) return false;
		else {
			img.src = './app/img/opened_tile.png';
			gameBoard[row][col].opened = true;
			return true;
		}
	} else {
		return false;
	}
}
function revealCell(gameBoard, row, col, originalClick) {
	if (gameVar.gameOver) {
		return;
	} else if (
		row < 0 ||
		row >= gameVar.boardSize ||
		col < 0 ||
		col >= gameVar.boardSize
	) {
		return;
	}

	var shouldContinue = updateCellImage(gameBoard, row, col, originalClick);

	if (!shouldContinue) {
		return;
	}
	// Expansión recursiva en todas las direcciones (8 celdas alrededor)
	for (var r = row - 1; r <= row + 1; r++) {
		for (var c = col - 1; c <= col + 1; c++) {
			// No procesar la celda actual otra vez
			if (r === row && c === col) continue;

			revealCell(gameBoard, r, c, false); // Llamada recursiva
		}
	}
}

function revealResetFace(smileyFace) {
	var faceReset = document.querySelector('.game-reset');
	var faceImg = faceReset.querySelector('img');
	switch (smileyFace) {
		case 'Loose':
			gameVar.gameOver = true;
			faceImg.src = './app/img/sad-face.png';
			break;
		case 'Smiley':
			gameVar.gameOver = false;
			faceImg.src = './app/img/smiley-face.png';
			break;
		case 'Win':
			gameVar.gameOver = true;
			faceImg.src = './app/img/cool-face.png';
			break;
		default:
			break;
	}
}
//Recorre el tablero y descubre todas las minas
function revealAllMines(gameBoard) {
	for (let row = 0; row < gameVar.boardSize; row++) {
		for (let col = 0; col < gameVar.boardSize; col++) {
			var boardCell = gameBoard[row][col];
			if (boardCell.mined) {
				var cellElement = document.querySelector(
					'.cell-container[data-row="' +
						boardCell.row +
						'"][data-col="' +
						boardCell.column +
						'"]'
				);
				var img = cellElement.querySelector('img');
				img.src = './app/img/bomb.png';
				boardCell.opened = true;
			}
		}
	}
}

function timeToSeconds(time) {
	if (!time || typeof time !== 'string') return 0;
	var parts = time.split(':');
	if (parts.length !== 2) return 0;
	return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
}

// Función para ordenar records por tiempo (de menor a mayor)
function sortRecordsByTime(records) {
	return records.sort(function (a, b) {
		return timeToSeconds(a.time) - timeToSeconds(b.time);
	});
}

function saveWinRecords(nicName) {
	if (!timer || typeof timer !== 'string') {
		console.error('Timer no está definido o no es string');
		return;
	}

	var now = new Date();
	var record = {
		name: nicName,
		date: now.toISOString(),
		time: timer,
		difficulty: gameVar.difficulty,
	};

	var existingRecords = JSON.parse(localStorage.getItem('winRecords')) || [];

	existingRecords.push(record);
	// Se guardan en local storage ya ordenados
	var orderedRecords = sortRecordsByTime(existingRecords);
	localStorage.setItem('winRecords', JSON.stringify(orderedRecords));
	showRecordsModal('all');
	return;
}

function showRecordsModal(difficulty) {
	var modal = document.getElementById('records-modal');
	var records = JSON.parse(localStorage.getItem('winRecords')) || [];
	modal.classList.remove('hidden');

	var filteredRecords;
	// filtra por dificultad en caso que no sea all
	if (difficulty !== 'all') {
		filteredRecords = records.filter(function (r) {
			return r.difficulty === difficulty;
		});
	} else {
		filteredRecords = records;
	}

	var html = `
        <div class="records-header">
            <span>Pos.</span>
            <span>Nombre</span>
            <span>Tiempo</span>
            <span>Fecha</span>
        </div>`;

	if (filteredRecords.length === 0) {
		html += '<p>No hay records aún</p>';
	} else {
		for (var i = 0; i < filteredRecords.length; i++) {
			var record = filteredRecords[i];
			var date = new Date(record.date).toLocaleDateString();
			html +=
				'<div class="record-item">' +
				'<span class="record-position">' +
				(i + 1) +
				'</span>' +
				'<span>' +
				record.name +
				'</span>' +
				'<span>' +
				record.time +
				'</span>' +
				'<span>' +
				date +
				'</span>' +
				'</div>';
		}
	}
	document.getElementById('records-table').innerHTML = html;

	// Event listeners para los selectores de ranking
	var tabs = document.querySelectorAll('.tab');
	tabs.forEach(function (tab) {
		tab.addEventListener('click', function () {
			tabs.forEach(function (t) {
				t.classList.remove('active');
			});
			this.classList.add('active');
			showRecordsModal(this.getAttribute('data-difficulty'));
		});
	});

	//Boton de close
	var closeRecord = document.getElementById('close-record-modal');
	closeRecord.addEventListener('click', function () {
		document.getElementById('records-modal').classList.add('hidden');
		resetBoard();
		initGame();
	});
}

function showWinModal() {
	var modal = document.getElementById('win-modal');
	modal.classList.remove('hidden');
}

function gameWin() {
	gameVar.gameOver = true;
	clearInterval(timeInterval);
	revealResetFace('Win');
	showWinModal();
}

function checkWin(gameBoard) {
	for (var row = 0; row < gameVar.boardSize; row++) {
		for (var col = 0; col < gameVar.boardSize; col++) {
			var cell = gameBoard[row][col];
			if (!cell.mined && !cell.opened) {
				return;
			}
		}
	}
	gameWin();
}

function resetBoard() {
	var cells = document.querySelectorAll('.cell-img');
	for (var i = 0; i < cells.length; i++) {
		cells[i].src = './app/img/tile.png';
	}
	clearInterval(timeInterval);
	revealResetFace('Smiley');
	gameVar.gameStarted = false;
	//Reiniciamos timer
	gameVar.minutes = 0;
	gameVar.seconds = 0;
	timeHandler();
}
function setDifficulty(difficulty) {
	switch (difficulty) {
		case 'easy':
			gameVar.boardSize = 8;
			gameVar.minesCount = 10;
			gameVar.difficulty = 'easy';
			adjustBoardSize(gameVar.boardSize);
			break;
		case 'medium':
			gameVar.boardSize = 12;
			gameVar.minesCount = 25;
			gameVar.difficulty = 'medium';
			adjustBoardSize(gameVar.boardSize);
			break;
		case 'hard':
			gameVar.boardSize = 16;
			gameVar.minesCount = 40;
			gameVar.difficulty = 'hard';
			adjustBoardSize(gameVar.boardSize);
			break;
		default:
			break;
	}
}
// Funcion que maneja el click y eventos segun los estados de la celda
function leftClick(e, gameBoard) {
	// Buscamos el elemento con clase cell-container más cercano para extraer row y column
	var container = e.target.closest('.cell-container');
	var row = container.dataset.row;
	var col = container.dataset.col;
	// Comprobar si el juego ya inicio
	if (gameVar.gameStarted === false && gameVar.gameOver === false) {
		gameVar.gameStarted = true;
		if (timeInterval) {
			clearInterval(timeInterval);
		}
		timeInterval = setInterval(timeHandler, 1000);
	}

	if (gameBoard[row][col].flagged === true) return;

	if (!gameBoard[row][col].opened) {
		var originalClick = true;
		revealCell(gameBoard, row, col, originalClick);
	} else if (gameBoard[row][col].neighborMineCount > 0) {
		handleChordClick(gameBoard, gameVar.boardSize, row, col);
	}
	checkWin(gameBoard);
}

function rightClick(e, gameBoard) {
	var container = e.target.closest('.cell-container');
	var row = container.dataset.row;
	var col = container.dataset.col;

	var gameBoardCell = gameBoard[row][col];

	// Comprobar si el juego ya inicio
	if (gameVar.gameStarted === false && gameVar.gameOver === false) {
		gameVar.gameStarted = true;
		if (timeInterval) {
			clearInterval(timeInterval);
		}
		timeInterval = setInterval(timeHandler, 1000);
	}

	if (gameVar.gameOver === true) return;

	if (gameBoardCell.opened === true) return;

	if (gameBoardCell.flagged === false) {
		// Logica de celda sin bandera
		e.target.src = './app/img/flag.png';
		gameBoardCell.flagged = true;
		// Se resta una flag
		gameVar.flags = gameVar.flags - 1;
		flagHandlerCountHtml();
		checkWin(gameBoard);
		return;
	}

	if (gameBoardCell.flagged === true) {
		// Logica de celda con bandera
		e.target.src = './app/img/tile.png';
		gameBoardCell.flagged = false;
		// Se suma una flag
		gameVar.flags = gameVar.flags + 1;
		flagHandlerCountHtml();
		return;
	}
}
// Funcion que asigna listeners de click a cada celda
function addClickListenerToCells(gameBoard) {
	// Recuperamos todas las celdas
	var cells = document.getElementsByClassName('cell-container');
	// Recorremos las celdas
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		// Asignamos el evento de click izquierdo a cada celda
		cell.addEventListener('click', function (e) {
			// Pasamos como parametro el evento y el tablero
			leftClick(e, gameBoard);
		});
		// Asignamos el evento de click derecho a cada celda
		cell.addEventListener('contextmenu', function (e) {
			e.preventDefault();
			// Pasamos como parametro el evento y el tablero
			rightClick(e, gameBoard);
		});
	}
}
function addEventListenerToSpaceKey() {
	document.addEventListener('keydown', function (e) {
		if (e.keyCode === 32) {
			e.preventDefault();
			flagHandlerCountHtml();
			resetBoard();
			gameBoard = createBoard(gameVar.boardSize, gameVar.minesCount);
		}
	});
}
function addClickListenerToModal() {
	var closeBtn = document.getElementById('close-modal-close');
	closeBtn.addEventListener('click', function () {
		document.getElementById('win-modal').classList.add('hidden');
		resetBoard();
		initGame();
	});
	var okBtn = document.getElementById('close-modal-ok');
	okBtn.addEventListener('click', function () {
		document.getElementById('win-modal').classList.add('hidden');
		var nicName = document.getElementById('nic-name');
		saveWinRecords(nicName.value);
	});
}

function addClickListenerToButtonFace() {
	var faceResetButton = document.querySelector('.start-reset-btn');
	faceResetButton.addEventListener('click', function (e) {
		gameVar.flags = gameVar.minesCount;
		flagHandlerCountHtml();
		resetBoard();
		gameBoard = createBoard(gameVar.boardSize, gameVar.minesCount);
	});
	revealResetFace('Smiley');
}

function addClickListenerToButtonRanking() {
	var buttonRanking = document.getElementById('show-ranking-btn');
	buttonRanking.addEventListener('click', function () {
		showRecordsModal('all');
	});
}

function handleChordClick(gameBoard, boardSize, row, col) {
    row = parseInt(row);
    col = parseInt(col);
    
    var cell = gameBoard[row][col];

    var flagCount = 0;
    var hasIncorrectFlag = false;
    var cellsToReveal = [];

    // Definir los límites exactos del área 3x3
    var startRow = Math.max(0, row - 1);
    var endRow = Math.min(boardSize - 1, row + 1);
    var startCol = Math.max(0, col - 1);
    var endCol = Math.min(boardSize - 1, col + 1);

    for (var r = startRow; r <= endRow; r++) {
        for (var c = startCol; c <= endCol; c++) {
            if (r === row && c === col) continue;
            
            var adjacentCell = gameBoard[r][c];
            
            if (adjacentCell.flagged) {
                flagCount++;
                // Verificar si la bandera es incorrecta
                if (!adjacentCell.mined) {
                    hasIncorrectFlag = true;
                }
            } else if (!adjacentCell.opened) {
                // Agregar a celdas a revelar (solo las no abiertas)
                cellsToReveal.push({row: r, col: c});
            }
        }
    }
    // Si hay banderas incorrectas, perder el juego
    if (hasIncorrectFlag) {
        gameLose(gameBoard);
        return;
    }

    // Solo si el conteo de banderas coincide exactamente
    if (flagCount === cell.neighborMineCount) {
        // Revelar SOLO las celdas adyacentes en el área 3x3
        for (var i = 0; i < cellsToReveal.length; i++) {
            var r = cellsToReveal[i].row;
            var c = cellsToReveal[i].col;
            
            updateCellImage(gameBoard, r, c, false);
            
            // Si es una mina, perder inmediatamente
            if (gameBoard[r][c].mined) {
                gameLose(gameBoard);
                return;
            }
        }
    }
}