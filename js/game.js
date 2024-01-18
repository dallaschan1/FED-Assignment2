const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


function resizeCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const portraitOverlay = document.getElementById('portrait-overlay');
    const pcWidthPercentage = 0.95; // 90% of screen width for PC
    const pcHeightPercentage = 0.85; // 80% of screen height for PC
    const mobileWidthPercentage = 0.95; // 90% of screen width for mobile in landscape
    const mobileHeightPercentage = 0.8; // 80% of screen height for mobile in landscape

    if (isPortrait) {
        portraitOverlay.style.display = 'block';
        return;
    } else {
        portraitOverlay.style.display = 'none';
    }

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let newWidth, newHeight;

    if (screenWidth > 1024) { // Assuming screens wider than 1024px are PCs
        newWidth = screenWidth * pcWidthPercentage;
        newHeight = screenHeight * pcHeightPercentage;
    } else { // Mobile or iPad in landscape mode
        newWidth = screenWidth * mobileWidthPercentage;
        newHeight = screenHeight * mobileHeightPercentage;
    }

    canvas.width = newWidth * devicePixelRatio;
    canvas.height = newHeight * devicePixelRatio;
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;

    scaleGameElements(devicePixelRatio);
    positionGameElements();
}


function scaleGameElements(ratio) {
    const screenWidth = window.innerWidth;
    let basePlayerSize;
    const baseEnemySize = 30;  // Base size for enemies

    // Set different base sizes for player based on screen width
    if (screenWidth > 1024) { // Larger screens like PC
        basePlayerSize = 50; // Slightly larger player size for larger screens
    } else {
        basePlayerSize = 30; // Original size for smaller screens (phones, iPads)
    }
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
let colorChangeOffset = 0;
const colorChangeSpeed = 0.00005; 


function drawStaticBackground() {
    // Calculate the green value within a range for the color
    const greenValue = Math.floor(100 + 155 * Math.abs(Math.sin(colorChangeOffset)));
    const color = `rgb(0, ${greenValue}, 0)`;

    // Fill the background with the calculated color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


class Background {
    constructor() {
        this.elements = [];
    }

    generateRandomElements() {
        const types = ['ocean', 'rock'];
        const elementCount = Math.floor(Math.random() * 5);
        const minAdditionalDistance = 500;
const maxAdditionalDistance = 1000;

    
        for (let i = 0; i < elementCount; i++) {
            let redo = false;
            const type = types[Math.floor(Math.random() * types.length)];
    
            let x, y;
            let attempts = 0;
            const maxAttempts = 20; // Maximum attempts for positioning an element
    
            do {
                if (attempts++ > maxAttempts) {
                    // If maximum attempts reached, break from the loop
                    break;
                }
    
                // Random position logic
if (Math.random() < 0.5) {
    const additionalX = minAdditionalDistance + Math.random() * (maxAdditionalDistance - minAdditionalDistance);
    x = Math.random() < 0.5 ? player.x - canvas.width - additionalX : player.x + canvas.width + additionalX;
    y = Math.random() * canvas.height;
} else {
    const additionalY = minAdditionalDistance + Math.random() * (maxAdditionalDistance - minAdditionalDistance);
    x = Math.random() * canvas.width;
    y = Math.random() < 0.5 ? player.y - canvas.height - additionalY : player.y + canvas.height + additionalY;
}

    
                // Check for overlap with existing elements
                redo = false;
                for(let element of this.elements) {
                    if (Math.abs(element.x - x) <= 3000 && Math.abs(element.y - y) <= 3000) {
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
    
    checkCollisionWithPlayer(player) {
        for (let element of this.elements) {
            if (element.type === 'ocean') {
                // Check collision with a circular ocean element
                const dx = player.x - element.x;
                const dy = player.y - element.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < element.width * 1.5 + player.size / 2) {
                    return {horizontal: dx, vertical: dy};
            }
            } else if (element.type === 'rock') {
                // More accurate rock collision detection
                const rockLeft = element.x;
                const rockRight = element.x + element.width * 10;
                const rockTop = element.y;
                const rockBottom = element.y + element.height * 10;

                const playerLeft = player.x - player.size / 2;
                const playerRight = player.x + player.size / 2;
                const playerTop = player.y - player.size / 2;
                const playerBottom = player.y + player.size / 2;

                if (playerRight > rockLeft && playerLeft < rockRight &&
                    playerBottom > rockTop && playerTop < rockBottom) {
                    // Determine the side of collision
                    const overlapLeft = playerRight - rockLeft;
                    const overlapRight = rockRight - playerLeft;
                    const overlapTop = playerBottom - rockTop;
                    const overlapBottom = rockBottom - playerTop;

                    // Find which overlap is smallest to determine collision side
                    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

                    if (minOverlap === overlapLeft) {
                        player.x = rockLeft - player.size / 2;
                        return { horizontal: -player.deltaX, vertical: 0 };
                    } else if (minOverlap === overlapRight) {
                        player.x = rockRight + player.size / 2;
                        return { horizontal: player.deltaX, vertical: 0 };
                    }

                    if (minOverlap === overlapTop) {
                        player.y = rockTop - player.size / 2;
                        return { horizontal: 0, vertical: -player.deltaY };
                    } else if (minOverlap === overlapBottom) {
                        player.y = rockBottom + player.size / 2;
                        return { horizontal: 0, vertical: player.deltaY };  
                    }
                }
            
            }
        }
        return null;
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
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.width * 1.5, 0, 2 * Math.PI);
                ctx.fill();
            } else if (element.type === 'rock') {
                ctx.fillStyle = 'gray';
                ctx.fillRect(element.x, element.y, element.width * 10, element.height * 10); 
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

    colorChangeOffset += (Math.abs(player.deltaX) + Math.abs(player.deltaY)) * colorChangeSpeed;

    drawStaticBackground();

    // Check for collisions with background elements
    const collision = background.checkCollisionWithPlayer(player);
    if (collision) {
        // Adjust player's movement based on collision direction
        if (collision.horizontal > 0 && player.deltaX < 0 || collision.horizontal < 0 && player.deltaX > 0) {
            player.deltaX = 0;
        }
        if (collision.vertical > 0 && player.deltaY < 0 || collision.vertical < 0 && player.deltaY > 0) {
            player.deltaY = 0;
        }
    }

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
