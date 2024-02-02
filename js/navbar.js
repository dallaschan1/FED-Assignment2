document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.menu-toggle-button');
    const toggleBtnIcon = document.querySelector('.menu-toggle-button i');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    toggleBtn.onclick = function () {
        console.log("Opening Navbar");
        hamburgerMenu.classList.toggle('open');
        const isOpen = hamburgerMenu.classList.contains('open');

        toggleBtnIcon.classList = isOpen
            ? 'fa solid fa-xmark'
            : 'fa-solid fa-bars';
    };
});


//FUNCTIONS for the slideout menu
document.querySelector('.hamburg-menu').addEventListener('click', function() {
    var menu = document.getElementById('slideout-menu');
    var overlay = document.getElementById('overlay');
    var html = document.documentElement;

    menu.classList.toggle('open');
    overlay.classList.toggle('active');
    html.classList.toggle('no-scroll'); // Toggle the no-scroll class
});

// Close the menu and hide the overlay when clicking on the overlay
document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('slideout-menu').classList.remove('open');
    this.classList.remove('active');
    document.documentElement.classList.remove('no-scroll'); // Remove the no-scroll class
});

// Optional: close the menu and hide the overlay when clicking outside
document.addEventListener('click', function(event) {
    var isClickInsideMenu = document.getElementById('slideout-menu').contains(event.target);
    var isClickHamburgMenu = document.querySelector('.hamburg-menu').contains(event.target);
    var overlay = document.getElementById('overlay');

    if (!isClickInsideMenu && !isClickHamburgMenu && overlay.classList.contains('active')) {
        document.getElementById('slideout-menu').classList.remove('open');
        overlay.classList.remove('active');
        document.documentElement.classList.remove('no-scroll'); // Remove the no-scroll class
    }
});




//Ends Here

