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

class Background {
    constructor() {
        this.elements = [];
    }

    generateRandomElements() {
        const types = ['ocean', 'rock', 'grass'];
        const elementCount = 5; 

        for (let i = 0; i < elementCount; i++) {
            const type = types[Math.floor(Math.random() * types.length)];

          
            let x, y;
            if (Math.random() < 0.5) {
              
                x = Math.random() < 0.5 ? player.x - canvas.width : player.x + canvas.width;
                y = Math.random() * canvas.height;
            } else {
                
                x = Math.random() * canvas.width;
                y = Math.random() < 0.5 ? player.y - canvas.height : player.y + canvas.height;
            }

            const width = type === 'ocean' ? 300 : 50; // Example sizes
            const height = type === 'ocean' ? 200 : 50;

            this.elements.push({ type, x, y, width, height });
        }
    }

    update(deltaX, deltaY) {
        // Update the position of each background element
        this.elements.forEach(element => {
            element.x -= deltaX;
            element.y -= deltaY;
        });
    }

    draw() {
      
        this.elements.forEach(element => {
            if (element.type === 'ocean') {
                // Draw ocean
                ctx.fillStyle = 'blue';
                ctx.fillRect(element.x, element.y, element.width, element.height);
            } else if (element.type === 'rock') {
                // Draw rock
                ctx.fillStyle = 'gray';
                ctx.fillRect(element.x, element.y, element.width, element.height);
            }
            
        });
    }
}


class Player {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.deltaX = 0;
        this.deltaY = 0;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}

class Enemy {
    constructor(size) {
        this.x = Math.random() * (canvas.width - 30);
        this.y = Math.random() * (canvas.height - 30);
        this.size = size;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.size);
        ctx.lineTo(this.x + this.size, this.y + this.size);
        ctx.lineTo(this.x - this.size, this.y + this.size);
        ctx.closePath();
        ctx.fill();
    }
}
const player = new Player(canvas.width / 2, canvas.height / 2, 50);
const enemies = [];
function addEnemy() {
    const size = 30;
    const enemy = new Enemy(size);
    enemies.push(enemy);
}

setInterval(addEnemy, 3000);

function handleKeyDown(e) {
    const speed = 5;
    if (e.key === 'w' || e.key === 'W') player.deltaY = -speed;
    if (e.key === 's' || e.key === 'S') player.deltaY = speed;
    if (e.key === 'a' || e.key === 'A') player.deltaX = -speed;
    if (e.key === 'd' || e.key === 'D') player.deltaX = speed;
}

function handleKeyUp(e) {
    if (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S') player.deltaY = 0;
    if (e.key === 'a' || e.key === 'A' || e.key === 'd' || e.key === 'D') player.deltaX = 0;
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);


function drawBackground() {
    const gridSize = 50;
    for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.strokeStyle = 'lightgray';
            ctx.strokeRect(x, y, gridSize, gridSize);
        }
    }
}

const background = new Background();
setInterval(() => {
    background.generateRandomElements();
}, 1000); 

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    

    // Update background and enemies with player's movement
    background.update(player.deltaX, player.deltaY);
    enemies.forEach(enemy => {
        enemy.x -= player.deltaX;
        enemy.y -= player.deltaY;
    });

    background.draw();
    player.draw();
    enemies.forEach(enemy => enemy.draw());
    requestAnimationFrame(updateGame);
}



updateGame();
