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

  fetch('https://users-4250.restdb.io/rest/accounts?q={"username":"' + username + '"}', {
    method: 'GET',
    headers: {
      'x-apikey': '65aa4cb7c0aebd4508c42aa9'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.length > 0 && data[0].password === password) {
      alert("Login successful!");
      
      const userImage = data[0].userImage; 

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
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Login failed!");
  });
}


function registerUser(event) {
  event.preventDefault();  

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

      fetch('https://users-4250.restdb.io/rest/accounts', {
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
      .then(response => response.json())
      .then(data => {
          alert("Registration successful!");
          localStorage.setItem('username', username);
          localStorage.setItem('userImage', base64Image);
          localStorage.setItem('isLoggedIn', 'true');
      })
      .catch(error => {
          console.error('Error:', error);
          alert("Registration failed!");
      });
  };
}




signInForm.addEventListener('submit', loginUser);
signUpForm.addEventListener('submit', registerUser);