document.addEventListener("DOMContentLoaded", function() {
    // Function to handle menu item click
    const menuItems = document.querySelectorAll('.menu li:not(.separator):not(.dropdown):not(.dropdowns)');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove "active" class from all menu items
            menuItems.forEach(i => i.classList.remove('Active'));

            // Add "active" class to the clicked item
            this.classList.add('Active');
        });
    });

    // Handle clicks on menu items excluding separators and dropdowns
   
    

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


document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('Content');

    window.addEventListener('wheel', function(event) {
        // Prevent the default window scroll
        event.preventDefault();

        // Scroll the content div by the amount of the wheel event delta
        contentDiv.scrollTop += event.deltaY;
    }, { passive: false }); // Disable passive listener to allow preventDefault
});



document.addEventListener('DOMContentLoaded', function() {
    fetchThreads();
    setupSearch();
});

function fetchThreads() {
    fetch('https://users-4250.restdb.io/rest/main-threads', {
        method: 'GET',
        headers: {
            'x-apikey': '65aa4cb7c0aebd4508c42aa9'
        }
    })
    .then(response => response.json())
    .then(data => {
        const threadsDict = createThreadsDict(data);
        createThreads(threadsDict);
    })
    .catch(error => {
        console.error('Error fetching threads:', error);
    });
}

function createThreadsDict(threads) {
    const threadsDict = {};
    threads.forEach(thread => {
        threadsDict[thread['Thread-ID']] = thread;
    });
    return threadsDict;
}

function createThreads(threadsDict) {
    const contentDiv = document.getElementById('Content');
    Object.values(threadsDict).forEach(thread => {
        const threadDiv = document.createElement('div');
        threadDiv.classList.add('thread');
        threadDiv.dataset.threadId = thread['Thread-ID']; // Set thread ID as data attribute
        threadDiv.dataset.likes = thread.Likes;

        // Generate HTML based on whether an image is present
        let threadHTML = `
            <div class="Content-Header">
                <img src="../images/Default.png" alt="Profile Picture" class="Content-Profile-Picture">
                <span class="Username">${thread.username}</span>
                <span class="dot"></span>
                <span class="TimeStamp">${thread.datetime}</span>
            </div>
            <div class="Content-Tag">
                    <span>${thread.tags}</span>
            </div>
            <div class="Head">
                <h2>${thread.heading}</h2>
            </div>`;

      
        

        if (thread.Image && thread.Image !== 'NULL') {
            threadHTML += `<img class="Main Image" src="${thread.Image}">`;
        }

        if (thread.content && thread.content !== 'NULL') {
            threadHTML += `
                <div class="para">
                    <p>${thread.content}</p>
                </div>`;
        }

        

        threadHTML += `
            <div class="Likes">
                <i class="fas fa-thumbs-up"></i>
                <span class="Likes-Count">${thread.Likes}</span>
            </div>`;

        threadDiv.innerHTML = threadHTML;
        contentDiv.appendChild(threadDiv);
    });
}



function setupSearch() {
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('input', function() {
        filterThreads(this.value.toLowerCase());
    });
}

function filterThreads(searchTerm) {
    const threads = document.querySelectorAll('.thread'); // Re-query threads

    threads.forEach(thread => {
        // Check for text in different parts of the thread
        const threadContent = thread.textContent.toLowerCase(); // Get all text content

        // Check if the thread content includes the search term
        if (threadContent.includes(searchTerm)) {
            thread.style.display = ''; // Show the thread
        } else {
            thread.style.display = 'none'; // Hide the thread
        }
    });
}

