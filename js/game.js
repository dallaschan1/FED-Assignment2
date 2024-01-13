const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');



// Function to resize the canvas
function resizeCanvas() {
    
    let newWidth = document.documentElement.clientWidth - 100;
    newWidth = Math.max(newWidth, 0);
    canvas.width = newWidth;
    canvas.height = window.innerHeight / 2;

}
    
resizeCanvas();


window.addEventListener('resize', resizeCanvas);
