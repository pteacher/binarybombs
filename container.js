var task = {};
var task = taskGen(1);
var ORIENTATION = (window.innerWidth > window.innerHeight) ? 'horizontal' : 'vertical';

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0xffffff});
document.body.appendChild(app.view);
app.view.id = 'pixi-canvas';
console.log(ORIENTATION);

var texture = PIXI.Texture.fromImage('assets/bomb1.png');
var redWireText, blueWireText, binaryText;

var container = new PIXI.Container();
app.stage.addChild(container);
var bunny = new PIXI.Sprite(texture);
bunny.anchor.set(0.5);
bunny.scale.x = 2;
bunny.scale.y = 2;

container.addChild(bunny);
container.x = (app.renderer.width - container.width) / 2;
container.y = (app.renderer.height - container.height) / 2;

var scoreText = new PIXI.Text('0', {
    fontFamily: 'Verdana',
    fontSize: 102,
});

scoreText.x = (app.renderer.width - scoreText.width) / 2;
scoreText.y = 20;

app.stage.addChild(scoreText);

function onClick () {
	
	//check();
	if (parseInt(this.text).toString(2) == binaryText.text)
		scoreText.setText(+scoreText.text + 1);
	else 
		scoreText.setText(+scoreText.text - 1);
	taskGen(+scoreText.text / 2);
	//update();
	binaryText.setText(task.q[0]);
	redWireText.setText(task.q[1]);
	blueWireText.setText(task.q[2]);

    //this.setText(+this.text + 1);
}

function taskGen(lvl) {
	task.q = [];
	task.q[0] = +getRandInt(lvl * 2, lvl * 4).toString(2);
	var rans = getRandInt(0,1);
	task.q[rans+1] = parseInt(task.q[0], 2);
	task.q[Math.abs(rans-1)+1] = parseInt(task.q[0], 2) + 2;
	return task;
}

function getRandInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

/*
// // Load them google fonts before starting...!
window.WebFontConfig = {
    google: {
        families: ['Press Start 2P']
    },

    active: function() {
        init();
    }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
/* jshint ignore:end */
init();

function init() {
	var styleNumbers = new PIXI.TextStyle({
	    fontFamily: 'Verdana',
	    fontSize: 16,
	    fontWeight: 600,
	    fill: '#ff3333',
	    align : 'center'
	 });

	redWireText = new PIXI.Text(task.q[1], styleNumbers);
	var hitRect = new PIXI.Rectangle(-100, -100, 200, 200);
	redWireText.anchor.set(0.5, 0);
	redWireText.y = container.y;
	redWireText.x = (app.renderer.width - redWireText.width) / 2 + 120;
	redWireText.interactive = true;
	redWireText.buttonMode = true;
	redWireText.on('pointerdown', onClick);
	redWireText.hitArea = hitRect;
	app.stage.addChild(redWireText);

	blueWireText = new PIXI.Text(task.q[2], styleNumbers);
	blueWireText.anchor.set(0.5, 0);
	blueWireText.y = container.y;
	blueWireText.x = (app.renderer.width - blueWireText.width) / 2 - 100;
	blueWireText.interactive = true;
	blueWireText.buttonMode = true;
	blueWireText.on('pointerdown', onClick);
	blueWireText.hitArea = hitRect;
	app.stage.addChild(blueWireText);

	binaryText = new PIXI.Text(task.q[0], styleNumbers);
	binaryText.anchor.set(0.5, 0);
	binaryText.y = container.y;
	binaryText.x = (app.renderer.width - binaryText.width) / 2 + 23;
	app.stage.addChild(binaryText);
}