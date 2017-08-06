'use strict';

var task = {};
var task = taskGen(5);
var ORIENTATION = (window.innerWidth > window.innerHeight) ? 'horizontal' : 'vertical';

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0xffffff});
document.body.appendChild(app.view);
app.view.id = 'pixi-canvas';

var background = PIXI.Sprite.fromImage('assets/bg.png');
background.width = app.renderer.width;
background.height = app.renderer.height;

app.stage.addChild(background);

var rect = new PIXI.Rectangle(0,0,50,50);

var cw = app.renderer.width;
var ch = app.renderer.height;
var gameContainer = new PIXI.Container();
app.stage.addChild(gameContainer);

var taskText = iText(task.q[0], 0, 0, {
    fontFamily: 'Verdana',
    fill: '#000',
	align : 'center',
    fontSize: 42
});

var choiceLeft = iText(task.q[1], 0, 80, {
    fontFamily: 'Verdana',
    fill: '#33ff33',
	align : 'center',
    fontSize: 42
}, onClick);
var choiceRight = iText(task.q[2], 0, 160, {
    fontFamily: 'Verdana',
    fill: '#ff3333',
	align : 'center',
    fontSize: 42
}, onClick);

gameContainer.addChild(taskText);
gameContainer.addChild(choiceLeft);
gameContainer.addChild(choiceRight);

gameContainer.x = cw / 2;
gameContainer.y = 50;
gameContainer.scale.set(ch / cw * 2);

function onClick () {
	console.log(this.text);
}

function taskGen(lvl) {
	task.q = [];
	var rans = getRandInt(0,1);
	task.q[rans+1] = randChar(["A", "+"], 2, 3);
	task.q[Math.abs(rans-1)+1] = randChar(["A", "+"], 2, 3);
	task.q[0] = task.q[1] + task.q[2];
	return task;
}

function getRandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function init() {
}

function iText(text, x, y, style = {}, event) {
	var mText = new PIXI.Text(text, style);
	mText.anchor.set(0.5, 0);
	mText.x = x;
	mText.y = y;
	mText.interactive = true;
	mText.buttonMode = true;
	mText.on('pointerdown', event);
	return mText;
	//mText.hitArea = hitRect;
}

function randChar(charArray, minLen, maxLen) {
	var s = [];
	var rans = getRandInt(minLen,maxLen);
	for (var i = 0; i < rans; i++) {
		// s.push(String.fromCharCode(getRandInt(0, 1)+65));
		s.push(charArray[getRandInt(0,charArray.length - 1)])
	}
	return s.join("");
}