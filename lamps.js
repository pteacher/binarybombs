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

var states = [];
states[0] = PIXI.Texture.fromImage('assets/lampoff.png');
states[1] = PIXI.Texture.fromImage('assets/lampon.png');
states[2] = PIXI.Texture.fromImage('assets/equal.png');
states[3] = PIXI.Texture.fromImage('assets/and.png');
states[4] = PIXI.Texture.fromImage('assets/or.png');
states[5] = PIXI.Texture.fromImage('assets/not.png');

var gameContainer = new PIXI.Container();

for (var r = 0; r < 3; r++) {
    var row = new PIXI.Container();
    var state = [];
    var not = [];
    var n = 3;
    for (var i = 0; i < n; i++) {
        if (i % 2 == 0) {
            state.push(getRandInt(0, 1));
            not.push(getRandInt(0, 1));
        } else {
            state.push(getRandInt(3, 4));
            not.push(0);
        }

    }
    state.push(2);
    state.push(getRandInt(0, 1));
    for (var i = 0; i < state.length; i++) {
        var el = newLamp(80 * (i + 1), 0, state[i], (i == state.length - 1) ? true : false, states[state[i]]);
        row.addChild(el);
        if (not[i]) {
            var el2 = newLamp(80 * (i + 1), -40, state[i], false, states[5]);
            row.addChild(el2);
        }
    }
    row.x = cw / 2;
    row.y = ch / 4 * (r + 1);

    row.pivot.x = state.length * 90 / 2;
    row.pivot.y = row.height / 2;
    gameContainer.addChild(row);
}
app.stage.addChild(gameContainer);

function newLamp(x, y, state, interactive, texture) {
    var el = new PIXI.Sprite(texture);
    el.isOn = state;
    if (interactive) {
        el.interactive = true;
        el.buttonMode = true;
        el.on('pointerdown', function() {
            this.setTexture((this.isOn) ? states[0] : states[1]);
            this.isOn = !this.isOn;
        });
    }

    el.x = x;
    el.scale.x = 0.6;
    el.scale.y = 0.6;
    el.y = y;
    el.anchor.set(0.5);
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
