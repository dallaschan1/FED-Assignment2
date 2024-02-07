

function loadContent(){
   
   
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    

    const threadId = urlParams.get('threadId');
    const membername = urlParams.get('membername');

    fetchPostByThreadID(threadId, membername);
    
    fetchAndDisplayComments(threadId);
    
}

// Fetch comments from the API

function fetchAndDisplayComments(threadID) {
    const url = 'https://users-4250.restdb.io/rest/comments';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': '65aa4cb7c0aebd4508c42aa9' 
      }
    };

    fetch(`${url}?q={"MainThread":${threadID}}`, options)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched comments:", data);
        const structuredMessages = structureMessages(data);
        console.log(structuredMessages); 
        console.log("Structured messages:", structuredMessages);
        const commentsHTML = renderComments(Object.values(structuredMessages));
        document.getElementById('Comment-Container').innerHTML += commentsHTML;


        Add();
       
        document.querySelectorAll('.autoresizing').forEach(one => {
            one.addEventListener('input', function() {
                this.style.height = 'auto'; // Reset height to auto to reduce it if needed
                this.style.height = this.scrollHeight + 'px';
            });
        });

        document.getElementById('loader').style.display = 'none';
        
      })
      .catch(error => console.error('Error fetching comments:', error));
}
// Sorting the comments using a tree? (idk what this is called i thought of doign this myself but gpt told me it was a tree algo or smt)


function structureMessages(messagesData) {
    let structuredMessages = {};
    let unprocessedMessages = [];

    messagesData.forEach(message => {
      if (message.ReplyTo === 0) {
        structuredMessages[message.MessageID] = { message: message, replies: [] };
      } else {
        if (!placeReply(structuredMessages, message)) {
          unprocessedMessages.push(message);
        }
      }
    });

    let wasPlaced;
    do {
      wasPlaced = false;
      unprocessedMessages = unprocessedMessages.filter(reply => {
        if (!placeReply(structuredMessages, reply)) {
          return true;
        } else {
          wasPlaced = true;
          return false;
        }
      });
    } while (wasPlaced);

    return structuredMessages;
}

