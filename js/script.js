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

  document.getElementById("mobile-navbar-container").style.position = 'absolute';
  document.getElementById('navigation-header').style.position = 'absolute';
  document.getElementById('zencraft-logo').src = 'images/ZenCraft Logo.png';
  document.getElementById('mobile-img-logo').src = 'images/ZenCraft Logo.png';
  document.getElementById('slideout-img-logo').src = 'images/ZenCraft Logo.png';
  document.getElementById('user').href = 'html/login.html';
  document.getElementById('mobile-logo').href = '#';
  document.getElementById('logo-link').href = '#';
  document.getElementById('profileImage').src ='images/water.jpg';
  document.getElementById('mobile-profileImage').src ='images/water.jpg';
  document.getElementById('home-nav-link').href = '#';
  document.getElementById('shop-nav-link').href = 'html/shop.html';
  document.getElementById('contact-us-nav-link').href = 'html/contact.html';
  document.getElementById('game-nav-link').href = 'html/game.html';
  document.getElementById('forum-nav-link').href = 'html/discussion.html';
  document.getElementById('home-hamburger-link').href = '#';
  document.getElementById('shop-hamburger-link').href = 'html/shop.html';
  document.getElementById('game-hamburger-link').href = 'html/game.html';
  document.getElementById('contact-us-hamburger-link').href = 'html/contact.html';
  document.getElementById('forums-hamburger-link').href = 'html/discussion.html';
}

