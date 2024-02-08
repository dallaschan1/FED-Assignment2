let IsLookingSignIn = document.getElementById('notSignIn');
let IsNotLookingSignIn = document.getElementById('isSignIn');
let passwordInputSignIn = document.querySelector('.sign-in-form .password input[type="password"]');

IsLookingSignIn.addEventListener('click', function() {
    IsLookingSignIn.style.display = 'none';
    IsNotLookingSignIn.style.display = 'block';
    passwordInputSignIn.setAttribute('type', 'text');
});

IsNotLookingSignIn.addEventListener('click', function() {
    IsNotLookingSignIn.style.display = 'none';
    IsLookingSignIn.style.display = 'block';
    passwordInputSignIn.setAttribute('type', 'password');
});

let IsLookingSignUp = document.getElementById('notSignUp');
let IsNotLookingSignUp = document.getElementById('isSignUp');
let passwordInputSignUp = document.querySelector('.sign-up-form .password input[type="password"]');

IsLookingSignUp.addEventListener('click', function() {
    IsLookingSignUp.style.display = 'none';
    IsNotLookingSignUp.style.display = 'block';
    passwordInputSignUp.setAttribute('type', 'text');
});

IsNotLookingSignUp.addEventListener('click', function() {
    IsNotLookingSignUp.style.display = 'none';
    IsLookingSignUp.style.display = 'block';
    passwordInputSignUp.setAttribute('type', 'password');
});




let signInForm = document.querySelector('.sign-in-form');
let signUpForm = document.querySelector('.sign-up-form');
let swapToSignIn = document.querySelectorAll('.transfer');
swapToSignIn.forEach(element => element.addEventListener('click', function() {
    
    if (signInForm.style.display === 'none') {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
    }
}));

function loginUser(event) {
  event.preventDefault(); // Prevent default form submission

  // Get username and password from form inputs
  const username = document.querySelector('.sign-in-form .username input[type="text"]').value;
  const password = document.querySelector('.sign-in-form .password input').value;

  // Get rememberMe checkbox status
  const rememberMe = document.querySelector('.sign-in-form .remember').checked;
  console.log(rememberMe);
  localStorage.setItem('rememberMe', rememberMe);

  // Fetch user data from API based on username
  fetch('https://users-4250.restdb.io/rest/accounts?q={"username":"' + username + '"}', {
      method: 'GET',
      headers: {
          'x-apikey': '65aa4cb7c0aebd4508c42aa9'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      if (data.length > 0 && data[0].password === password) {
          alert("Login successful!");

          // Get user image from fetched data
          const userImage = data[0].userImage;

          // Function to fetch and set cart data
          function getCart(username) {
              let settings = {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      "x-apikey": "65c4881fe208c2067b545c56",
                      "Cache-Control": "no-cache"
                  },
              };

              // Fetch cart data
              return fetch("https://fedassg2b-4d22.restdb.io/rest/user-cart", settings)
                  .then(response => response.json())
                  .then(response => {
                      for (var i = 0; i < response.length; i++) {
                          if (username === response[i].username) {
                              if (rememberMe) {
                                  localStorage.setItem('cart', JSON.stringify(response[i]));
                              } else {
                                  sessionStorage.setItem('cart', JSON.stringify(response[i]));
                                  console.log(JSON.parse(sessionStorage.getItem('cart')));
                              }
                          }
                      }
                  });
          }

          // Call getCart function
          getCart(username)
          .then(() => {
              // Set user login data in sessionStorage or localStorage based on rememberMe
              if (rememberMe) {
                  localStorage.setItem('isLoggedIn', 'true');
                  localStorage.setItem('username', username);
                  localStorage.setItem('userImage', userImage);
              } else {
                  sessionStorage.setItem('isLoggedIn', 'true');
                  sessionStorage.setItem('username', username);
                  sessionStorage.setItem('userImage', userImage);
              }

              // Redirect user after successful login
              alert("Login successful! Redirecting...");
            //   window.history.back();
          })
          .catch(error => {
              console.error('Error:', error);
              alert("Login failed!");
          });
      } else {
          alert("Invalid credentials!");
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert("Login failed!");
  });
}


function registerUser(event) {
  event.preventDefault();  

  const rememberMe = document.querySelector('.sign-up-form .remember').checked; 
  const username = document.querySelector('.sign-up-form .username input[type="text"]').value;
  const email = document.querySelector('.sign-up-form .email input[type="email"]').value;
  const password = document.querySelector('.sign-up-form .password input').value;
  const userImage = document.querySelector('.sign-up-form .profile-image input[type="file"]').files[0];
  const phone = document.querySelector('.sign-up-form .phone input[type="tel"]').value;

  if (!username || !password || !email || !userImage) {
      alert("All fields are required, including image upload.");
      return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(userImage); 
reader.onloadend = function() {
    const base64Image = reader.result;

    return fetch('https://users-4250.restdb.io/rest/accounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '65aa4cb7c0aebd4508c42aa9'
        },
        body: JSON.stringify({
            username,
            password, 
            email,
            phone,
            userImage: base64Image
        })
    })
    .then(response => {
        if (!response.ok) { // Check if response status is not OK
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert("Registration successful!");

        function AddToNewCart(username){
            var jsondata = {
                "username": username,
                "cart-items": []
            };

            let settings = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": "65c4881fe208c2067b545c56",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(jsondata)
            }

            fetch("https://fedassg2b-4d22.restdb.io/rest/user-cart", settings)
            .then(response => response.json())
            .then(response => {
                console.log("working");
                if (rememberMe){
                    localStorage.setItem('cart', JSON.stringify(response)); 
                    console.log(JSON.parse(localStorage.setItem('cart')));
                }
                else{
                    sessionStorage.setItem('cart', JSON.stringify(response)); 
                    console.log(JSON.parse(sessionStorage.getItem('cart')));
                }
            });
        };
        AddToNewCart(username);

        // Move the code that relies on sessionStorage/localStorage inside this block
        if (rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('userImage', userImage);
        } else {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userImage', userImage);
        }
        alert("Sign Up Successful! Redirecting...");
        window.history.back();
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Registration failed!");
    });
};
}


signInForm.addEventListener('submit', loginUser);
signUpForm.addEventListener('submit', registerUser);

let cancel = document.getElementById('Cancel');
let cancel2 = document.getElementById('Cancel2');
cancel.addEventListener('click', function() {window.history.back();});
cancel2.addEventListener('click', function() {window.history.back();});