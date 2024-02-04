const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const bullets = [];
let mouseX = 0;
let mouseY = 0;
let enemySpawnIntervalId = null; // Store the interval ID


let gameStarted = false;


function initializePointerLock() {
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
    // Event listeners for pointer lock state changes
    document.addEventListener('pointerlockchange', lockChangeAlert, false);
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
    document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);
}

function startGame() {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('pauseMenu').style.display = 'none';
    canvas.style.display = 'block';
    gameStarted = true;
    initializePointerLock();
    canvas.requestPointerLock();
    updateGame();
    if (enemySpawnIntervalId === null) {
        enemySpawnIntervalId = setInterval(addEnemy, 3000);
    }
}

function continueGame() {
    document.getElementById('pauseMenu').style.display = 'none';
    canvas.style.display = 'block';

    // Instead of directly requesting pointer lock here,
    // Prompt the user to click on the canvas to continue.
    let continuePrompt = document.createElement('div');
    continuePrompt.innerText = 'Click on the game to continue';
    continuePrompt.style.position = 'absolute';
    continuePrompt.style.top = '50%';
    continuePrompt.style.left = '50%';
    continuePrompt.style.transform = 'translate(-50%, -50%)';
    continuePrompt.style.color = 'white';
    continuePrompt.style.fontSize = '24px';
    continuePrompt.style.zIndex = '1000'; // Ensure it's visible above the canvas
    document.body.appendChild(continuePrompt);

    // Use a one-time click listener on the canvas to request pointer lock and remove the prompt
    canvas.addEventListener('click', function handleCanvasClick() {
        if (!gameStarted) {
            gameStarted = true;
            // Assuming 'updateGame' is your game loop or a function that needs to be called to resume game updates
            updateGame(); // Make sure this function is designed to resume or continue the game's logic
            
            // Restart enemy spawning if it's controlled separately from 'updateGame'
            if (enemySpawnIntervalId === null) {
                enemySpawnIntervalId = setInterval(addEnemy, 3000);
            }
        }
        canvas.requestPointerLock();
        document.body.removeChild(continuePrompt);
        canvas.removeEventListener('click', handleCanvasClick);
    }, {once: true});
}

function restartGame() {
    location.reload(); // Refresh the page to reset the game state
}

function lockChangeAlert() {
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas ||
        document.webkitPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        document.addEventListener("mousemove", updatePosition, false);
    } else {
        console.log('The pointer lock status is now unlocked');
        document.removeEventListener("mousemove", updatePosition, false);
        gameStarted = false;
        if (enemySpawnIntervalId !== null) {
            clearInterval(enemySpawnIntervalId);
            enemySpawnIntervalId = null;
        }
        document.getElementById('pauseMenu').style.display = 'block';
        canvas.style.display = 'none';
    }
}

window.onload = function() {
    const playButton = document.getElementById('playButton');
    playButton.addEventListener('click', startGame);
    document.getElementById('continueButton').addEventListener('click', continueGame);
    document.getElementById('restartButton').addEventListener('click', restartGame);
};


// Remember to bind the lockChangeAlert function to the pointerlockchange event for it to be called appropriately
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);


function resizeCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const portraitOverlay = document.getElementById('portrait-overlay');
    const pcWidthPercentage = 0.98; // 90% of screen width for PC
    const pcHeightPercentage = 0.98; // 80% of screen height for PC
    const mobileWidthPercentage = 0.85; // 90% of screen width for mobile in landscape
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

class Bullet {
    constructor(x, y, velocityX, velocityY, size = 10, damage = 50) {
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.size = size;
        this.damage = damage;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
function checkBulletEnemyCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            // Simple collision detection (can be improved)
            if (bullet.x > enemy.x - enemy.size && bullet.x < enemy.x + enemy.size &&
                bullet.y > enemy.y - enemy.size && bullet.y < enemy.y + enemy.size) {
                enemy.takeDamage(bullet.damage);
                bullets.splice(bulletIndex, 1); // Remove the bullet after it hits an enemy
                break; // Stop checking for further collisions since the bullet is removed
            }
        }
    });
}



