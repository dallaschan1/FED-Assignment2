// Creating the Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = 2400;
const canvasHeight = canvas.height = 800;

const playerImage = new Image();
playerImage.src = "../images/shadow_dog.png";

function animate(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    requestAnimationFrame(animate);
}