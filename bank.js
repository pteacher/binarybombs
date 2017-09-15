'use strict';
var pts = 0;
var count = 12, counter = setInterval(timer, 100000);
var progress = document.getElementById("progressbar");
progress.style.width = pts + '%';
var units = ['б', 'Б', 'Кб', 'Мб', 'Гб', 'Тб'];
var task = {};
var task = getTask(5);

var pick = false;

var ORIENTATION = (window.innerWidth > window.innerHeight) ? 'horizontal' : 'vertical';

var app = new PIXI.Application(800, 600, { backgroundColor: 0xffffff });
var cw = app.renderer.width;
var ch = app.renderer.height;
document.body.appendChild(app.view);
app.view.id = 'pixi-canvas';

var background = PIXI.Sprite.fromImage('assets/bg.png');
background.width = app.renderer.width;
background.height = app.renderer.height;
app.stage.addChild(background);

var clientNormalTexture = PIXI.Texture.fromImage('assets/sceptic.png');
var clientSadTexture = PIXI.Texture.fromImage('assets/sad.png');
var clientHappyTexture = PIXI.Texture.fromImage('assets/happy.png');
var clientSmugTexture = PIXI.Texture.fromImage('assets/smug.png');
var speechTexture = PIXI.Texture.fromImage('assets/chat.png');
var notesTexture = PIXI.Texture.fromImage('assets/notes.png');
var coinsTexture = PIXI.Texture.fromImage('assets/coins.png');

var client = newSprite(-100, ch / 2, 0.5, 0.5, 1, clientNormalTexture);
var chat = newSprite(cw / 2 - 50, ch / 2 - 20, 1, 1, 1, speechTexture);
var dec = newSprite(cw / 2 + 80, ch * 3 / 4, 0.5, 0.5, 1, notesTexture, 1);
var inc = newSprite(cw / 2 - 80, ch * 3 / 4, 0.5, 0.5, 1, coinsTexture, 0);

var convertText = new PIXI.Text(task.q[2] + ' ' + units[task.q[0]], {
        fontFamily: 'Arial',
        fill: '#000000',
        align: 'center',
        fontSize: 24
    });
convertText.x = chat.x - 60;
convertText.y = chat.y - 70;
convertText.anchor.set(0.5);
var convertIncText = new PIXI.Text(task.q[2] * task.q[3] + ' ' + units[task.q[1]], {
        fontFamily: 'Arial',
        fill: '#000000',
        align: 'center',
        fontSize: 24
    });
convertIncText.x = inc.x;
convertIncText.y = inc.y + 80;
convertIncText.anchor.set(0.5);

var convertDecText = new PIXI.Text((task.q[2] / task.q[3]).toFixed(3) + ' ' + units[task.q[1]], {
        fontFamily: 'Arial',
        fill: '#000000',
        align: 'center',
        fontSize: 24
    });
convertDecText.x = dec.x;
convertDecText.y = dec.y + 80;
convertDecText.anchor.set(0.5);

var taskText = new PIXI.Container();
taskText.addChild(chat, convertText, convertIncText, convertDecText);
taskText.visible = false;

app.stage.addChild(inc);
app.stage.addChild(dec);
app.stage.addChild(client);
app.stage.addChild(taskText);

app.ticker.add(function(delta) {
    if (client.x < cw / 2) {
        client.x += 5 * delta;
    }
    else {
        taskText.visible = true;
    }
    if (pick) {
        client.x += 5 * delta;
        taskText.visible = false;
    }
    if (client.x > cw) {
        pick = false;
        client.texture = clientNormalTexture;
        client.x = -100;
        task = getTask(5);
        convertText.text = task.q[2] + ' ' + units[task.q[0]];
        convertIncText.text = task.q[2] * task.q[3] + ' ' + units[task.q[1]];
        convertDecText.text = (task.q[2] / task.q[3]).toFixed(3) + ' ' + units[task.q[1]];
    }
});

function newSprite(x, y, xs, ys, scale, texture, type) {
    var el = new PIXI.Sprite(texture);
    el.x = x;
    el.scale.x = scale;
    el.scale.y = scale;
    el.y = y;
    el.anchor.set(xs, ys);
    if (type != null) {
        el.interactive = true;
        el.buttonMode = true;
        el.on('pointerdown', function() {
            count = 12;
            if (checkTask() == type) {
                pts -= 100 / 10;
                if (task.q[0] > task.q[1])
                    client.texture = clientSadTexture;
                else
                    client.texture = clientSmugTexture;
            }
                
            else {
                pts += 100 / 15;
                if (pts > 35) {
                    progress.style.backgroundColor = "FF9000";
                }
                if (pts > 55) {
                    progress.style.backgroundColor = "#8EA106";
                }
                if (pts > 75) {
                    progress.style.backgroundColor = "#03C03C";
                }
                client.texture = clientHappyTexture; 
            }
            if (pts < 0)
                pts = 0;
            if (pts > 100)
                pts = 100;
            progress.style.width = pts + '%';        
            pick = true;
        });
    }
    return el;
}

function getTask(lvl) {
    task.q = [];
    task.q[0] = getRandInt(0, units.length-1);
    do {
        task.q[1] = getRandInt(0, units.length-1);
    } while (task.q[0] == task.q[1] || Math.abs(task.q[0]-task.q[1]) > 1);
    task.q[2] = getRandInt(1, lvl) * Math.pow(2, getRandInt(1, 10));
    task.q[3] = 1024;
    if (task.q[0] == 0 || (task.q[0] == 1 && task.q[1] == 0)) {
        task.q[3] = 8
    }
    return task;
}

function checkTask(argument) {
	return task.q[0] > task.q[1] ? 1 : 0;
}

function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function timer()
{
  count = count - 1;
  if (count <= 0)
  {
     pick = true;
     count = 12;
     client.texture = clientSadTexture;
  }
}