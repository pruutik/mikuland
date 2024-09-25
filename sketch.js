let bg;
let wWidth, wHeight;
let scale;

function preload(){
    bg = loadImage("mikus/area_1.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    wWidth = windowWidth;
    wHeight = windowHeight;
    scale = Math.max(wWidth/bg.width, wHeight/bg.height);
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

function draw() {
    image(bg,0,0, bg.width * scale,windowHeight)
}