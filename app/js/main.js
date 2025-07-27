'use strict';

document.addEventListener('DOMContentLoaded', function () {
	initGame();
});

// Selector de dificultad
document
	.getElementById('difficulty-select')
	.addEventListener('change', function (e) {
		var difficulty = e.target.value;
		setDifficulty(difficulty);
		resetBoard();
		initGame();
	});
