'use strict';
var gameVar = {
	boardSize: 8,
	minesCount: 10,
	gameOver: false,
	gameStarted: false,
	flags: 0,
	bomb: 0,
	seconds: 0,
	minutes: 0,
	difficulty: 'easy'
};

var gameBoard = [];
var mines;
var timer = '00:00';
var timeout;
var minesRemaining;
var timeInterval;
var neighbors = [];
