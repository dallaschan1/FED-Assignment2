let globalThreadsData = [];


document.addEventListener("DOMContentLoaded", function() {
    // Function to handle menu item click
    const menuItems = document.querySelectorAll('.menu li:not(.separator):not(.dropdown):not(.dropdowns)');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove "active" class from all menu items
            menuItems.forEach(i => i.classList.remove('Active'));

            // Add "active" class to the clicked item
            this.classList.add('Active');

            // Determine which menu item was clicked and sort accordingly
            if (this.textContent.includes('Popular')) {
                sortThreadsBy('comments');
            } else if (this.textContent.includes('Latest')) {
                sortThreadsBy('time');
            } else if (this.textContent.includes('Home')) {
                fetchThreads(); // Fetch threads without sorting
            }
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
    const dropdownText = document.getElementById('dropdowns-text');
    dropdownText.textContent = text; // Update the dropdown text

    const threads = document.querySelectorAll('.thread');
    threads.forEach(thread => {
        const threadTags = thread.dataset.tag.split(',').map(tag => tag.trim());
        if (threadTags.includes(text) || text === 'Home') {
            thread.style.display = ''; // Show thread
        } else {
            thread.style.display = 'none'; // Hide thread
        }
    });

    // Optionally, reset the choices in the PC version
    const pcChoices = document.querySelectorAll('.choice');
    pcChoices.forEach(c => c.classList.remove('add'));
    selectedTags.clear();
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
        globalThreadsData = data; // Store data in global variable
        createThreads(data);
        document.getElementById('loader').style.display = 'none';
    })
    .catch(error => {
        console.error('Error fetching threads:', error);
    });
}

document.getElementById('holder').addEventListener('click', function(event) {
    document.getElementById('tag').classList.toggle('show');
    event.stopPropagation();
});

// Add this to close the dropdown when clicking outside
document.addEventListener('click', function(event) {
    var isClickInside = document.getElementById('holder').contains(event.target);
    if (!isClickInside) {
        document.getElementById('tag').classList.remove('show');
    }
});

let selectedTags = new Set(); // Global variable to keep track of selected tags

const choices = document.querySelectorAll('.choice');
choices.forEach(choice => {
    choice.addEventListener('click', function() {
        this.classList.toggle('add');
        const tag = this.textContent.trim();
        if (selectedTags.has(tag)) {
            selectedTags.delete(tag);
        } else {
            selectedTags.add(tag);
        }
        filterThreadsByTags();
    });
});



function filterThreadsByTags() {
    const threads = document.querySelectorAll('.thread');

    threads.forEach(thread => {
        const threadTags = thread.dataset.tag.split(',').map(tag => tag.trim()); // Get tags of the thread
        const hasMatchingTag = selectedTags.size === 0 || threadTags.some(tag => selectedTags.has(tag)); // Check for matching tags

        if (hasMatchingTag) {
            thread.style.display = ''; // Show thread
        } else {
            thread.style.display = 'none'; // Hide thread
        }
    });
}


function createThreadsDict(threads) {
    const threadsDict = {};
    threads.forEach(thread => {
        threadsDict[thread['Thread-ID']] = thread;
    });
    return threadsDict;
}

function createThreads(sortedThreads) {
    const contentDiv = document.getElementById('Content');
    contentDiv.innerHTML = ''; // Clear existing threads

    sortedThreads.forEach(thread => {
        const threadDiv = document.createElement('div');
        threadDiv.classList.add('thread');
        threadDiv.dataset.threadId = thread['Thread-ID'];
        threadDiv.dataset.commentCount = thread.CommentCount;
        threadDiv.dataset.tag = thread.tags;
        

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
            threadHTML += `<img class="Main-Image" src="${thread.Image}">`;
        }

        if (thread.content && thread.content !== 'NULL') {
            threadHTML += `
                <div class="para">
                    <p>${thread.content}</p>
                </div>`;
        }

        threadHTML += `
            <div class="Comments">
                <i class="fas fa-comments"></i>
                <span class="Comments-Count">${thread.CommentCount}</span>
            </div>`;

        threadDiv.innerHTML = threadHTML;
        contentDiv.appendChild(threadDiv);
    });

    // Attach click event listener to comments section of each thread
    const commentSections = document.querySelectorAll('.Comments');
    commentSections.forEach((commentSection, index) => {
        commentSection.addEventListener('click', function() {
            // Retrieve relevant information from the corresponding thread
            const threadId = sortedThreads[index]['Thread-ID'];
            const membername = sortedThreads[index].username;
            
            
            
            

            // Construct URL query string to pass information to Post.html
            const queryString = `?threadId=${threadId}&membername=${membername}`;

            // Redirect to Post.html with the necessary information
            window.location.href = `Post.html${queryString}`;
        });
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

document.getElementById('createButton').addEventListener('click', function() {
    window.location.href = 'Create.html';
});


function sortThreadsBy(criteria) {
    let sortedThreads = [...globalThreadsData]; // Create a copy of the global data
    if (criteria === 'comments') {
        sortedThreads.sort((a, b) => parseInt(b.CommentCount) - parseInt(a.CommentCount));
    } else if (criteria === 'time') {
        sortedThreads.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    }

    createThreads(sortedThreads); // Pass the sorted array directly
}