function updatePosition(e) {
    mouseX += e.movementX;
    mouseY += e.movementY;
    // Adjust the values of mouseX and mouseY to ensure they stay within the canvas bounds
    mouseX = Math.max(0, Math.min(canvas.width, mouseX));
    mouseY = Math.max(0, Math.min(canvas.height, mouseY));
}

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);

function scaleGameElements(ratio) {
    const screenWidth = window.innerWidth;
    let basePlayerSize;
    const baseEnemySize = 30;  // Base size for enemies

    // Set different base sizes for player based on screen width
    if (screenWidth > 1024) { // Larger screens like PC
        basePlayerSize = 50; 
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
        const minAdditionalDistance = 300;
        const maxAdditionalDistance = 1000;

    
        for (let i = 0; i < elementCount; i++) {
            let redo = false;
            const type = types[Math.floor(Math.random() * types.length)];
    
            let x, y;
            let attempts = 0;
            const maxAttempts = 30; // Maximum attempts for positioning an element
    
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
                    if (Math.abs(element.x - x) <= 2000 && Math.abs(element.y - y) <= 2000) {
                        redo = true;
                        break; 
                    }
                }
            } while (redo);
    
            // Check if a suitable position was found
            if (attempts <= maxAttempts) {
                const width = type === 'ocean' ? 300 : 500;
                const height = type === 'ocean' ? 200 : 500;
    
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
            }else if (element.type === 'rock') {
                // Collision detection for rock elements
                const playerCenterX = player.x;
                const playerCenterY = player.y;
                const rockCenterX = element.x + element.width / 2;
                const rockCenterY = element.y + element.height / 2;
    
                if (Math.abs(playerCenterX - rockCenterX) < (player.size / 2 + element.width / 2) &&
                    Math.abs(playerCenterY - rockCenterY) < (player.size / 2 + element.height / 2)) {
                    // Calculate overlap in both directions
                    const overlapX = player.size / 2 + element.width / 2 - Math.abs(playerCenterX - rockCenterX);
                    const overlapY = player.size / 2 + element.height / 2 - Math.abs(playerCenterY - rockCenterY);
                    
                    // Return the direction and magnitude of the overlap
                    return {
                        horizontal: (playerCenterX < rockCenterX) ? -overlapX : overlapX,
                        vertical: (playerCenterY < rockCenterY) ? -overlapY : overlapY
                    };
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
        
        this.elements.forEach(element => {
            if (element.type === 'ocean') {
                ctx.fillStyle = 'blue';
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.width * 1.5, 0, 2 * Math.PI);
                ctx.fill();
            } else if (element.type === 'rock') {
                ctx.fillStyle = 'gray';
                ctx.fillRect(element.x, element.y, 500, 500); 
            }
          
        });
    }
}

let lastShotTime = 0;
let playerPoints = 0; // Variable to track player points

function getShootingCooldown() {
    
    // As points increase, the cooldown decreases
    if (playerPoints < 10) {
        return 1000; // 1 second
    } else if (playerPoints < 20) {
        return 800; // 0.8 seconds
    } else {
        return 600; // 0.6 seconds
    }
}



