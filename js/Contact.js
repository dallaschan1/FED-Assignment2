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
  document.getElementById('navigation-header').style.position = 'relative';
  document.getElementById('navigation-header').style.backgroundColor = 'white';
}

function initMap() {
    var shopLocation = {lat: -34.397, lng: 150.644}; 
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: shopLocation
    });
    var marker = new google.maps.Marker({
      position: shopLocation,
      map: map
    });
}
