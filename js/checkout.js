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
  document.getElementById('navigation-header').style.backgroundColor = 'white';
}

document.addEventListener("DOMContentLoaded", function () {
    // Hide the loader after data is loaded
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(function(){
      document.body.style.overflowY = 'scroll';
      loader.style.display = "none";
    }, 1000);

    
    const placeOrderBtn = document.getElementById('place-order-btn');
    const closeModal = document.querySelector("[data-close-modal]");
    const modal = document.querySelector("[data-modal]");
    const tickAnimation = document.querySelector("#tick-animation");

    placeOrderBtn.addEventListener("click", function(){
      // logic for adding order to database or something

      modal.showModal();
      tickAnimation.stop();
      tickAnimation.currentFrame = 0;
      tickAnimation.play();
      document.getElementById('thank-you-modal').style.opacity = '1';
      document.body.style.overflowY = "hidden";
      // setTimeout(function(){
      //   modal.close();
      //   tickAnimation.pause();
      //   document.getElementById('thank-you-modal').style.opacity = '0';
      //   document.body.style.overflowY = "scroll";
      //   window.location.href = "../index.html";
      // }, 15000);
    })
    
    closeModal.addEventListener("click", () =>{
      modal.close();
      tickAnimation.pause();
      document.getElementById('thank-you-modal').style.opacity = '0';
      document.body.style.overflowY = "scroll";
      window.location.href = "../index.html";
    })
});