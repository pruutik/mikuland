let bg, miku;
let mikus = [];
let wWidth, wHeight;
let zoom;
let dragtoggle = true;
let score = 0;
let scoreText;
let gameover = 60;
let bgm;

function preload(){
    bg = loadImage("mikus/area_1.png");
    for (let i = 1; i <= 10; i++) {
        mikus.push(loadImage("mikus/miku" + i + ".png"));
    }
    miku = mikus[1];
    viewfinder = loadImage("mikus/viewfinder.png");
    bgm = loadSound('bgm.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    wWidth = windowWidth;
    wHeight = windowHeight;

    zoom = createSlider(Math.max(wWidth/bg.width, wHeight/bg.height)*1.25,Math.max(wWidth/bg.width, wHeight/bg.height)*5,Math.max(wWidth/bg.width, wHeight/bg.height)*1.5,0);
    zoom.id('zoom-slider');
    zoom.style('transform','rotate(270deg)');
    zoom.style('width','30vh');
    zoom.style('right','calc(-15vh + 50px)');
    zoom.style('top','50vh');
    zoom.style('position','fixed');
    zoom.input(() => {
        if(windowWidth/2 + offset.x > bg.width/2 * zoom.value()){
            offset.x = -windowWidth/2 + bg.width/2 * zoom.value();
        }
        if(windowWidth/2 - offset.x > bg.width/2 * zoom.value()){
            offset.x = windowWidth/2 - bg.width/2 * zoom.value();
        }
        if(windowHeight/2 + offset.y > bg.height/2 * zoom.value()){
            offset.y = -windowHeight/2 + bg.height/2 * zoom.value();
        }

        if(windowHeight/2 - offset.y > bg.height/2 * zoom.value()){
            offset.y = windowHeight/2 - bg.height/2 * zoom.value();
        }
    });

    scoreText = createSpan('Score: #');
    scoreText.position(20,20);

    document.getElementById('zoom-slider').addEventListener('mouseover',() => {dragtoggle = false});
    document.getElementById('zoom-slider').addEventListener('mouseout',() => {dragtoggle = true});
    // currentpos = {x: bg.width/2-miku.width/2+10, y: 0};

    setInterval(() => {
        gameover -= 1;
        scoreText.html("Score: " + score.toFixed(0) + "<br>Time left: " + gameover);
    }, 1000);

    bgm.play();
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
    if(windowWidth/2 + (mouseX - anchor.x) < bg.width/2 * zoom.value() &&
    windowWidth/2 - (mouseX - anchor.x) < bg.width/2 * zoom.value() &&
    dragtoggle){
        offset.x = mouseX - anchor.x;
    }
    if(windowHeight/2 + (mouseY - anchor.y) < bg.height/2 * zoom.value() &&
    windowHeight/2 - (mouseY - anchor.y) < bg.height/2 * zoom.value() &&
    dragtoggle){
        offset.y = mouseY - anchor.y;
    }
    // console.log(offset.x);
    // console.log(bg.width/2*zoom.value());
    // console.log(windowWidth/2+offset.x);

    // console.log(windowHeight/2)
}

let movetime = 0;
let outfittime = 0;
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
    tint(255, 255);
    
    if(gameover < 0){
        stroke(255);
        strokeWeight(10);
        fill(0,210,33);
        rect(windowWidth/2 - 200, windowHeight/2 - 110, 370, 150, 10);
        scoreText.position(windowWidth/2 - 120,windowHeight/2 - 75);
        scoreText.style('text-align','center')
        scoreText.html("Game Over! <br> Score: " + score.toFixed(0))
        return;
    }

    if(abs(currentpos.x - newpos.x) > 30 && abs(currentpos.y - newpos.y) > 30){
        // console.log(currentpos);
        currentpos.x += movement.x;
        currentpos.y += movement.y;

        // offset.x = -currentpos.x * zoom.value();
        // offset.y = -currentpos.y * zoom.value();

        // offset.y = -currentpos.y * zoom.value() - windowHeight/2;
    }else{
        if(movetime<=0){
            movetime = randomNum(0,150);
            outfittime = randomNum(-50,movetime) + 50;
            movement = genMoveVector();
            // console.log(movement);
            // console.log(newpos);
            // console.log("Aaaaaa");
        }else{
            if(outfittime<=0){
                miku = mikus[Math.floor(randomNum(0,9))];
                outfittime = movetime + 150;
            }else{
                outfittime -= 1;
            }
            movetime -= 1;
        }
    }

    if(offset.x > -currentpos.x * zoom.value() - windowWidth/2 &&
        offset.y > -currentpos.y * zoom.value() - windowHeight/2 &&
        offset.x < -currentpos.x * zoom.value() + windowWidth/2 &&
        offset.y < -currentpos.y * zoom.value() + windowHeight/2){
        
        score += 0.005 * zoom.value() * zoom.value();
        scoreText.html("Score: " + score.toFixed(0) + "<br>Time left: " + gameover);
        // console.log(score);
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
    translate(-offset.x,-offset.y);
    tint(255, 90);
    image(viewfinder, -windowWidth/2, -windowHeight/2, windowWidth, windowHeight);
}