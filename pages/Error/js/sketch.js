//inifnity symbol draw
let s, prevSecond;
let angle, rY, rX;
let a, b, x, y;
let xs = [], ys = [], os = [];
let vs = [];
let loopScale;
let forward;
let n = 0.0;

function initializeVars() {
  angle = 0;
  rY = 80 * 0.5;
  rX = 220 * 0.5;
  a = 1.5;
  b = 3;
  prevSecond = 0;
  xs = [];
  ys = [];
  os = [];
  vs = [];
  loopScale = 200;
  frameRate(120);
  forward = true;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(43, 4, 10);
  initializeVars();
  noStroke();
  smooth();
  //starsetup();
}

function drawLoop(scale, forwardVal) {
  let scaleFactor = map(scale, 0, width/2, 2.5, 0.8);

  if (forwardVal) {
    angle += 1 * scaleFactor;
  } 
  else {
    angle -= 1 * scaleFactor;
  }
  push();
  translate(width/2, height/2);
  x = rX * sin(radians(a*angle)) * (scale*0.01);
  y = rY * sin(radians(b*angle)) * (scale*0.01);
  let colorMap1 = map(abs(x), 0, rX, 0, 5);
  let colorMap2 = map(abs(y), 0, rY, 0, 5);
  fill(5, colorMap1, colorMap1);
  ellipse(x, y, abs(x)*0.05 + 3, abs(x)*0.05 + 3);
  pop();
}

function refreshBackground() {
  fill(0, 10);
  //rect(0, 0, width, height);
}

function drawTraces() {
  for (let i = 0; i < vs.length; i++) {
    let opacity = random(1);
    os[i] -= opacity;
    if (os[i] < 10) {
      vs[i] = 1;
    }
    if (vs[i] == 0) {
      push();
      translate(width/2, height/2);
      fill(255, os[i]);
      ellipse(xs[i], ys[i], 1, 1);
      pop();
    }
  }
}

function updateTraces() {
  push();
  translate(width/2, height/2);
  xs.push(x);
  ys.push(y);
  os.push(random(255));
  vs.push(0);
  pop();
}

function draw() {
  drawTraces();
  refreshBackground();
  drawLoop(loopScale, forward);

  s = second();
  if (prevSecond != s) {
    loopScale = map(noise(n), 0, 1, 0, width/2);
    prevSecond = s;
  }

  n += 0.01;

  if (keyIsPressed) {
    updateTraces();
  }

  if (mouseIsPressed) {
    loopScale = abs(mouseX - width/2);
    updateTraces();
    if (mouseX < width/2) {
      forward = false;
    } 
    else {
      forward = true;
    }
  }
  //stardraw();
}
