document.addEventListener("DOMContentLoaded", function() {
    // Function to handle menu item click
    function handleMenuItemClick(menuItems) {
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Handle clicks on menu items excluding separators and dropdowns
    const menuItems = document.querySelectorAll('.menu li:not(.separator):not(.dropdown):not(.dropdowns)');
    handleMenuItemClick(menuItems);

    // Function to handle dropdown click
    function setupDropdownClick(selector) {
        const dropdown = document.querySelector(selector);
        if (dropdown) {
            const arrow = dropdown.querySelector('i');
            dropdown.addEventListener('click', function() {
                if (arrow) {
                    arrow.classList.toggle('rotated');
                }
            });
        }
    }

    // Setup click events for both dropdowns
    setupDropdownClick('.dropdown');
    setupDropdownClick('.dropdowns');
});


document.addEventListener("DOMContentLoaded", function() {
    var navbars = document.getElementById('navbars');
    var searchBar2 = document.getElementById('search-bar2');

    window.toggleSearchBar = function() {
        if (navbars.style.display === 'none' || navbars.style.display === '') {
            // Show navbars and hide search bar
            navbars.style.display = 'flex';
            searchBar2.style.display = 'none';
        } else {
            // Hide navbars and show search bar
            navbars.style.display = 'none';
            searchBar2.style.display = 'flex';
        }
    };

    window.clearSearch = function() {
        document.getElementById('search-input').value = '';
    };

    // Add an event listener for the original search icon
    var searchIcon = document.querySelector('.search-icons');
    if (searchIcon) {
        searchIcon.addEventListener('click', toggleSearchBar);
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.querySelector('.dropdowns');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropdown.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });
});

function updateText(text) {
    document.getElementById('dropdowns-text').textContent = text;
}


