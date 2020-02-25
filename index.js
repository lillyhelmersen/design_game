
/*Downloaded from https://www.codeseek.co/Jastor11/p5js-character-moving-on-screen-dpEQqJ */
var xpos = 100;
var ypos = 100;

var targetX;
var targetY;

var speed = 50;
var easing = 0.05;

function setup() {
  createCanvas(400, 200);
  background(0);
}
function draw() {
  background(100);
  stroke(0);
  ellipseMode(CENTER);
  ellipse(xpos, ypos, 25, 25);

  var dx = targetX -xpos;
  if (abs(dx) > 1) {
    xpos = xpos + dx * easing;
  }
  var dy = targetY - ypos;
  if (abs(dy) > 1) {
    ypos = ypos + dy * easing;
  }
  // display xpos variable
  fill(255);
  text("xpos = " + xpos, 25, 25);
  text("ypos = " + ypos, 25, 55);
}
function keyPressed(){
  if (keyCode == DOWN_ARROW){
    targetY = ypos + speed;
  }
  if (keyCode == UP_ARROW){
    targetY = ypos - speed;
  }
  if (keyCode == LEFT_ARROW) {
    targetX = xpos - speed;
  }
  if (keyCode == RIGHT_ARROW) {
    targetX = xpos + speed;
  }
}
