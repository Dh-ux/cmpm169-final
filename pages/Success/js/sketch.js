
class Stars {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.radius = radius;
    this.color = color(255, 255, 0);
    this.maxRadius = radius;
    this.minRadius = radius / 2;
    this.shine_speed = random(0.001,0.05)
    this.shine_offset = random(0,30)
    this.tension = 100;
    this.maxDistance = 100;
    this.velocity = createVector(0,0);
    this.center = createVector(innerWidth/2, innerHeight/2);
    this.acceleration = createVector(0,0);
    this.maxSpeed = 5;
    this.launchTime = 450;
    this.launched = true;
  }

  shine() {
    let r = map(sin(frameCount * this.shine_speed + this.shine_offset), -1, 1, 100, 200);
    this.color = color(r, r, r);
    this.radius = map(sin(frameCount * 0.05), -1, 1, this.minRadius, this.maxRadius);
  }
  
  move() {
    if(!this.launched){
      let center = createVector(innerWidth/2, innerHeight/2);
      let attraction = p5.Vector.sub(center, createVector(this.x,this.y));
      attraction.normalize();
      attraction.mult(0.05);
      this.velocity.add(attraction);
      this.velocity.limit(this.maxSpeed);
      if(this.to_launch == true) {
        this.velocity = p5.Vector.sub(createVector(this.originalX,this.originalY),center);
        this.velocity.normalize();
        this.velocity.mult(random(1,12));
        this.launched = true;
        this.to_launch = false;
      }
    }else{
    let distance = dist(this.x, this.y, mouseX, mouseY);
    let distance1 = dist(this.x, this.y, x, y);
    if (distance < this.maxDistance) {
      let angle = atan2(
      mouseY - this.y, mouseX - this.x);
      if(mouseIsPressed){
        this.velocity.x += cos(angle) *0.1* (this.maxDistance - distance) / this.tension;
        this.velocity.y += sin(angle) *0.1* (this.maxDistance - distance) / this.tension;
        }else{
        this.velocity.x -= cos(angle) *0.1* (this.maxDistance - distance) / this.tension;
        this.velocity.y -= sin(angle) *0.1* (this.maxDistance - distance) / this.tension;
        }
    } else {
      this.x += (this.originalX - this.x) / this.tension;
      this.y += (this.originalY - this.y) / this.tension;
    }
  }
      this.x += this.velocity.x;
      this.y += this.velocity.y;
  this.velocity.x = lerp(this.velocity.x,0,0.01 * this.radius)
  this.velocity.y = lerp(this.velocity.y,0,0.01 * this.radius)
}
  
  display() {
    this.x += random(-0.1, 0.1);
    this.y += random(-0.1, 0.1);
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    for (let i = 0; i < 5; i++) {
      let x = this.x + (this.radius * cos(PI / 2 + TWO_PI * i / 5));
      let y = this.y + (this.radius * sin(PI / 2 + TWO_PI * i / 5));
      let x2 = this.x + (this.radius * 0.5 * cos(PI / 2 + TWO_PI * i / 5 + PI / 5));
      let y2 = this.y + (this.radius * 0.5 * sin(PI / 2 + TWO_PI * i / 5 + PI / 5));
      line(x, y, x2, y2);
    }
  }
}

let stars = [];
let star_array = [];

//step5
function gradientLine(x1, y1, x2, y2, color1, color2) {
  // linear gradient from start to end of line
  var grad = this.drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);
  this.drawingContext.strokeStyle = grad;

  line(x1, y1, x2, y2);
}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(1, 2.5);
    let color =(random(160), random(160), random(160));
    star_array.push(new Stars(x, y, r, color));
  }
  //infsetup();
}

function reset_star(){
  for (let star of star_array) {
    star.launched = false;
  } 
}

function launch_star(){

  for (let star of star_array) {
    star.launched = false;
    star.to_launch = true;
  }
}



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
  background(0,0,51);
  initializeVars();
  noStroke();
  smooth();
  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(1, 2.5);
    let color =(random(160), random(160), random(160));
    star_array.push(new Stars(x, y, r, color));
  }
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
  rect(0, 0, width, height);
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
  for (let star of star_array) {
    star.move();
    star.shine();
    star.display();
  } 
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


