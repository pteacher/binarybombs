'use strict';
var task = {};
var task = getTask(5);

var ORIENTATION = (window.innerWidth > window.innerHeight) ? 'horizontal' : 'vertical';

var app = new PIXI.Application(window.innerWidth, window.innerHeight, { backgroundColor: 0xffffff });
var cw = app.renderer.width;
var ch = app.renderer.height;
document.body.appendChild(app.view);
app.view.id = 'pixi-canvas';

var background = PIXI.Sprite.fromImage('assets/bg.png');
background.width = app.renderer.width;
background.height = app.renderer.height;
app.stage.addChild(background);

var fireTexture = PIXI.Texture.fromImage('assets/fire.png');
var knight = PIXI.Texture.fromImage('assets/strategy.png');

var gameContainer = new PIXI.Container();

for (var r = 1; r < 20; r++) {
    if (r == 1) {
        var fire = newLamp(100 + r * 30, ch * 2 / 3, 1, knight);
    } else {
        var fire = newLamp(100 + r * 30, ch * 2 / 3, 0.3, fireTexture);
    }
    gameContainer.addChild(fire);
}
app.stage.addChild(gameContainer);

function newLamp(x, y, scale, texture) {
    var el = new PIXI.Sprite(texture);
    el.x = x;
    el.scale.x = scale;
    el.scale.y = scale;
    el.y = y;
    el.anchor.set(0.5, 1);
    return el;
}

function getTask(lvl) {
    task.q = [];
    return task;
}

function checkTask(argument) {
	
}

function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
