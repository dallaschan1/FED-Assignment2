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
