const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');



function resizeCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const portraitOverlay = document.getElementById('portrait-overlay');

    if (isPortrait) {
        portraitOverlay.style.display = 'block';
        return;
    } else {
        portraitOverlay.style.display = 'none';
    }

    let newWidth = window.innerWidth * devicePixelRatio;
    let newHeight = window.innerHeight * devicePixelRatio;

    canvas.width = newWidth;
    canvas.height = newHeight;
    canvas.style.width = `${newWidth / devicePixelRatio}px`;
    canvas.style.height = `${newHeight / devicePixelRatio}px`;

    scaleGameElements(devicePixelRatio);
    positionGameElements();
}

function scaleGameElements(ratio) {
    const basePlayerSize = 30; // Base size for the player
    const baseEnemySize = 30;  // Base size for enemies

    // Scale player and enemies
    player.size = basePlayerSize * ratio;
    enemies.forEach(enemy => {
        enemy.size = baseEnemySize * ratio;
    });

    // Update positions and sizes of other game elements if necessary
    
}
function positionGameElements() {
    // Reposition player, enemies, and other elements based on new canvas size
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;

    enemies.forEach(enemy => {
        enemy.x = Math.random() * (canvas.width - enemy.size);
        enemy.y = Math.random() * (canvas.height - enemy.size);
    });

    // Reposition other game elements if necessary
}
window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', resizeCanvas);







window.addEventListener('resize', resizeCanvas);

class Background {
    constructor() {
        this.elements = [];
    }

    generateRandomElements() {
        const types = ['ocean', 'rock', 'grass'];
        const elementCount = Math.floor(Math.random() * 5);
    
        for (let i = 0; i < elementCount; i++) {
            let redo = false;
            const type = types[Math.floor(Math.random() * types.length)];
    
            let x, y;
            let attempts = 0;
            const maxAttempts = 10; // Maximum attempts for positioning an element
    
            do {
                if (attempts++ > maxAttempts) {
                    // If maximum attempts reached, break from the loop
                    break;
                }
    
                // Random position logic
                if (Math.random() < 0.5) {
                    x = Math.random() < 0.5 ? player.x - canvas.width : player.x + canvas.width;
                    y = Math.random() * canvas.height;
                } else {
                    x = Math.random() * canvas.width;
                    y = Math.random() < 0.5 ? player.y - canvas.height : player.y + canvas.height;
                }
    
                // Check for overlap with existing elements
                redo = false;
                for(let element of this.elements) {
                    if (Math.abs(element.x - x) <= 2000 && Math.abs(element.y - y) <= 2000) {
                        redo = true;
                        break; 
                    }
                }
            } while (redo);
    
            // Check if a suitable position was found
            if (attempts <= maxAttempts) {
                const width = type === 'ocean' ? 300 : 50;
                const height = type === 'ocean' ? 200 : 50;
    
                // Add the new element if a suitable position was found
                this.elements.push({ type, x, y, width, height });
            }
        }
    }
    
    

    update(deltaX, deltaY) {
        // Update the position of each background element
        this.elements.forEach(element => {
            element.x -= deltaX;
            element.y -= deltaY;
        })
    };

    draw() {
        // Draw background elements without scaling
        this.elements.forEach(element => {
            if (element.type === 'ocean') {
                ctx.fillStyle = 'blue';
                ctx.fillRect(element.x, element.y, 1000, 1000); // Fixed size for ocean
            } else if (element.type === 'rock') {
                ctx.fillStyle = 'gray';
                ctx.fillRect(element.x, element.y, 500, 500); // Fixed size for rock
            }
            // ... other types ...
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

let horizontalKeys = []; // Stack to track horizontal keys pressed
let verticalKeys = [];   // Stack to track vertical keys pressed

function handleKeyDown(e) {
    const speed = 5;

    // Handle vertical movement
    if ((e.key === 'w' || e.key === 'W') && !verticalKeys.includes('W')) {
        verticalKeys.push('W');
        player.deltaY = -speed;
    }
    if ((e.key === 's' || e.key === 'S') && !verticalKeys.includes('S')) {
        verticalKeys.push('S');
        player.deltaY = speed;
    }

    // Handle horizontal movement
    if ((e.key === 'a' || e.key === 'A') && !horizontalKeys.includes('A')) {
        horizontalKeys.push('A');
        player.deltaX = -speed;
    }
    if ((e.key === 'd' || e.key === 'D') && !horizontalKeys.includes('D')) {
        horizontalKeys.push('D');
        player.deltaX = speed;
    }
}

function handleKeyUp(e) {
    // Handle vertical key release
    if (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S') {
        const index = verticalKeys.indexOf(e.key.toUpperCase());
        if (index !== -1) verticalKeys.splice(index, 1);

        if (verticalKeys.length === 0) {
            player.deltaY = 0;
        } else {
            player.deltaY = verticalKeys[verticalKeys.length - 1] === 'W' ? -5 : 5;
        }
    }

    // Handle horizontal key release
    if (e.key === 'a' || e.key === 'A' || e.key === 'd' || e.key === 'D') {
        const index = horizontalKeys.indexOf(e.key.toUpperCase());
        if (index !== -1) horizontalKeys.splice(index, 1); // Fixed line

        if (horizontalKeys.length === 0) {
            player.deltaX = 0;
        } else {
            player.deltaX = horizontalKeys[horizontalKeys.length - 1] === 'A' ? -5 : 5;
        }
    }
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

resizeCanvas(); 


updateGame();
