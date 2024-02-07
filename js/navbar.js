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

document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        // Get the base64 string of the user image from local storage
        const base64Image = localStorage.getItem('userImage');

        // Check if there's an image string
        if (base64Image) {
            // Select the profile image elements by their IDs and their parent <a> elements
            const profileImage = document.getElementById('profileImage');
            const mobileProfileImage = document.getElementById('mobile-profileImage');
            const userProfileLink = document.getElementById('user'); // Assuming this is the ID for the desktop link
            const mobileUserProfileLink = document.getElementById('mobile-user'); // Assuming this is the ID for the mobile link

            // Set the src attribute of the profile image to the base64 string and make it visible
            if (profileImage) {
                profileImage.src = base64Image;
                profileImage.style.display = 'block';
            }

            // Repeat for the mobile profile image if it exists
            if (mobileProfileImage) {
                mobileProfileImage.src = base64Image;
                mobileProfileImage.style.display = 'block';
            }

            // Make the profile image and its link unclickable by removing href and adding pointer-events: none
            if (userProfileLink) {
                userProfileLink.removeAttribute('href'); // Remove the href attribute to make it unclickable
                userProfileLink.style.pointerEvents = 'none'; // Additional measure to ensure unclickability
            }

            // Repeat for the mobile profile link if it exists
            if (mobileUserProfileLink) {
                mobileUserProfileLink.removeAttribute('href');
                mobileUserProfileLink.style.pointerEvents = 'none';
            }
        }
    }
});