document.addEventListener("DOMContentLoaded", function () {
  const APIKEY = "65b39da5fc1ad2bd332e3653";

  function fetchProductsAndPopulateCards() {
    return new Promise((resolve, reject) => {
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

          for (let i = 0; i < products.length; i++) {
            let category = products[i].category;
            let name = products[i].name;
            let price = products[i].price;
            content += `<div class="card-container" data-name="${category}" data-open-modal>
                            <div class="card">
                                <img src="images/${name}.png" class="card-img-top card-img" alt="${name}">
                            </div>
                            <p class="card-product">${name}</p>
                            <p class="card-price">$${price.toFixed(2)}</p>
                        </div>`;
          }

          document.getElementById("card-flex").innerHTML = content;

          // Use document.querySelectorAll directly
          const cards = document.querySelectorAll(".card-container");

          // Hide the loader after data is loaded
          const loader = document.getElementById("loader");
          loader.style.opacity = "0";
          setTimeout(function(){
            document.body.style.overflowY = 'scroll';
            loader.style.display = "none";

            // Assign NodeList directly to the global variable
            filterableCards = cards;
            resolve();
          }, 1000);
        })
        .catch(error => {
          console.error("Error fetching products:", error.message);
          reject(error);
          // You may want to handle errors here and adjust the loader accordingly
        });
    });
  }

  // Call the function and use the returned promise
  fetchProductsAndPopulateCards()
    .then(() => {
      // Opening of modal for more information on product
      function createAdditionalDiv() {
        const productContainer = document.getElementById('product-container');
        const productContentContainer = document.getElementById('product-content-container');
        const additionalDivId = 'additional-div';

        // Check if the additional div already exists
        let additionalDiv = document.getElementById(additionalDivId);

        // Check if the window width is 768px or below
        if (window.innerWidth <= 768) {
          // If additional div doesn't exist, create and append it
          if (!additionalDiv) {
            additionalDiv = document.createElement('div');
            additionalDiv.id = additionalDivId;

            // Append both product-content-container and additional-div to product-container
            productContainer.insertBefore(additionalDiv, productContentContainer.nextSibling);
            additionalDiv.appendChild(productContentContainer);
          }
        } else {
          // If window width is above 768px and the additional div exists, remove it
          if (additionalDiv) {
            additionalDiv.replaceWith(productContentContainer);
          }
        }
      }

      // Call the function on page load and resize
      window.addEventListener('load', createAdditionalDiv);
      window.addEventListener('resize', createAdditionalDiv);

      const openModal = document.querySelectorAll("[data-open-modal]");
      const closeModal = document.querySelector("[data-close-modal]");
      const modal = document.querySelector("[data-modal]");

      openModal.forEach(openModal => {
        openModal.addEventListener("click", () => {
          const name = openModal.querySelector('.card-product').textContent;
          const price = parseFloat(openModal.querySelector('.card-price').textContent.replace('$', ''));
          const category = openModal.getAttribute('data-name').replace(/\b\w/g, match => match.toUpperCase());
      
          // Update modal elements with the extracted information
          document.getElementById('product-title').textContent = name;
          document.getElementById('product-image').src = `images/${name}.png`;
          document.getElementById('product-price').textContent = `$${price.toFixed(2)}`;
          document.getElementById('category-detail').textContent = category;


          modal.showModal();
          document.getElementById('product-modal').style.opacity = '1';
          document.body.style.overflowY = "hidden";
          quantityInput.blur();
        });
      });

      closeModal.addEventListener("click", () =>{
          modal.close();
          document.getElementById('product-modal').style.opacity = '0';
          document.body.style.overflowY = "scroll";
      })

      const colorItems = document.querySelectorAll('.color-item');
      const colorTitle = document.querySelector('#color-title');
      let prevSelectedItem = document.querySelector(".selected-color");
      colorItems.forEach(item => {
        item.addEventListener("click", function() {
          const selectedID = this.id;
          prevSelectedItem.classList.remove('selected-color');
          this.classList.add("selected-color");
          prevSelectedItem = document.querySelector(".selected-color");
          console.log(selectedID);
          // Making the first character in the color capitalised
          let color = this.dataset.color.charAt(0).toUpperCase() + this.dataset.color.slice(1);
          colorTitle.innerHTML = color;
        });
      });


      const quantityInput = document.getElementById("quantity-input");
      let defaultValue = 1;
      quantityInput.value = defaultValue;

      var minusButton = document.getElementById("minus");
      var plusButton = document.getElementById("plus");

      // Event listener for the minus button
      minusButton.addEventListener("click", function() {
        updateQuantity(-1);
      });

      // Event listener for the plus button
      plusButton.addEventListener("click", function() {
        updateQuantity(1);
      });

      // Event listener for the quantity input
      quantityInput.addEventListener("input", function() {
        var enteredValue = parseInt(quantityInput.value, 10);
        console.log(enteredValue);

        if (enteredValue < 1){
          quantityInput.value = 1;
        }
        
        else if (enteredValue > 10){
          quantityInput.value = 10;
        }
        else if (!isNaN(enteredValue)){
          quantityInput.value = enteredValue;
        }
      });

      quantityInput.addEventListener("focusout", function(){
        var enteredValue = parseInt(quantityInput.value, 10);
        if (isNaN(enteredValue)) {
          quantityInput.value = 1;
        }
      })

      // Function to update the quantity based on button clicks
      function updateQuantity(change) {
        var currentQuantity = parseInt(quantityInput.value, 10);
        var newQuantity = currentQuantity + change;

        // Ensure the quantity stays within the range of 1 to 10
        if (newQuantity >= 1 && newQuantity <= 10) {
          quantityInput.value = newQuantity;
        }
      };


      var addToCartBtn = document.querySelector(".add-to-cart-btn");
      var addToCartIcon = document.querySelector("#add-to-cart-icon");
      var tickAnimation = document.querySelector("#tick-animation-cart");
      addToCartBtn.addEventListener("click", function(){
        // Tick animation effect
        addToCartIcon.classList.add('hide');
        tickAnimation.classList.remove('hide');
        tickAnimation.stop();
        tickAnimation.currentFrame = 0;
        tickAnimation.play();
        setTimeout(function() {
          addToCartIcon.classList.remove('hide');
          tickAnimation.classList.add('hide');
          tickAnimation.pause();
        }, 5000);

        // Adding to local storage???
      })
    })
    .catch(error => {
      console.error("Error:", error.message);
    });
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

document.getElementById('livingRoomButton').addEventListener('click', () => redirectToShopPage('living room'));
document.getElementById('s1').addEventListener('click', () => redirectToShopPage('bedroom'));
document.getElementById('s2').addEventListener('click', () => redirectToShopPage('kitchen'));

function redirectToShopPage(category) {
  // Redirect to the category page with the selected category as a parameter
  window.location.href = `html/shop.html?category=${category}`;
}


