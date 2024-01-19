document.addEventListener('DOMContentLoaded', function() {
    const profileImageElement = document.getElementById('profileImage');
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
  
    if (isLoggedIn) {
      const userImage = localStorage.getItem('userImage') || sessionStorage.getItem('userImage');
      if (userImage) {
        profileImageElement.src = userImage;
        profileImageElement.style.display = 'block';
      }
    }
  });
  