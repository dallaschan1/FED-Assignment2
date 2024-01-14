const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');





// Function to resize the canvas
function resizeCanvas() {
    
    if (window.screen.width <= 1366 && window.screen.height <= 768) {
        
        let newWidth = document.documentElement.clientWidth - 100;
        newWidth = Math.max(newWidth, 0);
        canvas.width = newWidth;
        canvas.height = window.innerHeight / 2;
    } else {
        let newWidth = document.documentElement.clientWidth - 100;
        newWidth = Math.max(newWidth, 0);
        canvas.width = newWidth;
        canvas.height = window.innerHeight;
        
    }
    
    

}
    
resizeCanvas();


window.addEventListener('resize', resizeCanvas);