class Player {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.deltaX = 0;
        this.deltaY = 0;
        this.hp = 200;
        this.isHit = false;
        this.hitDuration = 0;
        this.knockbackVelocityX = 0;
        this.knockbackVelocityY = 0;
        this.knockbackDuration = 0;
        this.weaponUnlocked = false;
        this.weapon = new SpinningWeapon(this, 250, 30, 20);
    }


    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            // Handle player defeat (e.g., end game, restart level)
        }
    
        this.isHit = true;
        this.hitDuration = 10;
    }

    applyKnockback(knockbackX, knockbackY, duration) {
        this.knockbackVelocityX = knockbackX / duration;
        this.knockbackVelocityY = knockbackY / duration;
        this.knockbackDuration = duration;
    }
    update() {
        if (this.knockbackDuration > 0) {
            // Apply knockback effect
            background.elements.forEach(element => {
                element.x -= this.knockbackVelocityX;
                element.y -= this.knockbackVelocityY;
            });
            enemies.forEach(enemy => {
                enemy.x -= this.knockbackVelocityX;
                enemy.y -= this.knockbackVelocityY;
            });

            this.knockbackDuration--;
        }
        if (playerPoints >= 3) {
            this.weaponUnlocked = true;
        }
        if (this.weaponUnlocked) {
            this.weapon.update();
        }
    }
    draw() {
        if (this.hitDuration > 0) {
            ctx.fillStyle = 'orange'; // Change color when hit
            this.hitDuration--;
        } else {
            ctx.fillStyle = 'blue';
        }
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        if (this.weaponUnlocked) {
            this.weapon.draw();
        }
    }

    shoot() {
        const now = Date.now();
        const shootingCooldown = getShootingCooldown();

        if (now - lastShotTime >= shootingCooldown) {
            lastShotTime = now;
            const bulletVelocity = 10; // Speed of the bullet
            const lineLength = 100; // Length of the aiming line (should match the length used for drawing the line)
            const angle = Math.atan2(mouseY - this.y, mouseX - this.x); // Angle towards the cursor

            // Calculate the start position of the bullet at the tip of the aiming line
            const bulletStartX = this.x + lineLength * Math.cos(angle);
            const bulletStartY = this.y + lineLength * Math.sin(angle);

            // Calculate bullet velocity
            const velocityX = Math.cos(angle) * bulletVelocity;
            const velocityY = Math.sin(angle) * bulletVelocity;

            // Create the bullet at the start position
            const bulletSize = 10; // Set the desired bullet size
            const bullet = new Bullet(bulletStartX, bulletStartY, velocityX, velocityY, bulletSize);
            bullets.push(bullet);
        }
    }
}

class Enemy {
    constructor(size, hp, speed) {
        this.x = Math.random() * (canvas.width - 30);
        this.y = Math.random() * (canvas.height - 30);
        this.size = size;
        this.hp = hp;
        this.speed = speed;
        this.wanderAngle = 0; 
        
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            playerPoints++;
            const index = enemies.indexOf(this);
            if (index > -1) {
                enemies.splice(index, 1);
            }
        }
    }
    update() {
        // Update the wander angle with a small random change
        this.wanderAngle += (Math.random() - 0.5) * 0.2; 

        // Limit the wander angle to prevent extreme deviations
        const maxWander = Math.PI / 3; // Maximum deviation angle (e.g., 45 degrees)
        this.wanderAngle = Math.max(Math.min(this.wanderAngle, maxWander), -maxWander);

        // Calculate the angle towards the player with added randomness
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const angleToPlayer = Math.atan2(dy, dx) + this.wanderAngle;

        // Move the enemy towards the player with wandering effect
        this.x += Math.cos(angleToPlayer) * this.speed;
        this.y += Math.sin(angleToPlayer) * this.speed;
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


function checkPlayerEnemyCollisions() {
    enemies.forEach(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
       if (distance < enemy.size + player.size / 2) {
            player.takeDamage(10); // Player loses 10 HP

            // Apply smoother knockback
            const knockbackStrength = 100;
            const knockbackX = dx / distance * knockbackStrength;
            const knockbackY = dy / distance * knockbackStrength;
            const knockbackDuration = 10; // Duration of the knockback in frames
            player.applyKnockback(knockbackX, knockbackY, knockbackDuration);
        }
    });
}

class SpinningWeapon {
    constructor(player, orbitRadius, weaponRadius, damage) {
        this.player = player;
        this.orbitRadius = orbitRadius;
        this.weaponRadius = weaponRadius;
        this.damage = damage;
        this.angle = 0; // Starting angle
        this.rotationSpeed = 0.05; // Speed of rotation
        this.lastHitTime = new Map(); // Map to store the last hit time for each enemy
        this.hitCooldown = 1000; 
    }

