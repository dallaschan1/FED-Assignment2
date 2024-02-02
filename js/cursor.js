document.addEventListener('DOMContentLoaded', () => {
    // Store elements with cursor: pointer
    const cursorElements = [];

    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Variables to track cursor movement
    let lastMouseX = 0;
    let lastMouseY = 0;
    const trailDistanceThreshold = 10; // Minimum distance to show trail

    // Function to check if an element should have a custom pointer style
    function shouldHaveCustomPointer(element) {
        return cursorElements.includes(element) || 
               (element.parentElement && shouldHaveCustomPointer(element.parentElement));
    }

    // Update cursor position and style
    document.addEventListener('mousemove', (e) => {
        const distanceMoved = Math.sqrt(Math.pow(e.pageX - lastMouseX, 2) + Math.pow(e.pageY - lastMouseY, 2));
        if (distanceMoved > trailDistanceThreshold) {
            createTrail(lastMouseX, lastMouseY);
        }

        lastMouseX = e.pageX;
        lastMouseY = e.pageY;
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;

        if (shouldHaveCustomPointer(e.target)) {
            cursor.classList.add('cursor-pointer');
            document.body.removeChild(trail);
        } else {
            cursor.classList.remove('cursor-pointer');
        }
    });

    // Function to create a trail element
    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        trail.style.left = `${x}px`;
        trail.style.display = 'block';
        trail.style.top = `${y}px`;
        document.body.appendChild(trail);

        setTimeout(() => {
            document.body.removeChild(trail);
        }, 50); // Remove trail after 500ms
    }

    // Add CSS for custom cursor and trails
    const style = document.createElement('style');
    style.textContent = `
        body, html, * {
            cursor: none !important; /* Hide the default cursor for all elements */
        }
        .custom-cursor {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: orange;
           
            position: fixed;
            pointer-events: none;
            z-index: 9999;
           
            transition: transform 0.2s ease-out;
        }
        .cursor-pointer {
            transform: scale(1.5);

        }
        .trail {
            position: fixed;
            display: none;
            pointer-events: none;
            z-index: 9998;
            background-color: rgba(255, 165, 0, 0.6);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            opacity: 0.7;
            transition: opacity 0.5s ease-out, width 0.5s ease-out, height 0.5s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Find and store elements with cursor: pointer
    document.querySelectorAll('*').forEach(element => {
        const style = window.getComputedStyle(element);
        if (style.cursor === 'pointer') {
            cursorElements.push(element);
        }
        // Set cursor to none for all elements
        element.style.cursor = 'none';
    });
});
