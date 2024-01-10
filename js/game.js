// Creating the Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = 1000;
const canvasHeight = canvas.height = 500;
let jumpCooldown = 0;
const jumpCooldownTime = 0.8 + (100 / 1000);


// Player properties
const player = {
    x: 50,
    y: 200,
    width: 30,
    height: 30,
    dx: 0,
    dy: 0,
    speed: 4,
    gravity: 0.2,
    jumpForce:7,
    onGround: true,
    hasDoubleJumped: false,
};

// Key State Tracking
const keys = {
    a: false,
    d: false,
    space: false
};

// Walls and Spikes
const walls = [
    { x: 100, y: 400, width: 200, height: 50 },
    
];

const spikes = [
    { x: 500, y: canvasHeight - 30, size: 30 },
    
];

// Drawing Functions
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawWalls() {
    ctx.fillStyle = 'grey';
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

function drawSpikes() {
    ctx.fillStyle = 'red';
    spikes.forEach(spike => {
        ctx.beginPath();
        ctx.moveTo(spike.x, spike.y);
        ctx.lineTo(spike.x + spike.size / 2, spike.y - spike.size);
        ctx.lineTo(spike.x + spike.size, spike.y);
        ctx.closePath();
        ctx.fill();
    });
}

// Player Update Function
function updatePlayer() {
    // Handle horizontal movement
    if (keys.a) player.dx = -player.speed;
    else if (keys.d) player.dx = player.speed;
    else player.dx = 0;

    // Update cooldown timer
    if (jumpCooldown > 0) {
        jumpCooldown -= 1 / 60; 
    }

    // Modify the jump condition to include double jump
    if (keys.space) {
        if (player.onGround && jumpCooldown <= 0) {
            // Normal jump
            player.dy = -player.jumpForce;
            player.onGround = false;
            player.hasDoubleJumped = false;
            jumpCooldown = jumpCooldownTime;
            keys.space = false;  // Reset space key after jump
        } else if (!player.onGround && !player.hasDoubleJumped) {
            // Double jump
            player.dy = -player.jumpForce;
            player.hasDoubleJumped = true;
            keys.space = false;  // Reset space key after double jump
        }
    }

    // Update player position
    player.x += player.dx;
    player.y += player.dy;

    // Gravity and Boundary Checks
    if (player.y + player.height < canvasHeight) {
        player.dy += player.gravity;
        player.onGround = false;
    } else {
        player.dy = 0;
        player.onGround = true;
        player.y = canvasHeight - player.height;
        player.hasDoubleJumped = false; // Reset double jump flag when on ground
    }

    walls.forEach(wall => {
        if (player.x < wall.x + wall.width &&
            player.x + player.width > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.height > wall.y) {
            
            // Collision detected, now determine the side of the collision
            const bottomCollision = player.y < wall.y;
            const topCollision = player.y + player.height > wall.y + wall.height;
            const leftCollision = player.x + player.width > wall.x;
            const rightCollision = player.x < wall.x + wall.width;

            if (topCollision && !bottomCollision) {
                player.y = wall.y + wall.height;
                player.dy = 0;
            } else if (bottomCollision && !topCollision) {
                player.y = wall.y - player.height;
                player.dy = 0;
                player.onGround = true;
            }

            if (leftCollision && !rightCollision) {
                player.x = wall.x - player.width;
            } else if (rightCollision && !leftCollision) {
                player.x = wall.x + wall.width;
            }
        }
    });
}

// Input Handling Functions
function handleInput(e) {
    const key = e.key;
    const isKeyDown = e.type === 'keydown';

    if (key === 'a') keys.a = isKeyDown;
    else if (key === 'd') keys.d = isKeyDown;
    else if (key === ' ') keys.space = isKeyDown;

    if (key === ' ') e.preventDefault();
}

function keyUp(e) {
    const key = e.key;

    if (key === 'a') keys.a = false;
    else if (key === 'd') keys.d = false;
    else if (key === ' ') keys.space = false; 
}


// Collision Detection Function

function detectCollisions() {
    
    spikes.forEach(spike => {
        if (player.x < spike.x + spike.size &&
            player.x + player.width > spike.x &&
            player.y < spike.y &&
            player.y + player.height > spike.y - spike.size) {
            console.log("Collision with spike detected!");
            
        }
    });
} 
// Game Loop
function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawPlayer();
    drawWalls();
    drawSpikes();
    updatePlayer();
    detectCollisions();
    requestAnimationFrame(animate);
}

// Event Listeners
document.addEventListener('keydown', handleInput);
document.addEventListener('keyup', keyUp);

// Start the Game Loop
animate();
