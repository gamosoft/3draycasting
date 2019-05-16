
let walls = [];
let ray;
let particle;
// Automatic movement with perlin noise
let xoff = 0;
let yoff = 10000; // if 0 only diagonal movement

const sceneW = 400;
const sceneH = 400;
let sliderFOV;

function setup() {
    createCanvas(800, 400);
    for (let i = 0; i < 5; i++) {
        let x1 = random(sceneW);
        let y1 = random(sceneH);
        let x2 = random(sceneW);
        let y2 = random(sceneH);
        walls.push(new Boundary(x1, y1, x2, y2));
    }
    walls.push(new Boundary(0, 0, sceneW-1, 0));
    walls.push(new Boundary(sceneW-1, 0, sceneW-1, sceneH-1));
    walls.push(new Boundary(sceneW-1, sceneH-1, 0, sceneH-1));
    walls.push(new Boundary(0, sceneH-1, 0, 0));

    //ray = new Ray(100, 200);
    //ray = new Ray(createVector(100, 200), 0);
    particle = new Particle();

    sliderFOV = createSlider(0, 360, 45);
    sliderFOV.input(changeFOV);
    
}

function changeFOV() {
    const fov = sliderFOV.value();
    particle.updateFOV(fov);
}

function keyPressed() {
    // if (key == 'a') {
    //     particle.rotate(0.1);
    // } else if (key == 's') {
    //     particle.rotate(-0.1);
    // }
}

var x = 0;
var y = 0;

function draw() {
    // 3D => https://www.youtube.com/watch?v=vYgIKn7iDH8
    if (keyIsDown(LEFT_ARROW)) {
        particle.rotate(-0.1);
    } else if (keyIsDown(RIGHT_ARROW)) {
        particle.rotate(0.1);
    } else if (keyIsDown(UP_ARROW)) {
        particle.move(2);
    } else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-2);
    }
    background(0);
    for (let wall of walls) {
        wall.show();
    }
    // particle.update(mouseX, mouseY);
    // particle.update(noise(xoff) * sceneW, noise(yoff) * sceneH);
    // xoff += 0.01;
    // yoff += 0.01;
    particle.show();
    const scene = particle.look(walls);
    const w = sceneW / scene.length;
    push();
    translate(sceneW, 0);
    for (let i = 0; i < scene.length; i++) {
        noStroke();
        const sq = scene[i]*scene[i];
        const wSq = sceneW*sceneW;
        //const b = map(scene[i], 0, sceneW, 255, 0); // Brightness
        const b = map(sq, 0, wSq, 255, 0); // Brightness
        const h = map(scene[i], 0, sceneW, sceneH, 0); // Height
        fill(b);
        rectMode(CENTER);
        rect(i * w + w / 2, sceneH / 2, w+1, h);        
    }
    pop();
    //ray.lookAt(mouseX, mouseY);
    //ray.show();
    // let pt = ray.cast(wall);
    // // console.log(pt);
    // if (pt) {
    //     fill(255);
    //     ellipse(pt.x, pt.y, 8, 8);
    // }
}
