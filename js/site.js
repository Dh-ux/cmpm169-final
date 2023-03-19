// Get the input fields and login button
var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');
var loginBtn = document.getElementById('login-btn');

//This is a generated interactive constella like page.
//The stars will move away from your mouse
//If you press mouse button, stars will be attracted to your mouse
//the link between stars will break if youpush them too far.

//The stars are attracted to the center, and will explode after 5 sec.

class Star {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.brightness = 100;
    this.nearest = null
    this.other = null
    this.connected = true
    this.prev1 = null
    this.prev2 = null
    this.next1 = null
    this.next2 = null
    this.velocity = createVector(0,0);
    this.center = createVector(window.innerWidth/2, window.innerHeight/2);
    this.acceleration = createVector(0,0);
    this.maxSpeed = 8;
    this.launchTime = 450//int(random(60,300));
    this.launched = false;
    this.to_launch = false;
  }

  move() {
    if(!this.launched){
      let center = createVector(window.innerWidth/2, window.innerHeight/2);
      let attraction = p5.Vector.sub(center, createVector(this.x,this.y));
      attraction.normalize();
      attraction.mult(0.05);
      this.velocity.add(attraction);
      this.velocity.limit(this.maxSpeed);
      this.brightness += 1
      if(this.to_launch == true){
        this.velocity = createVector(random(-1,1),random(-1,1));
        this.velocity.normalize();
        this.velocity.mult(random(1,12));
        this.launched = true;
        this.to_launch = false;
      }
    }else{
    this.x += random(-1, 1);
    this.y += random(-1, 1);
    if (dist(mouseX, mouseY, this.x, this.y) < 100) {
        this.brightness = 255;
        let angle = atan2(mouseY - this.y, mouseX - this.x);
        if(mouseIsPressed){
        this.velocity.x += cos(angle)*0.1;
        this.velocity.y += sin(angle)*0.1;
        }else{
        this.velocity.x -= cos(angle)*0.1;
        this.velocity.y -= sin(angle)*0.1;
        }
        if (dist(this.nearest.x, this.nearest.y, this.x, this.y) > 50){
          this.x = lerp(this.x,this.nearest.x,0.015)
          this.y = lerp(this.y,this.nearest.y,0.015)
        }
        //reconnect
        if(this.connected){        
          if(this.nearest != null){
          if (dist(this.nearest.x, this.nearest.y, this.x, this.y) > 200){
            this.nearest = this.findNearest()
          }
          }
  
        if(this.other != null){
          if (dist(this.other.x, this.other.y, this.x, this.y) > 250){
          for (let x = 0; x < 5; x++) {
            let other = random(stars);
            if (other !== this && other != this.nearestStar && dist(this.x, this.y, other.x, other.y) < 240) {
              this.other = other;
              break;
            }
          }
        }
        if (dist(this.other.x, this.other.y, this.x, this.y) > 80){
          this.x = lerp(this.x,this.other.x,0.012)
          this.y = lerp(this.y,this.other.y,0.012)
        }
        }
      }
    } 
    
    else {
        if (dist(this.nearest.x, this.nearest.y, this.x, this.y) > 80){
          this.x = lerp(this.x,this.nearest.x,0.01)
          this.y = lerp(this.y,this.nearest.y,0.01)
        }
      if(this.other != null){
        if (dist(this.other.x, this.other.y, this.x, this.y) > 100){
          this.x = lerp(this.x,this.other.x,0.01)
          this.y = lerp(this.y,this.other.y,0.01)
        }
      }
        this.brightness = 180;
    }
  }
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.velocity.x = lerp(this.velocity.x,0,0.002 * (this.radius+1))
  this.velocity.y = lerp(this.velocity.y,0,0.002 * (this.radius+1))
  }

  
  connect(other) {
    if(other != null){
      stroke(this.brightness);
      let selfcolor = color(this.color* (this.brightness / 180),this.color* (this.brightness / 180),this.color* (this.brightness / 180));
      let othercolor = color(other.color,other.color,other.color);
      //line(this.x, this.y, other.x, other.y)
      gradientLine(this.x, this.y, other.x, other.y, selfcolor, othercolor);
    }
  }
  
  display() {
    noStroke();
    fill(this.brightness);
    drawingContext.shadowBlur = this.brightness/15;
    drawingContext.shadowColor = color(this.color,this.color,this.color)//color(this.brightness,this.brightness,this.brightness);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    //ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  findNearest() {
    let nearest = null;
    let nearestDist = Infinity;
    for (let other of stars) {
      if (other !== this) {
        let d = dist(this.x, this.y, other.x, other.y);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = other;
        }
      }
    }
    return nearest;
  }
}

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

window.g_sleep = false;

//reset all stars to unlaunched state
function reset_star(){
  for (let star of stars) {
    star.launched = false;
  }
  for (let star of star_array) {
    star.launched = false;
  } 
}

function launch_star(){
  for (let star of stars) {
    if(!star.launched){
      star.to_launch = true;
    }
  }
  for (let star of star_array) {
    if(!star.launched){
      star.to_launch = true;
    }
  }
}

const leftBlock = document.querySelector("#leftBlock");
const rightBlock = document.querySelector("#rightBlock");

// Function to validate the username and password
function validateCredentials() {
  // Check if username and password are correct
  if (usernameInput.value === '8' && passwordInput.value === '8') {
    // If correct, redirect to the success page
    leftBlock.style.transform = "translateX(0)";
    leftBlock.style.opacity = "1";
    rightBlock.style.transform = "translateX(0)";
    rightBlock.style.opacity = "1";
    pageSucess = true;
    changePage();
    //setTimeout(changePage(), 20000);
  } else {
    // If incorrect, redirect to the error page

    leftBlock.style.transform = "translateX(0)";
    leftBlock.style.opacity = "1";
    leftBlock.style.background = "#380d0ac6";
    rightBlock.style.transform = "translateX(0)";
    rightBlock.style.opacity = "1";
    rightBlock.style.background = "#380d0ac6";
    pageSucess = false;
    changePage();
    //setTimeout(changePage(), 20000);

  }
}

let pageSucess = false;

async function changePage(){
  await delay();
  if(pageSucess)
{  window.location.href = 'pages/Success/Success.html';}
else{
  window.location.href = 'pages/Error/Error.html';
}

}


// Add event listener to the login button
loginBtn.addEventListener('click', function() {
  console.log('Button clicked!');
  validateCredentials();
});

function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}