var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0xffffff, resolution:1});
document.body.appendChild(app.view);
app.view.id = 'pixi-canvas';
var cw = app.renderer.width;
var ch = app.renderer.height;
var sn = [];
var score = 0;
var bits = getRandInt(2, 6);
var boxerDirection = 0;
var im = new PIXI.interaction.InteractionManager(app.renderer);
var scoreText = new PIXI.Text('Score: 0');
var bitText = new PIXI.Text('Bits: ' + bits);
bitText.x = 20;
bitText.y = 50;
scoreText.x = 20;
scoreText.y = 20;
app.stage.addChild(scoreText);
app.stage.addChild(bitText);

var texture = PIXI.Texture.fromImage('assets/boxer.png');

var boxer = newBlock(cw / 2, ch - 25, 0, 0, '0', texture);
app.stage.addChild(boxer);

var left = keyboard(37),
    space = keyboard(32),
    right = keyboard(39);

left.press = function () {
    boxerDirection = -1;
}

space.press = function () {
    console.log(parseInt(boxer.children[1].text).toString(2));
    if (parseInt(boxer.children[1].text).toString(2).length == bits) {
        score++;
    }
    else {
        score--;
    }
    bits = getRandInt(2, 6);
    scoreText.setText('Score: ' + score);
    bitText.setText('Bits: ' + bits);
    boxer.children[1].setText('0');
}

right.release = left.release = function () {
    boxerDirection = 0;
}

right.press = function () {
    boxerDirection = 1;
}

for (var i = 0; i < 5; i++) {
    sn.push(newBlock(getRandInt(i * (cw / 5) + 20, (cw / 5) * (i + 1) - 20), 30, 40, 20, Math.pow(2, bits) / 2));
    sn[i].speed = getRandInt(2, 4);
    app.stage.addChild(sn[i]);
}

console.log();

function go(direction) {
	switch (direction) {
		case 0: dx = 1; break;
		case 1: dx = -1; break;
        case 2: dx = 0; break;
	}
}


function addBlock() {
	sn.push(newBlock(sn[snakeLength-1].x, sn[snakeLength-1].y, 20, 20, randChar(['0', '1'], 1, 1)))
	snakeLength++;
}

app.ticker.add(function(delta) {
    boxer.x += boxerDirection * 2;

    for (var i = 0; i < 5; i++) {
        sn[i].y += sn[i].speed / 3;

        if (sn[i].x < (boxer.x + boxer.width / 2) && sn[i].x > (boxer.x - boxer.width / 2) && sn[i].y > (boxer.y - boxer.height / 2)) {
            boxer.children[1].setText(+boxer.children[1].text + +sn[i].children[1].text);
            sn[i].y = 40;
            sn.speed = getRandInt(2, 4);
            sn[i].children[1].setText(getRandInt(1, Math.pow(2, bits) / 2));
            sn[i].x = getRandInt(i * (cw / 5) + 20, (cw / 5) * (i + 1) - 20);
        }

        if (sn[i].y > ch) {
            sn[i].y = 40;
            sn.speed = getRandInt(2, 4);
            sn[i].children[1].setText(getRandInt(1, Math.pow(2, bits) / 2));
            sn[i].x = getRandInt(i * (cw / 5) + 20, (cw / 5) * (i + 1) - 20);
            
        }


    }
});

function newBlock(x, y, xsize, ysize, digit, texture) {
    var snaker = new PIXI.Container();
    var snake;
    if (texture) {
        snake = new PIXI.Sprite(texture);
        snake.anchor.set(0.5);
    }
    else {
        snake = new PIXI.Graphics();
        snake.beginFill(0xffffaa);
        snake.lineStyle(2, 0x000000, 1);
        snake.drawRect(0, 0, xsize, ysize);
        snake.x = 0;
        snake.y = 0;
    }
    var snakeText = new PIXI.Text(digit, {
        fontFamily: 'Verdana',
        fill: '#000000',
        align: 'center',
        fontSize: 14
    });
    snaker.addChild(snake, snakeText);

    snakeText.x = xsize / 2;
    snakeText.y = ysize / 2;
    snakeText.anchor.set(0.5);

    snaker.x = x;
    snaker.y = y;
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

function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};