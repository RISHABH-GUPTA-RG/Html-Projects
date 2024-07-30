//connecting canvas to JS
var canvas = document.querySelector('canvas');

//setting canvas width and height
canvas.width = innerWidth;
canvas.height = innerHeight;

//getting Context
var c = canvas.getContext('2d');

//variables
var maxRadius = 60;
var minRadius = 5;
var speed = 5;


//colors of the circle
colorArray = [
    '#F26389',
    '#9266F2',
    '#6BF2CC',
    '#F2E96B',
    'cyan'
]

//circle blueprint
class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    //drawing circle
    draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    };

    //moving circle and interaction
    update = function () {
        //movement
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > - 50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            && this.radius < maxRadius
        ) {
            this.radius += 1;
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    };

}

var mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init()
    }
)


var circleArray = [];
function init() {

    circleArray=[];
    for (var i = 0; i < 2500; i++) {

        var radius = Math.random() * minRadius + 1;
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var dx = (Math.random() - 0.5) * speed;
        var y = Math.random() * (innerHeight - 2 * radius) + radius;
        var dy = (Math.random() - 0.5) * speed;

        var circle = new Circle(x, y, dx, dy, radius);
        circleArray.push(circle);
    }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init()
animate()

