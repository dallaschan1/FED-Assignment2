includeHTMLHeader();
function includeHTMLHeader() {
  var z, i, a, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    if (z[i].getAttribute("w3-include-html")) {
      a = z[i].cloneNode(false);
      file = z[i].getAttribute("w3-include-html");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          a.removeAttribute("w3-include-html");
          a.innerHTML = xhttp.responseText;
          z[i].parentNode.replaceChild(a, z[i]);
          includeHTMLHeader();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}

window.addEventListener("load", function() {
  const loader = document.getElementById("loader");
  setTimeout(function() {
    loader.style.opacity = "0";
    setTimeout(function(){
      document.body.style.overflowY = 'scroll';
      loader.style.display = "none";
    }, 600);
  }, /*3*/100);
});

const scrollDown = document.getElementById("scroll-down");
window.addEventListener("scroll", function() {
  // Check if the user has scrolled beyond a certain threshold (e.g., 100 pixels from the top)
  const scrollThreshold = 100;
  const currentScroll = window.scrollY;

  if (currentScroll > scrollThreshold) {
    // User has scrolled down, hide the "scroll-down" element with a fade-out effect
    scrollDown.style.opacity = "0";
    scrollDown.style.visibility = "hidden";
  } else {
    // User is at the top, show the "scroll-down" element with a fade-in effect
    scrollDown.style.opacity = "1";
    scrollDown.style.visibility = "visible";
  }
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
