const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Function to resize the canvas
function resizeCanvas() {
    if (window.screen.width <= 1366 && window.screen.height <= 768) {
        let newWidth = document.documentElement.clientWidth - 100;
        newWidth = Math.max(newWidth, 0);
        canvas.width = newWidth;
        canvas.height = window.innerHeight / 1.5;
    } else {
        let newWidth = document.documentElement.clientWidth - 100;
        newWidth = Math.max(newWidth, 0);
        canvas.width = newWidth;
        canvas.height = window.innerHeight;
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);


function doAreasOverlap(area1, area2) {
    return area1.x < area2.x + area2.width &&
           area1.x + area1.width > area2.x &&
           area1.y < area2.y + area2.height &&
           area1.y + area1.height > area2.y;
}


function generateMapElements() {
    const rockFrequency = 0.1; 
    const waterFrequency = 0.05; 
    const areaSize = 100; 
    for (let x = 0; x < canvas.width; x += areaSize) {
        for (let y = 0; y < canvas.height; y += areaSize) {
            let area = { x: x, y: y, width: areaSize, height: areaSize };

            if (Math.random() < rockFrequency) {
                
                if (!rocks.some(rock => doAreasOverlap(rock, area)) &&
                    !oceanBounds.some(water => doAreasOverlap(water, area))) {
                    rocks.push(area);
                }
            }

            if (Math.random() < waterFrequency) {
                let waterArea = { x: x, y: y, width: areaSize * 3, height: areaSize * 3 };
               
                if (!rocks.some(rock => doAreasOverlap(rock, waterArea)) &&
                    !oceanBounds.some(water => doAreasOverlap(water, waterArea))) {
                    oceanBounds.push(waterArea);
                }
            }
        }
    }
}

function renderMap() {
    // Render grass texture
    for (let x = 0; x < canvas.width; x += grassImage.width) {
        for (let y = 0; y < canvas.height; y += grassImage.height) {
            ctx.drawImage(grassImage, x, y);
        }
    }

    // Render rocks
    rocks.forEach(rock => {
        ctx.drawImage(rockImage, rock.x, rock.y);
    });

    // Render water areas
    oceanBounds.forEach(water => {
        ctx.drawImage(oceanImage, water.x, water.y, water.width, water.height);
    });
}

let rocks = []; // Array to store rock positions
let oceanBounds = []; // Array to store water area positions

generateMapElements();