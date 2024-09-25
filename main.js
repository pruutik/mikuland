const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const background = new Image();
background.src = "mikus/area_1.png";
const miku = new Image();
miku.src = "mikus/miku.png";

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

let scale = Math.max(canvas.width/background.width,canvas.height/background.height)

background.addEventListener("load", () => {
    ctx.drawImage(background, 0, 0, background.width * scale, background.height * scale);
});

function draw() {
    
}