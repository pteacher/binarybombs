var app = new PIXI.Application(window.innerWidth, window.innerHeight, { backgroundColor: 0xffffff, resolution: 1 });
document.body.appendChild(app.view);
app.view.id = 'pixi-canvas';
var cw = app.renderer.width;
var ch = app.renderer.height;
var gameContainer = new PIXI.Container();
var task = {};
getTask();

var channelSlider = Slider(-250, 0, 100, 20, task.q[2], 'vertical', 1, 4, 100, 1, '', task.q[5][4]);
var deepSlider = Slider(-150, 0, 100, 20, task.q[0], 'vertical', 0, 32, 100, 8, 'бит', task.q[5][0]);
var freqSlider = Slider(-50, 0, 100, 20, task.q[1], 'vertical', 0, 44200, 100, 100, 'Гц', task.q[5][1]);
var timeSlider = Slider(50, 0, 100, 20, task.q[4], 'vertical', 1, 7*60, 100, 1, 'cек', task.q[5][3]);
var sizeSlider = Slider(150, 0, 100, 20, task.q[3], 'vertical', 1, 1024 * 62 * 4, 100, 8, 'Кбайт', task.q[5][2]);

gameContainer.addChild(deepSlider, freqSlider, sizeSlider, channelSlider, timeSlider);
gameContainer.scale.set(1);
gameContainer.x = cw / 2;
gameContainer.y = ch * 2 / 3;
app.stage.addChild(gameContainer);

function Slider(x, y, xsize, ysize, initial, orientation, min, max, size, step, unit, active, texture) {
    var slider = new PIXI.Container();
    var sliderBox;
    if (texture) {
        sliderBox = new PIXI.Sprite(texture);
        sliderBox.anchor.set(0.5);
    } else {
        sliderBox = new PIXI.Graphics();
        if (active == 1) {
        	sliderBox.beginFill('0xff4444');
        } else {
        	sliderBox.beginFill('0x999999');
        }
        sliderBox.lineStyle(2, 0x000000, 1);
        sliderBox.drawRect(0, 0, xsize, ysize);
        sliderBox.x = 0;
        sliderBox.y = 0;
    }
    var sliderText = new PIXI.Text(initial + ' ' + unit, {
        fontFamily: 'Verdana',
        fill: '#000000',
        align: 'center',
        fontSize: 14
    });
    slider.addChild(sliderBox, sliderText);
    if (active == 1) {
    	slider.interactive = true;
    	slider.buttonMode = true;
    }

    slider.on('pointerdown', function(e) {
        this.isDragging = true;
        this.data = e.data;
    });
    slider.on('pointermove', function(e) {
        if (this.isDragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            if (orientation == 'horizontal') {
                if (newPosition.x - x >= min && newPosition.x - x <= size) {
                    this.children[1].setText(Math.round(Math.round((newPosition.x - x) / size * max) / step) * step + ' ' + unit);
                    this.x = newPosition.x - xsize / 2;
                }

            } else {
                if (y - newPosition.y >= 0 && y - newPosition.y <= size) {
                    this.children[1].setText(Math.round(Math.round((y - newPosition.y) / size * max) / step) * step + ' ' + unit);
                    this.y = newPosition.y - ysize / 2;
                }

            }

        }
    });
    slider.on('pointerupoutside', function(e) {
        this.isDragging = false;
        this.data = null;
    });
    slider.on('pointerup', function(e) {
        this.isDragging = false;
        this.data = null;
    });

    sliderText.x = xsize / 2;
    sliderText.y = ysize / 2;
    sliderText.anchor.set(0.5);
    slider.x = x;
    slider.y = initial / max * -100;
;

    slider.max = max;
    slider.unit = unit;
    return slider;
}


function getTask() {
	task.q = [];
	task.q[0] = getRandInt(1, 4) * 8;
	task.q[1] = getRandInt(1, 4) * 11100;
	task.q[2] = Math.pow(2, getRandInt(0, 2));
	task.q[3] = getRandInt(1, 62) * 1024;
	task.q[4] = getRandInt(1, 24) * 20;
	task.q[5] = [0,0,0,0,0];
	task.r = getRandInt(0, 3);
	task.q[5][task.r] = 1;
}

function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
