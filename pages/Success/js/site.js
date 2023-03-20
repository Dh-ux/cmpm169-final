
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
    this.launched = false;
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
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(1, 4);
    let color = (100 + random(155), 100 + random(155), 100 + random(155));
    
    stars.push(new Star(x, y, r, color));
  }
  for (let i = 0; i < stars.length; i++) {
    let nearestStar = stars[i].findNearest();
    stars[i].nearest = nearestStar;
    for (let x = 0; x < 5; x++) {
      let other = random(stars);
      if (other !== stars[i] && other != nearestStar && dist(stars[i].x, stars[i].y, other.x, other.y) < 150) {
        stars[i].other = other;
        break;
      }
    }
  }
  for (let i = 0; i < 300; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(1, 2.5);
    let color =(random(160), random(160), random(160));
    star_array.push(new Stars(x, y, r, color));
  }
  //infsetup();
}

function draw() {
  background(0);
  if(! g_sleep){
    for (let star of stars) {
      star.move();

      star.connect(star.nearest);
      star.connect(star.other);
      star.display();
  }
  for (let star of star_array) {
    star.move();
    star.shine();
    star.display();
  } 
}
  //infdraw();
}


function launch_star(){

  for (let star of star_array) {
    if(!star.launched){
      star.to_launch = true;
    }
  }
}
