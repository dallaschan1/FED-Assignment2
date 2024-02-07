document.addEventListener('DOMContentLoaded', function () {
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

    // close the menu and hide the overlay when clicking outside
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
});

//Ends Here

document.addEventListener('DOMContentLoaded', function() {
    // Assign URLs to each menu item
    var urls = {
        'Home': '../index.html',
        'Shop': 'shop.html',
        'Game': 'game.html',
        'Contact Us': 'Contact.html',
        'Forums': 'Discussion.html',
        'Check out': 'checkout.html',
        'Create A Post': 'Create.html',
    };

    // Select all slideout items
    var items = document.querySelectorAll('.slideout-item, .slideout-button');

    items.forEach(function(item) {
        item.addEventListener('click', function() {
            // Get the text content of the item or button
            var text = item.textContent.trim();
            // Navigate to the corresponding URL
            if (urls[text]) {
                window.location.href = urls[text];
            }
        });
    });
});
