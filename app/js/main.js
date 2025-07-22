'use strict';

gameBoard = createBoard(boardSize, minesCount);

document.addEventListener('DOMContentLoaded', function () {
	var boardElement = document.querySelector('.game-board');
	renderBoard(boardSize);
	addClickListenerToCells(gameBoard);
	
});

addClickListenerToButtonFace();
addEventListenerToSpaceKey();

