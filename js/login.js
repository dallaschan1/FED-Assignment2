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
  event.preventDefault(); 

  const username = document.querySelector('.sign-in-form .username input[type="text"]').value;
  const password = document.querySelector('.sign-in-form .password input').value;

  const rememberMe = document.querySelector('.sign-in-form .remember').checked; 
  sessionStorage.setItem('rememberMe', rememberMe);

  fetch('https://users-4250.restdb.io/rest/accounts?q={"username":"' + username + '"}', {
    method: 'GET',
    headers: {
      'x-apikey': '65aa4cb7c0aebd4508c42aa9'
    }
  })
  .then(response => {
    if (!response.ok) { // Check if response status is not OK
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.length > 0 && data[0].password === password) {
      alert("Login successful!");
      
      const userImage = data[0].userImage; 

      function GetCart(username){
        let settings = {
          method: "GET", //[cher] we will use GET to retrieve info
          headers: {
            "Content-Type": "application/json",
            "x-apikey": "65b39da5fc1ad2bd332e3653",
            "Cache-Control": "no-cache"
          },
        }

        fetch("https://fedassg2product-f089.restdb.io/rest/user-cart", settings)
        .then(response => response.json())
        .then(response => {
          for (var i = 0; i < response.length; i++) {
            if (username === response[i].username){
              if (rememberMe){
                localStorage.setItem('cart', JSON.stringify(response[i])); 
              }
              else{
                sessionStorage.setItem('cart', JSON.stringify(response[i])); 
              }
            }
          }
        })
      }

      GetCart(username);

      if (rememberMe) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userImage', userImage); // Store the user image
      } else {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('userImage', userImage); // Store the user image
      }
    } else {
      alert("Invalid credentials!");
    }
    alert("Login successful! Redirecting...");
    window.history.back();
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
              "cart-items": null
            };

            let settings = {
              method: "POST", //[cher] we will use post to send info
              headers: {
                "Content-Type": "application/json",
                "x-apikey": "65b39da5fc1ad2bd332e3653",
                "Cache-Control": "no-cache"
              },
              body: JSON.stringify(jsondata)
              // beforeSend: function () {
              //   @TODO use loading bar instead
              //   Disable our button or show loading bar
              //   document.getElementById("contact-submit").disabled = true;
              //   Clear our form using the form ID and triggering its reset feature
              //   document.getElementById("add-contact-form").reset();
              // }
            }

            fetch("https://fedassg2product-f089.restdb.io/rest/user-cart", settings)
            .then(response => response.json())
            .then(response => {
              if (rememberMe){
                localStorage.setItem('cart', JSON.stringify(response)); 
              }
              else{
                sessionStorage.setItem('cart', JSON.stringify(response)); 
              }
            });
          };
          cartItem = null;
          AddToNewCart(username, cartItem);

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
          // window.history.back();
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

cancel.addEventListener('click', function() {window.history.back();});