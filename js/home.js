const navigationHeader = document.getElementById('navigation-header');
window.addEventListener("load", function() {
  const loader = document.getElementById("loader");
  setTimeout(function() {
    loader.style.opacity = "0";
    setTimeout(function(){
      loader.style.display = "none";
    }, 3100);
  }, 3100);
});


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
