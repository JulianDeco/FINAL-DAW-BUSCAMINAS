'use strict';

gameBoard = createBoard(boardSize, minesCount);

document.addEventListener('DOMContentLoaded', function () {
	var boardElement = document.querySelector('.game-board');
});

addClickListenerToCells(gameBoard);
console.log(gameBoard);
