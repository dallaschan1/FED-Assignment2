
document.getElementById('text-option').addEventListener('click', function() {
    document.getElementById('main-text').style.display = 'block';
    document.getElementById('image-upload-area').style.display = 'none';
});

document.getElementById('image-option').addEventListener('click', function() {
    document.getElementById('main-text').style.display = 'none';
    document.getElementById('image-upload-area').style.display = 'flex';
});

document.getElementById('upload-link').addEventListener('click', function() {
    document.getElementById('image-input').click();
});

let globalImageBase64 = ""; // Global variable to store the image Base64 string

document.getElementById('image-input').addEventListener('change', function(event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            globalImageBase64 = e.target.result; // Store the Base64 string in the global variable
            var img = document.createElement('img');
            img.src = e.target.result;
            var dropZone = document.getElementById('image-drop-zone');
            dropZone.innerHTML = '';
            dropZone.appendChild(img);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
});


function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

const headingTextarea = document.getElementById('heading');
const mainTextTextarea = document.getElementById('main-text');

headingTextarea.addEventListener('input', function() {
    autoResizeTextarea(this);
});

mainTextTextarea.addEventListener('input', function() {
    autoResizeTextarea(this);
});

// Initialize the size on page load
autoResizeTextarea(headingTextarea);
autoResizeTextarea(mainTextTextarea);


document.getElementById('cancel-button').addEventListener('click', function() {
    window.location.href = 'discussion.html';
});



// Toggle dropdown menu
document.getElementById('Community').addEventListener('click', function(event) {
    document.getElementById('community-dropdown').classList.toggle('show');
    event.stopPropagation(); // Prevent click event from propagating to document
});

// Close dropdown when clicking anywhere else
document.addEventListener('click', function() {
    var dropdown = document.getElementById('community-dropdown');
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }
});

var dropdownItems = document.querySelectorAll('#community-dropdown .dropdown-item');
dropdownItems.forEach(function(item) {
    item.addEventListener('click', function() {
        var content = this.cloneNode(true); // Clone the item's content
        var communitySpan = document.querySelector('#Community #left');
        communitySpan.innerHTML = ''; // Clear the existing content
        communitySpan.appendChild(content); // Append the cloned content
    });
});


document.getElementById('post-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    

    // Initialize flag to indicate if all required fields are filled
    let allFieldsFilled = true;

    // Retrieve values from form fields
    const heading = document.getElementById('heading').value.trim();
    const isTextPost = document.getElementById('main-text').style.display !== 'none';
    const content = isTextPost ? document.getElementById('main-text').value.trim() : "NULL";
    const tags = document.querySelector('#Community #left span').textContent; // existing code
    
    // Validate heading
    if (!heading) {
        flashRedBorder(document.getElementById('heading'));
        allFieldsFilled = false;
    }

    // Validate content for a text post or image for an image post
    if (isTextPost && !content) {
        flashRedBorder(document.getElementById('main-text'));
        allFieldsFilled = false;
    } else if (!isTextPost && !globalImageBase64) {
        flashRedBorder(document.getElementById('image-upload-area'));
        allFieldsFilled = false;
    }
    else if (!tags || tags === "Choose a Community") { 
        flashRedBorder(document.querySelector('#Community #left span'));
        allFieldsFilled = false;
    }
    

    // If any field is unfilled, stop execution
    if (!allFieldsFilled) return;

    const lottie = document.getElementById('lottie');
    lottie.style.display = 'block';
    const head = document.getElementById('headTitle');
    head.style.display = 'none';
    // Assuming username is stored in localStorage or similar
    const username = localStorage.getItem('username') || 'defaultUser';
     //  get community tag
    const datetime = new Date().toLocaleString("en-SG"); // Formats date and time
    const likes = 0;

    // Prepare data object
    const postData = {
        username,
        heading,
        content,
        tags,
        Image: isTextPost ? "NULL" : globalImageBase64,
        datetime,
        CommentCount: likes
    };

    // Send data to API
    postToAPI(postData);
    
});

// Function to flash red border
function flashRedBorder(element) {
    element.style.border = "2px solid red";
    setTimeout(() => {
        element.style.border = ""; // Reset the border after 1 second
    }, 1000);
}

// Function to post data to the API
function postToAPI(data) {
    fetch('https://users-4250.restdb.io/rest/main-threads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '65aa4cb7c0aebd4508c42aa9'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        const lottie = document.getElementById('lottie');
        lottie.style.display = 'none';
        const head = document.getElementById('headTitle');
        head.style.display = 'block';
        alert("Post created successfully! Redirecting....");
        window.location.href = 'discussion.html';
    })
    .catch((error) => {
        console.error('Error:', error);
       
    });
}