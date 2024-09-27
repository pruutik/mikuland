let bg, miku;
let wWidth, wHeight;
let zoom;

function preload(){
    bg = loadImage("mikus/area_1.png");
    miku = loadImage("mikus/miku.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    wWidth = windowWidth;
    wHeight = windowHeight;
    zoom = createSlider(Math.max(wWidth/bg.width, wHeight/bg.height),Math.max(wWidth/bg.width, wHeight/bg.height)*10,0,0);
    zoom.position(0,windowHeight/2);
    zoom.style('transform','rotate(270deg)');
    zoom.style('height','30vh');
    zoom.style('right','10px');
    zoom.style('left','auto');
    zoom.style('position','fixed');
    // currentpos = {x: bg.width/2-miku.width/2+10, y: 0};
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// const canvas = document.getElementById("myCanvas");
// const ctx = canvas.getContext("2d");
// const background = new Image();
// background.src = "mikus/area_1.png";
// const miku = new Image();
// miku.src = "mikus/miku.png";

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;


// background.addEventListener("load", () => {
//     ctx.drawImage(background, 0, 0, background.width * scale, background.height * scale);
// });
function randomNum(min, max) { // min and max included 
    return Math.random() * (max - min + 1) + min;
}

let anchor = {x:0,y:0};
let offset = {x:0,y:0};
function mousePressed() {
    anchor.x = mouseX - offset.x;
    anchor.y = mouseY - offset.y;
}
function mouseDragged() {
    offset.x = mouseX - anchor.x;
    offset.y = mouseY - anchor.y;
}

let movetime = 0;
let currentpos = {x: 0, y: 0};
let movement = {x: 0, y: 0};
let newpos = {x: 0, y: 0};
function genMoveVector() {
    const speed = 1; // defines how fast miku moves
    let diff = {};
    newpos.x = randomNum(-bg.width/2+miku.width/2-10,bg.width/2-miku.width/2+10);
    newpos.y = randomNum(-bg.height/2+miku.height/2+65,bg.height/2-miku.height/2+35);
    diff.x = -currentpos.x + newpos.x;
    diff.y = -currentpos.y + newpos.y;
    // console.log(diff);
    let magnitude = sqrt((diff.x * diff.x) + (diff.y * diff.y));
    let shrink = speed/magnitude;
    let movement = {};
    movement.x = diff.x * shrink;
    movement.y = diff.y * shrink;
    return movement;
}

function draw() {
    noSmooth();

    if(abs(currentpos.x - newpos.x) > 30 && abs(currentpos.y - newpos.y) > 30){
        console.log(currentpos);
        currentpos.x += movement.x;
        currentpos.y += movement.y;
    }else{
        if(movetime<=0){
            movetime = randomNum(0,100)
            movement = genMoveVector();
            console.log(movement);
            console.log(newpos);
            console.log("Aaaaaa");
        }else{
            movetime -= 1;
        }
    }

    //zoom
    translate(windowWidth/2,windowHeight/2);
    translate(offset.x,offset.y);
    scale(zoom.value());

    image(bg,-bg.width/2,-bg.height/2);
    image(miku,-miku.width/2 + currentpos.x,-miku.height/2 + currentpos.y);
    // console.log(zoom.value())

    //statics
    scale(1/zoom.value());
}