'use strict';

var boardSize = 8;
var minesCount = 10;
var gameBoard = [];
var flags = 0;
var mines;
var bomb;
var timer = '00:00';
var seconds = 0;
var minutes = 0;
var gameStarted = false;
var timeout;
var minesRemaining;
var timeInterval;
var neighbors = [];
var gameOver = false;
var smileyFace;
