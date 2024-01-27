// Adding data to the product-detail database *ALWAYS LEAVE IT COMMENTED*
// document.addEventListener("DOMContentLoaded", function () {
//   const productData = {
//     "name": ["Loveseat Sofa", "Luxury Sofa", "Table Lamp", "Cozy Sofa", "White Drawer unit", "Black Tray table", "Standing Lamp", "Black Brow Side table", "Light Beige Pillow", "Bulb Lamp", "Bamboo Basket", "Off-white Pillow"],
//     "price": [199.00, 299.00, 19.00, 299.00, 89.99, 19.99, 19.00, 16.99, 3.99, 39.99, 9.99, 7.99],
//     "category": ["living room", "living room", "living room,bedroom", "living room", "bedroom", "living room,bedroom", "living room,bedroom", "living room,bedroom", "living room,bedroom", "living room,bedroom,kitchen", "bedroom,kitchen", "living room, bedroom"]
//   };

//   const APIKEY = "65b39da5fc1ad2bd332e3653";

//   function postDataToApi() {
//       for (let i = 0; i < productData.name.length; i++) {
//           let jsondata = {
//               "name": productData.name[i],
//               "price": productData.price[i],
//               "category": productData.category[i]
//           };

//           let settings = {
//               method: "POST",
//               headers: {
//                   "Content-Type": "application/json",
//                   "x-apikey": APIKEY,
//                   "Cache-Control": "no-cache"
//               },
//               body: JSON.stringify(jsondata),
//               beforeSend: function () {
//                   // @TODO use loading bar instead
//                   // Disable our button or show loading bar
//               }
//           }

//           fetch("https://fedassg2product-f089.restdb.io/rest/product", settings)
//               .then(response => {
//                   if (!response.ok) {
//                       throw new Error(`HTTP error! Status: ${response.status}`);
//                   }
//                   return response.json();
//               })
//               .then(data => {
//                   console.log("Data successfully sent:", data);
//                   // You can perform additional actions here based on the response
//               })
//               .catch(error => {
//                   console.error("Error:", error.message);
//               });
//       }
//   }

//   // Call the function to start the process
//   postDataToApi();
// });


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

  document.getElementById('zencraft-logo').src = 'images/ZenCraft Logo.png';
  document.getElementById('profileImage').src ='images/water.jpg';
  document.getElementById('home-nav-link').href = '#';
  document.getElementById('shop-nav-link').href = 'html/shop.html';
  document.getElementById('contact-us-nav-link').href = 'html/contact.html';
  document.getElementById('about-us-nav-link').href = 'html/about.html';
}

document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65b39da5fc1ad2bd332e3653";

  function fetchProductsAndPopulateCards() {
    let settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    };
  
    fetch("https://fedassg2product-f089.restdb.io/rest/product", settings)
      .then(response => response.json())
      .then(products => {
        let content = "";
  
        for (let i = 0; i < 6; i++) {
          content += `<div class="card-container">
                          <div class="card">
                              <img src="images/${products[i].name}.png" class="card-img-top card-img" alt="${products[i].name}">
                          </div>
                          <p class="card-product">${products[i].name}</p>
                          <p class="card-price">$${products[i].price.toFixed(2)}</p>
                      </div>`;
        }
  
        document.getElementById("card-flex").innerHTML = content;

        // Hide the loader after data is loaded
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";
        setTimeout(function(){
          document.body.style.overflowY = 'scroll';
          loader.style.display = "none";
        }, 1000);
      })
      .catch(error => {
        console.error("Error fetching products:", error.message);
        // You may want to handle errors here and adjust the loader accordingly
      });
  }
  
  // Call the function to fetch data and populate cards
  fetchProductsAndPopulateCards();  
}
);

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