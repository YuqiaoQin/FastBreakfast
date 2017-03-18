var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var state = 0;
//blured pan
var count = 0;
// fried egg
var r = 120;
var threshold = 50;
var turned = false;
var yolkColor;
var eggColor;
var preAccelerationZ = 0;
var yolkradius;
var timing = 0;
var yolkR;

// shaken pepper
var world;
var boundaries = [];
var seeds = []; //pepper
var effector;
var spring;
var number=0;

// // squeeze ketchup
// var increment = 40;
// var speed = 0.31;


function preload() {
  img1 = loadImage("pan.png");
  img2 = loadImage("pan1.png");
  img3 = loadImage("bottle.png");
  img4 = loadImage("bottle1.png");
  // img5 = loadImage("ketchup0.png");
  // img6 = loadImage("ketchup1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(226,215,208);

  //main controller

  if (state === 0) {
    bluredPan();
  }
  
  yolkColor = color(255, 241, 184);
  eggColor = color(255);

  //pepper booundary
  world = createWorld();

  boundaries.push(new Boundary(width / 4, height - 120, width / 2 - 20, 10)); 
  boundaries.push(new Boundary(3 * width / 4, height - 120, width / 2 - 20, 10));
  boundaries.push(new Boundary(3 * width / 4 - 5, 200, 10, height + 300)); //right
  boundaries.push(new Boundary(width / 4 + 25, 200, 10, height + 300)); //left
  boundaries.push(new Boundary(width / 4 + 30, height - 530, width / 2 + 80, 10)); // the top

  for (var i = 0; i < 110; i++) {
    seeds.push(new Element(width / 2, height / 2));
  }

  effector = new Element2(width / 2, height / 2 + 100);
  spring = new Spring();
  
  if(state===3){
  
  image(img5,0,0,320,550);
  
  }

}

function draw() {
  if (state === 1) {
    friedEgg();
  } else if (state === 2) {
    pepperShaken();
  }
   
//   }else if(state===3){
//     squeezeKetchup();
//     // image(img5,0,0,320,550);
    
//   }
}
function clearScreen(){

}
function bluredPan() {
  image(img2, 0, 0, windowWidth, windowHeight);
  img1.resize(windowWidth, windowHeight);
  img1.loadPixels();
}

function touchMoved() {
  if (state === 0) {
    var col = img1.get(touchX, touchY, 30, 30);
    image(col, touchX, touchY, 30, 30);
    count++;
    if (count > 800) {
      state = 1;
    }
  }
  
//   if(state===3){
//   increment -= speed;
 
//   var color=img6.get(touchX, touchY);
      
//   fill(color);
//   copy(img6, touchX,touchY, 30, 30, touchX, touchY, 30, 30);
// }
}


function friedEgg() {

  yolkR = yolkradius + 10;

  noStroke();
  fill(eggColor);
  ellipse(width / 2 - 20 * cos(30 / 180 * PI), height / 2 - 20 * sin(30 / 180 * PI + 40) - 80, r);
  ellipse(width / 2 - 20 * cos(120 / 180 * PI), height / 2 - 20 * sin(120 / 180 * PI + 40) - 80, r);
  ellipse(width / 2 - 20 * cos(240 / 180 * PI), height / 2 - 20 * sin(240 / 180 * PI + 40) - 80, r);

  if (turned) {
    yolkColor = color(255, 233, 138);
    eggColor = color(255, 250, 230);
    yolkradius = 130;
    yolkR = yolkradius - 10;
    timing++;
    if (timing > 130) {
      state = 2;
    }

  } else {
    yolkColor = color(255, 241, 184);
    yolkradius = 100;
    eggColor = color(255);
    yolkR = yolkradius + 10;
  }

  //york 
  for (var i = 20; i < 150; i += 5) {
    fill(255, 241, 184, i);
  }
  ellipse(width / 2 + accelerationY, height / 2 + accelerationX - 60, yolkR);
  fill(yolkColor);
  ellipse(width / 2 + accelerationY, height / 2 + accelerationX - 60, yolkradius);


  // turn egg
  if (preAccelerationZ < threshold && accelerationZ >= threshold) {
    turned = !turned;
  }
  preAccelerationZ = accelerationZ;
}

function deviceMoved() {
  if (state === 1) {
    setMoveThreshold(10);
    r = r + 1;
    if (r > 250) {
      r = 250;
    }
  }
}

function pepperShaken() {
  background(204,204,200);
  
  image(img3, 15, -7, 345, 580);
  var timeStep = 1.0 / 30;
  world.Step(timeStep, 10, 10);

  for (var i = seeds.length - 1; i >= 0; i--) {
    seeds[i].display();
    if (seeds[i].done()) {
      seeds.splice(i, 1);
    }
    if (seeds.length === 0) {
    
      state = 3;
      clear();
     
    }
  }
  effector.display();
  spring.display();
  spring.update(mouseX, mouseY); //update with your own position!!!

  image(img4, 15, -7, 345, 580);
}

// function squeezeKetchup(){
  
//   img6.resize(320,550);
//   img6.loadPixels();
  
//   fill(210,130,120);
//   noStroke();
//   smooth();
  
  
//   push();
//   beginShape();
// 	vertex(63, 67);
// 	vertex(81, 77);
// 	vertex(102, 65);
// 	vertex(112, 80);
//   vertex(128, 56);
// 	vertex(136, 78);
// 	vertex(153, 65);
// 	vertex(162, 78);
//   vertex(183, 64);
//   vertex(187, 74);
//   vertex(206, 57);
//   vertex(220, 74);
//   vertex(235, 63);
//   vertex(244, 78);
//   vertex(258, 67);
//   vertex(258, 83);
//   vertex(280, 67);
//   bezierVertex(280 - 2*increment, increment, 100 + 2*increment, increment, 63, 67);
// 	endShape();
//   pop();
// } 


function mouseReleased() {
  if (state === 2) {
    spring.destroy();
   
  }
}

function mousePressed() {
  if (state === 2) {
    if (effector.contains(mouseX, mouseY)) {
      spring.bind(mouseX, mouseY, effector);
    }
   
  }


}