function placeReply(structuredMessages, reply, isRootLevel = true) {
    if (isRootLevel) {
        for (let messageId in structuredMessages) {
            if (placeReply(structuredMessages[messageId].replies, reply, false) || messageId == reply.ReplyTo) {
                if (messageId == reply.ReplyTo) {
                    structuredMessages[messageId].replies.push({ message: reply, replies: [] });
                }
                return true;
            }
        }
    } else {
        for (let index = 0; index < structuredMessages.length; index++) {
            if (structuredMessages[index].message.MessageID == reply.ReplyTo) {
                structuredMessages[index].replies.push({ message: reply, replies: [] });
                return true;
            } else if (placeReply(structuredMessages[index].replies, reply, false)) {
                return true;
            }
        }
    }
    return false;
}
function formatDateTime(isoDateString) {
    const date = new Date(isoDateString);
    
    // Pad the day and month with a leading zero if they are less than 10
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hour}:${minute}`;
}


// Function to generate HTML for a comment based on its ThreadLevel
function renderComments(comments, parentUsername = null) {
    let html = '';

    for (let comment of comments) {
        const { message, replies } = comment;
        const replyToUsername = parentUsername; // Username of the message it is replying to
        let commentHTML = '';
        const date = formatDateTime(Date(message.DateTime));

        switch (message.ThreadLevel) {
            case 1:
                commentHTML = `<div data-username="${message.username}" data-level="${message.ThreadLevel}" data-identifier="${message.MessageID}"" class="Comments">
                <div class="Head">
                <img src="../images/Default.png">
                <h3>${message.username}</h3>
                <span class="dot"></span>
                <p class="Post-Time">${date}</p>
            </div>
            <div class="Comment-Content">
                <p>${message['comment-content']}</p>
            </div>
            <div class="checker">
                <div class="Reply-Button">
                <i class="fas fa-comment"></i> <span>Reply</span>
                </div>
                <div class="textarea-container">
                <textarea class="autoresizing" placeholder="Type something..."></textarea>
                <div class="textarea-buttons">
                    <button class="enterBtn">Enter</button>
                    <button class="cancelBtn">Cancel</button>
                </div>
                </div>
            </div></div>`;
                break;
            case 2:
                commentHTML = `<div data-username="${message.username}" data-level="${message.ThreadLevel}" data-identifier="${message.MessageID}" class="Comments-Reply1">
                    <div class="Reply">Replying to <span class="Reply-Name">${replyToUsername}</span></div>
                    <div class="Head">
                    <img src="../images/Default.png">
                    <h3>${message.username}</h3>
                    <span class="dot"></span>
                    <p class="Post-Time">${date}</p>
                </div>
                <div class="Comment-Content">
                    <p>${message['comment-content']}</p>
                </div>
                <div class="checker">
                    <div class="Reply-Button">
                    <i class="fas fa-comment"></i> <span>Reply</span>
                    </div>
                    <div class="textarea-container">
                    <textarea class="autoresizing" placeholder="Type something..."></textarea>
                    <div class="textarea-buttons">
                        <button class="enterBtn">Enter</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                    </div>
                </div>
                    </div>`;
                break;
            case 3:
                commentHTML = `<div data-username="${message.username}" data-level="${message.ThreadLevel}" data-identifier="${message.MessageID}" class="Comments-Reply2">
                    <div class="Reply">Replying to <span class="Reply-Name">${replyToUsername}</span></div>
                    <div class="Head">
                    <img src="../images/Default.png">
                    <h3>${message.username}</h3>
                    <span class="dot"></span>
                    <p class="Post-Time">${date}</p>
                </div>
                <div class="Comment-Content">
                    <p>${message['comment-content']}</p>
                </div>
                <div class="checker">
                    <div class="Reply-Button">
                    <i class="fas fa-comment"></i> <span>Reply</span>
                    </div>
                    <div class="textarea-container">
                    <textarea class="autoresizing" placeholder="Type something..."></textarea>
                    <div class="textarea-buttons">
                        <button class="enterBtn">Enter</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                    </div>
                </div>
                    </div>`;
                break;
            case 4:
                commentHTML = `<div data-username="${message.username}" data-level="${message.ThreadLevel}" data-identifier="${message.MessageID}" class="Comments-Reply3">
                    <div class="Reply">Replying to <span class="Reply-Name">${replyToUsername}</span></div>
                    <div class="Head">
            <img src="../images/Default.png">
            <h3>${message.username}</h3>
            <span class="dot"></span>
            <p class="Post-Time">${date}</p>
        </div>
        <div class="Comment-Content">
            <p>${message['comment-content']}</p>
        </div>
        <div class="checker">
            <div class="Reply-Button">
            <i class="fas fa-comment"></i> <span>Reply</span>
            </div>
            <div class="textarea-container">
            <textarea class="autoresizing" placeholder="Type something..."></textarea>
            <div class="textarea-buttons">
                <button class="enterBtn">Enter</button>
                <button class="cancelBtn">Cancel</button>
            </div>
            </div>
        </div>
                    </div>`;
                break;
            default: // For ThreadLevel 5 and above
                commentHTML = `<div data-username="${message.username}" data-level="${message.ThreadLevel}"  data-identifier="${message.MessageID}" class="Comments-Reply4">
                    <div class="Reply">Replying to <span class="Reply-Name">${replyToUsername}</span></div>
                    <div class="Head">
                    <img src="../images/Default.png">
                    <h3>${message.username}</h3>
                    <span class="dot"></span>
                    <p class="Post-Time">${date}</p>
                </div>
                <div class="Comment-Content">
                    <p>${message['comment-content']}</p>
                </div>
                <div class="checker">
                    <div class="Reply-Button">
                    <i class="fas fa-comment"></i> <span>Reply</span>
                    </div>
                    <div class="textarea-container">
                    <textarea class="autoresizing" placeholder="Type something..."></textarea>
                    <div class="textarea-buttons">
                        <button class="enterBtn">Enter</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                    </div>
                </div>
                    </div>`;
        }

        html += commentHTML;

        // Recursively render replies, passing current message's username as the parentUsername for the next level
        if (replies && replies.length > 0) {
            html += renderComments(replies, message.username);
        }
    }

    Add();
    return html;
}



  

  
  


// Fetches the post by the Thread-ID and Creates the html for the post

function fetchPostByThreadID(threadID, membername) {
    const url = 'https://users-4250.restdb.io/rest/main-threads';
    const queryParams = `?q={"Thread-ID":${threadID}}&fields=Thread-ID`;

    fetch(url + queryParams, {
        method: 'GET',
        headers: {
            'x-apikey': '65aa4cb7c0aebd4508c42aa9'
        }
    })
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        createPost(data, membername);
    })
    .catch(error => {
        console.error('Error fetching thread by Thread-ID:', error);
    });
}




function createPost(thread, membername) {

    const contentDiv = document.getElementById('Post-Container');
   

    
    thread.forEach(thread => {
        const threadDiv = document.createElement('div');
        threadDiv.id = 'Post';

        threadDiv.dataset.threadId = thread['Thread-ID'];
        threadDiv.dataset.commentCount = thread.CommentCount;
        threadDiv.dataset.tag = thread.tags;
        const time = formatDateTime(thread.datetime);

        const date = formatDateTime(thread.datetime);
        let threadHTML = `
            <div id="Post-Heading">
                <img src="../images/Default.png" alt="Profile Picture" id="Post-Profile-Picture">
                <h3>${thread.username}</h3>
                <span id="dot"></span>
                <p id = "Post-Time">${time}</p>
                <span id = "Cancel"><i class="fa fa-times"></i></span>
            </div>
            <div id="Post-Title">
                <h1>${thread.heading}</h1>
            </div>`;

            if (thread.Image && thread.Image !== 'NULL') {
               
                threadHTML += `
                    <div id="Post-Image-Container">
                        <img id="Post-Image" src="${thread.Image}">
                    </div>`;
            }
            
            if (thread.content && thread.content !== 'NULL') {
                
                threadHTML += `
                    <div id="Post-Content">
                        <p>${thread.content}</p>
                    </div>`;
            }

        

        threadDiv.innerHTML = threadHTML;
        contentDiv.insertBefore(threadDiv, contentDiv.firstChild);});
        const cancel = document.getElementById('Cancel');
        cancel.addEventListener('click', function(){
            window.location.href = 'Discussion.html';
        });
    
}


// Ends Here

loadContent();

function adjustFixedPosition() {
    const mainDiv = document.getElementById('main');
    const recommendedDiv = document.getElementById('Recommended');
  
    const mainDivRect = mainDiv.getBoundingClientRect();
  
    // Assuming you want the right edge of `Recommended` to align with the right edge of `main`
    const rightPosition = window.innerWidth - mainDivRect.right;
    recommendedDiv.style.right = `${rightPosition}px`;
  }
  
  // Adjust position on load and on window resize
  window.onload = adjustFixedPosition;
  window.onresize = adjustFixedPosition;
  
 

  
  
  function Add() {
    document.querySelectorAll('.checker').forEach(checker => {
        if (checker.dataset.initialized) return;
        checker.dataset.initialized = 'true';

        let enterBtn = checker.querySelector('.enterBtn');
        let cancelBtn = checker.querySelector('.cancelBtn');
        let textarea = checker.querySelector('textarea');
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
    

        const threadId = urlParams.get('threadId');

        if (!enterBtn.dataset.eventListenerAdded) {
            enterBtn.dataset.eventListenerAdded = 'true';
            enterBtn.addEventListener('click', function() {
                let commentDiv = this.closest('div[data-username]');
                if (textarea.value.trim().length > 0) {
                    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn') || 'false');
                    let username = isLoggedIn ? (localStorage.getItem('username') || sessionStorage.getItem('username')) : 'defaultUser';

                    let dataToSend = {
                        'comment-content': textarea.value,
                        'username': username,
                        'datetime': new Date(),
                        'ReplyTo': commentDiv.getAttribute('data-identifier'),
                        'MainThread': threadId,
                        'ThreadLevel': parseInt(commentDiv.getAttribute('data-level')) + 1
                    };

                    console.log('Posting comment:', dataToSend);
                    postNewReply(dataToSend, (postedComment) => {
                        // Success callback: Add the posted comment to the DOM
                        let replyToUsername = commentDiv.getAttribute('data-username'); // Example to get the replyToUsername
                        let newCommentHTML = createNewCommentHTML(dataToSend, replyToUsername);
                        commentDiv.insertAdjacentHTML('afterend', newCommentHTML);
                        textarea.value = ''; // Clear textarea after posting
                        textarea.style.display = 'none';
                        enterBtn.style.display = 'none';
                        cancelBtn.style.display = 'none';
                        console.log('Comment posted successfully:', postedComment);
                        Add();
                    }, (error) => {
                        // Error callback: Handle the error, e.g., show an error message to the user
                        console.error('Failed to post the comment:', error);
                    });
                } else {
                    console.log('Textarea is empty.');
                }
            });
        }

        // Cancel button logic remains unchanged
        if (!cancelBtn.dataset.eventListenerAdded) {
            cancelBtn.dataset.eventListenerAdded = 'true';
            cancelBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                let textareaContainer = this.closest('.textarea-container');
                textareaContainer.style.display = 'none';
                textarea.value = "";
                console.log("Cancel button clicked");
            });
        }

        checker.addEventListener('click', function() {
            let show = this.querySelector('.textarea-container');
            show.style.display = 'block';
            console.log("Textarea container displayed");
        });
    });
};

function postNewReply(commentData, onSuccess, onError) {
    const url = 'https://users-4250.restdb.io/rest/comments'; 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '65aa4cb7c0aebd4508c42aa9'
        },
        body: JSON.stringify(commentData)
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Comment posted successfully:', data);
            if (onSuccess) onSuccess(data); 
        })
        .catch(error => {
            console.error('Error posting comment:', error);
            if (onError) onError(error); 
        });
}



function createNewCommentHTML(data, replyToUsername) {
    // Determine the comment class based on ThreadLevel
    let commentClass;
    switch(data.ThreadLevel) {
        case 2:
            commentClass = "Comments-Reply1";
            break;
        case 3:
            commentClass = "Comments-Reply2";
            break;
        case 4:
            commentClass = "Comments-Reply3";
            break;
        default:
            commentClass = "Comments-Reply4"; // For ThreadLevel 5 and above
    }

    date = formatDateTime(data.datetime);
    // Generate the HTML for the new comment
    let html = `<div data-username="${data.username}" data-level="${data.ThreadLevel}" data-identifier="${data.MessageID}" class="${commentClass}">
        ${data.ThreadLevel > 1 ? `<div class="Reply">Replying to <span class="Reply-Name">${replyToUsername}</span></div>` : ''}
        <div class="Head">
            <img src="../images/Default.png">
            <h3>${data.username}</h3>
            <span class="dot"></span>
            <p class="Post-Time">${date}</p>
        </div>
        <div class="Comment-Content">
            <p>${data['comment-content']}</p>
        </div>
        <div class="checker">
            <div class="Reply-Button">
                <i class="fas fa-comment"></i> <span>Reply</span>
            </div>
            <div class="textarea-container">
                <textarea class="autoresizing" placeholder="Type something..."></textarea>
                <div class="textarea-buttons">
                    <button class="enterBtn">Enter</button>
                    <button class="cancelBtn">Cancel</button>
                </div>
            </div>
        </div>
    </div>`;

    return html;
}






function inputAction() {
    // Check login status
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || JSON.parse(sessionStorage.getItem('isLoggedIn'));

    const username = isLoggedIn ? (localStorage.getItem('username') || sessionStorage.getItem('username')) : 'defaultUser';

    // Get comment content
    const commentContent = document.querySelector('#Input input').value;
    if (!commentContent) {
        alert('Please enter a comment.');
        return;
    }

    // Get MainThread (threadId) from URL
    const urlParams = new URLSearchParams(window.location.search);
    const MainThread = urlParams.get('threadId');

    // Prepare comment data
    const commentData = {
        username: username,
        'comment-content': commentContent,
        ReplyTo: 0,
        datetime: new Date().toISOString(),
        MainThread: MainThread,
        ThreadLevel: 1
    };

    // Append new comment to UI
    appendCommentToUI(commentData);

    // Send new comment to API
    postNewComment(commentData);

    // Clear the input field
    document.querySelector('#Input input').value = '';
}

function appendCommentToUI(commentData) {

    const apiKey = '65aa4cb7c0aebd4508c42aa9'; // Replace with your actual API key
    const apiUrl = 'https://users-4250.restdb.io/rest/comments'; // Replace with your actual API URL

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const date = formatDateTime(commentData.datetime);
        const commentContainer = document.getElementById('Comment-Container');
    const newCommentHTML = `
        <div data-username = "${commentData.username}" data-level="${commentData.ThreadLevel}" data-identifier="${data.length+1}" class="Comments">
            <div class="Head">
                <img src="../images/Default.png">
                <h3>${commentData.username}</h3>
                <span class="dot"></span>
                <p class="Post-Time">${date}</p>
            </div>
            <div class="Comment-Content">
                <p>${commentData['comment-content']}</p>
            </div>
            <div class="checker">
                <div class="Reply-Button">
                <i class="fas fa-comment"></i> <span>Reply</span>
                </div>
                <div class="textarea-container">
                    <textarea id="autoresizing" placeholder="Type something..."></textarea>
                    <div class="textarea-buttons">
                        <button class="enterBtn">Enter</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    commentContainer.innerHTML += newCommentHTML;
    Add();
    })
    .catch(error => console.error('Error fetching data:', error));

    
}

function postNewComment(commentData) {
    const url = 'https://users-4250.restdb.io/rest/comments'; // Replace with your actual API endpoint
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '65aa4cb7c0aebd4508c42aa9' // Replace with your actual API key
        },
        body: JSON.stringify(commentData)
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Comment posted successfully:', data);
            // Optionally, perform additional actions after successful post
        })
        .catch(error => {
            console.error('Error posting comment:', error);
        });
}
