'use strict';
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
	return gameBoard;
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
	bomb = minesPlaced;
	flags = bomb
	return gameBoard;
}

// Se formatean minutes y segundos a dos digitos cada uno
// Ejemplo minuto 5 transformado a 05
function formatTwoDigits(number) {
	if (number < 10){
		return '0' + number;
	}
	return number;
}

// Handler del timer que se ejecuta una vez presionada alguna celda tanto con click izquierdo como derecho
function timeHandler() {
	timer = formatTwoDigits(minutes) + ':' + formatTwoDigits(seconds);
	if (seconds === 60) {
		minutes += 1;
		seconds = 0;
		return
	}
	seconds += 1;
}

// Funcion que maneja el click y eventos segun los estados de la celda
function leftClick(e, gameBoard) {
	// Buscamos el elemento con clase cell-container más cercano para extraer row y column
	var container = e.target.closest('.cell-container');
	var row = container.dataset.row;
	var col = container.dataset.col;

	var gameBoardCell = gameBoard[row][col];

	// Comprobar si el juego ya inicio
	if (game_started === false) {
		game_started = true;
		setInterval(timeHandler, 1000);
	}

	if (gameBoardCell.flagged === true) {
		return
	}

	if (gameBoardCell.mined === true) {
		// Logica para perder en el juego
		return
	}

	if (gameBoardCell.opened === false && gameBoardCell.flagged === false) {
		// Cambiamos el estado de la celda
		gameBoardCell.opened = true;
		e.target.src = './app/img/opened_tile.png';
	}
}

function rightClick(e, gameBoard) {
	var container = e.target.closest('.cell-container');
	var row = container.dataset.row;
	var col = container.dataset.col;

	var gameBoardCell = gameBoard[row][col];

	// Comprobar si el juego ya inicio
	if (game_started === false) {
		game_started = true;
		setInterval(timeHandler, 1000);
	}

	if (gameBoardCell.opened === true) {
		return
	}

	// Se comprueba si se llego al limite de flags(variable global)
	if (flags === 1) {
		return
	}

	if (gameBoardCell.flagged === false) {
		// Logica de celda sin bandera
		e.target.src = './app/img/flag.png'
		gameBoardCell.flagged = true;
		// Se resta una flag
		flags = flags - 1
		return
	}

	if (gameBoardCell.flagged === true) {
		// Logica de celda con bandera
		e.target.src = './app/img/tile.png'
		gameBoardCell.flagged = false;
		// Se suma una flag
		flags = flags + 1;
		return
	}
}

// Funcion que asigna listeners de click a cada celda
function addClickListenerToCells(gameBoard) {
	// Recuperamos todas las celdas
	var cells = document.getElementsByClassName('cell-container');
	// Recorremos las celdas
	for (var i = 0; i < 64; i++) {
		var cell = cells[i];
		// Asignamos el evento de click izquierdo a cada celda
		cell.addEventListener('click', function (e) {
			// Pasamos como parametro el evento y el tablero en JSON
			leftClick(e, gameBoard);
		});
		// Asignamos el evento de click derecho a cada celda
		cell.addEventListener('contextmenu', function (e) {
			e.preventDefault();
			// Pasamos como parametro el evento y el tablero en JSON
			rightClick(e, gameBoard);
		})
	}
}

