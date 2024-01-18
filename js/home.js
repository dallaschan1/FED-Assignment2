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