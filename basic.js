var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
var cw = app.renderer.width;
var ch = app.renderer.height;
var snakeLength = 4;
var snakeSize = 20
var sn = [];
var dx = 1;
var dy = 0;
var ds = 0;

var left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

for (var i = 0; i < snakeLength; i++) {
    sn.push(newBlock(100 - i * snakeSize, ch / 2, randChar(['0','1'], 1, 1)));
    app.stage.addChild(sn[i]);
}

function go(direction) {
	switch (direction) {
		case 0: dx = 0; dy = -1; break;
		case 1: dx = 1; dy = 0; break;
		case 2: dx = 0; dy = 1; break;
		case 3: dx = -1; dy = 0; break;
	}
}

function addBlock() {
	sn.push(newBlock(sn[snakeLength-1].x, sn[snakeLength-1].y, randChar(['0', '1'], 1, 1)))
	snakeLength++;
}

app.ticker.add(function(delta) {
    ds += 1;
    if (ds % 49 == 0) {

        for (var i = snakeLength - 1; i > 0; i--) {
            sn[i].x = sn[i - 1].x;
            sn[i].y = sn[i - 1].y;
        }
        sn[0].x += dx * snakeSize;
        sn[0].y += dy * snakeSize;
    }
});

function newBlock(x, y, digit) {
    var snaker = new PIXI.Container();
    var snake = new PIXI.Graphics();
    var snakeText = new PIXI.Text(digit, {
        fontFamily: 'Verdana',
        fill: '#000000',
        align: 'center',
        fontSize: 14
    });
    snaker.addChild(snake, snakeText);
    snake.beginFill(0xffffaa);
    snake.lineStyle(2, 0x000000, 1);
    snake.drawRect(0, 0, snakeSize, snakeSize);

    // move the sprite to the center of the screen
    snake.x = 0;
    snake.y = 0;
    snakeText.x = snakeSize / 2;
    snakeText.y = snakeSize / 2;
    snakeText.anchor.set(0.5);

    snaker.x = x;
    snaker.y = y;
    snaker.ds = 0;

    return snaker;
}

function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function randChar(charArray, minLen, maxLen) {
    var s = [];
    var rans = getRandInt(minLen, maxLen);
    for (var i = 0; i < rans; i++) {
        // s.push(String.fromCharCode(getRandInt(0, 1)+65));
        s.push(charArray[getRandInt(0, charArray.length - 1)])
    }
    return s.join("");
}


function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}