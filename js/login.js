const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");



function loginUser(event) {
    event.preventDefault(); 

    const username = document.querySelector('.sign-in-form input[type="text"]').value;
    const password = document.querySelector('.sign-in-form input[type="password"]').value;

    fetch('https://users-4250.restdb.io/rest/accounts?q={"username":"' + username + '"}', {
      method: 'GET',
      headers: {
        'x-apikey': '65a3cb99c69bc8c9bdf5e233'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.length > 0 && data[0].password === password) {
        alert("Login successful!");
        localStorage.setItem('isLoggedIn', 'true');
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

 
    const username = document.querySelector('.sign-up-form input[type="text"]').value;
    const password = document.querySelector('.sign-up-form input[type="password"]').value;
    const email = document.querySelector('.sign-up-form input[type="email"]').value;
    const phone = document.querySelector('.sign-up-form input[type="tel"]').value;
    const imageFile = document.querySelector('.sign-up-form input[type="file"]').files[0];

    if (!username || !password || !email || !phone || !imageFile) {
      alert("All fields are required, including image upload.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = function() {
      const base64Image = reader.result;

      fetch('https://users-4250.restdb.io/rest/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': '65a3cb99c69bc8c9bdf5e233'
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

sign_up_btn.addEventListener("click", () => {
container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
container.classList.remove("sign-up-mode");
});

document.getElementById('actual-btn').addEventListener('change', function() {
  document.getElementById('file-chosen').value = this.files[0].name;
});
document.getElementById('file-chosen').addEventListener('click', function() {
  document.getElementById('actual-btn').click();
});


document.getElementById('close-btn').addEventListener('click', function() {
  window.history.back(); 
});