    update() {
        this.angle += this.rotationSpeed; // Rotate the weapon around the player
    }

    draw() {
        const x = this.player.x + this.orbitRadius * Math.cos(this.angle);
        const y = this.player.y + this.orbitRadius * Math.sin(this.angle);

        ctx.beginPath();
        ctx.arc(x, y, this.weaponRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    checkCollisionWithEnemy(enemy) {
        const now = Date.now();
        const x = this.player.x + this.orbitRadius * Math.cos(this.angle);
        const y = this.player.y + this.orbitRadius * Math.sin(this.angle);

        const dx = x - enemy.x;
        const dy = y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < enemy.size + this.weaponRadius) {
            // Check if enough time has passed since the last hit
            if (!this.lastHitTime.has(enemy) || now - this.lastHitTime.get(enemy) > this.hitCooldown) {
                enemy.takeDamage(this.damage);
                this.lastHitTime.set(enemy, now); // Update last hit time
            }
        }
    }
}


const player = new Player(canvas.width / 2, canvas.height / 2, 50);
const enemies = [];
function addEnemy() {
    const size = 30;
    const baseHP = 100; // Base HP of enemies
    const baseSpeed = 1; // Base speed of enemies

    // Scaling factors for enemy HP and speed
    const hpScalingFactor = 0.5; // Increase in HP per point
    const speedScalingFactor = 0.01; // Increase in speed per point

    // Calculate enemy HP and speed based on player points
    const enemyHP = baseHP + playerPoints * hpScalingFactor;
    const enemySpeed = baseSpeed + playerPoints * speedScalingFactor;

    const enemy = new Enemy(size, enemyHP, enemySpeed);
    enemies.push(enemy);
}


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

let isMouseDown = false;

canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
    player.shoot();
    
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});


function drawPoints() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top'; // Ensure text is drawn from the top
    ctx.fillText(`Points: ${playerPoints}`, canvas.width / 2, 20); // Adjust Y position as needed
}

function updateGame() {
    if (!gameStarted) {
        return; // Stop the function if the game hasn't started
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    colorChangeOffset += (Math.abs(player.deltaX) + Math.abs(player.deltaY)) * colorChangeSpeed;

    drawStaticBackground();

    if (isMouseDown && Date.now() - lastShotTime >= getShootingCooldown()) {
        player.shoot();
        lastShotTime = Date.now();
    }

    // Update and draw bullets
    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();

        // Remove bullets that are off-screen
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(index, 1);
        }
    });
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
    const lineLength = 100; // Fixed length of the line
    const lineWidth = 10; // Thickness of the line
    ctx.strokeStyle = 'red';
    ctx.lineWidth = lineWidth;

    checkBulletEnemyCollisions();

    // Calculate the angle towards the cursor
    const angle = Math.atan2(mouseY - player.y, mouseX - player.x);

    // Calculate the end coordinates of the line based on the fixed length
    const endX = player.x + lineLength * Math.cos(angle);
    const endY = player.y + lineLength * Math.sin(angle);

    // Draw the line
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Update background and enemies with player's movement
    background.update(player.deltaX, player.deltaY);
    enemies.forEach(enemy => {
        enemy.x -= player.deltaX;
        enemy.y -= player.deltaY;
    });
    player.update();
    if (player.weaponUnlocked) {
        enemies.forEach(enemy => {
            player.weapon.checkCollisionWithEnemy(enemy);
        });
    }

    enemies.forEach(enemy => enemy.update());
    checkPlayerEnemyCollisions();

    background.draw();
    player.draw();
    enemies.forEach(enemy => enemy.draw());

    drawPoints();
    requestAnimationFrame(updateGame);
}


resizeCanvas(); 


updateGame();
