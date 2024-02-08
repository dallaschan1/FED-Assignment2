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

    DisplayCartItems();

    function DisplayCartItems(){
      console.log(JSON.parse(sessionStorage.getItem('cart')));

      function setUpCartEvenListeners(totalProductPrice) {
          // Get all input elements with class "cart-quantity-input"
          let quantityInputs = Array.from(document.getElementsByClassName('cart-quantity-input'));

          // Add event listener to each input
          quantityInputs.forEach(input => {
              input.addEventListener('change', function() {
                  let inputId = input.id; // Get the id of the changed input
                  let quantity = parseInt(input.value); // Get the new quantity value
                  // Update the quantity accordingly
                  if (!isNaN(quantity) && quantity >= 1 && quantity <= 10) {
                      updateQuantityInSessionStorage(inputId, quantity);
                  } else {
                      // Reset the quantity to 1 if it's less than 1 or greater than 10
                      input.value = Math.min(Math.max(1, quantity), 10);
                      updateQuantityInSessionStorage(inputId, quantity);
                      console.log(`Invalid quantity for input with id ${inputId}. Resetting to ${input.value}`);
                  }
              });
          });

          // Function to update quantity in sessionStorage
          function updateQuantityInSessionStorage(inputId, quantity) {
              let cart = JSON.parse(sessionStorage.getItem('cart'));
              let currentCartItems = cart['cart-items'];
              const subTotalBill = document.getElementById('sub-total-bill');
              const totalCartPrice = document.getElementById('total-cart-price');
              const discountCost = document.getElementById('discount-cost');
              let discountPercent = parseInt(localStorage.getItem('playerPoints'));
              console.log(discountPercent);
              if (isNaN(discountPercent)) {
                discountPercent = 0;
              }

              // Find the item in currentCartItems array and update its quantity
              for (let i = 0; i < currentCartItems.length; i++) {
                  let currentItem = currentCartItems[i];
                  if (`${currentItem.id}-input` === inputId) {
                      totalProductPrice -= parseFloat(currentItem.totalPrice);
                      document.getElementById(`${currentItem.id}-totalprice`).innerHTML = `$${(parseFloat(currentItem.totalPrice) / parseInt(currentItem.quantity) * parseInt(quantity)).toFixed(2).toString()}`;
                      currentItem.totalPrice = (parseFloat(currentItem.totalPrice) / parseInt(currentItem.quantity) * parseInt(quantity)).toFixed(2).toString();
                      console.log(currentItem.totalPrice);
                      totalProductPrice += parseFloat(currentItem.totalPrice);
                      subTotalBill.innerHTML = `<b>$${(totalProductPrice).toFixed(2)}</b>`
                      if (discountPercent === 0){
                        totalCartPrice.innerHTML = `<b>$${(totalProductPrice).toFixed(2)}</b>`;
                        discountCost.innerHTML = `<b>-$0.00</b>`;
                      }
                      else{
                        totalCartPrice.innerHTML = `<b>$${(totalProductPrice*(1-discountPercent)).toFixed(2)}</b>`;
                        discountCost.innerHTML = `<b>-$${(totalProductPrice*(discountPercent)).toFixed(2)}</b>`;
                      }
                      currentItem.quantity = quantity.toString();
                      break;
                  }
              }

              // Update cart in sessionStorage
              sessionStorage.setItem('cart', JSON.stringify(cart));
              console.log(JSON.parse(sessionStorage.getItem('cart')));
          }

          // Function to increment the quantity
          function incrementQuantity(inputId) {
              let input = document.getElementById(inputId);
              let newValue = parseInt(input.value) + 1;
              if (newValue <= 10) {
                  input.value = newValue;
                  let quantity = newValue;
                  updateQuantityInSessionStorage(inputId, quantity);
              }
          }

          // Function to decrement the quantity
          function decrementQuantity(inputId) {
              let input = document.getElementById(inputId);
              let newValue = parseInt(input.value) - 1;
              if (newValue >= 1) {
                  input.value = newValue;
                  let quantity = newValue;
                  updateQuantityInSessionStorage(inputId, quantity);
              }
          }

          // Attach event listeners to plus and minus buttons
          Array.from(document.getElementsByClassName('cart-minus')).forEach(button => {
              button.addEventListener('click', function() {
                  let inputId = this.id.replace('-minus', '-input'); // Get the id of the associated input
                  console.log("input element:", inputId);
                  decrementQuantity(inputId); // Decrement the quantity
              });
          });

          Array.from(document.getElementsByClassName('cart-plus')).forEach(button => {
              button.addEventListener('click', function() {
                  let inputId = this.id.replace('-plus', '-input'); // Get the id of the associated input
                  console.log("input element:", inputId);
                  incrementQuantity(inputId); // Increment the quantity
              });
          });
      }

      // IMPORTANT LOGIC for getting the cart items
      // TO REMOVE AFTER API BAN
      const rememberMe = localStorage.getItem('rememberMe');
      console.log(rememberMe); // false
      if (rememberMe){
          sessionStorage.setItem('cart', localStorage.getItem('cart'));
          sessionStorage.setItem('username', localStorage.getItem('username'));
          sessionStorage.setItem('isLoggedIn', localStorage.getItem('isLoggedIn'));
      }
      const isLoggedIn = sessionStorage.getItem('isLoggedIn');

      if (isLoggedIn === "true"){
          const subTotalBill = document.getElementById('sub-total-bill');
          const totalCartPrice = document.getElementById('total-cart-price');
          const discountCost = document.getElementById('discount-cost');
          let discountPercent = parseInt(localStorage.getItem('playerPoints'));
          console.log(discountPercent);
          if (isNaN(discountPercent)) {
            discountPercent = 0;
          }
          // document.getElementById('no-items').style.display = 'none';
          document.getElementById('order-summary-cart-products').style.display = 'block';
          let username = sessionStorage.getItem('username');
          let cart = JSON.parse(sessionStorage.getItem('cart'));
          console.log(cart);
          let currentCartItems = cart['cart-items'];
          console.log(cart['cart-items']);
          let totalProductPrice = 0.00;
          totalProductPrice = generateCartDisplay();
          // console.log(cart);
          // console.log(currentCartItems);
          // console.log(currentCartItems.length);

          // Attach event listener to a parent element that persists in the DOM
          document.getElementById('order-summary-cart-products').addEventListener('click', function(event) {
              // Check if the click event originated from a delete button or its parent
              if (event.target.classList.contains('delete-cart') || event.target.parentElement.classList.contains('delete-cart')) {
                  // Extract the item ID to be deleted
                  let itemId = event.target.closest('.cart-product-container').id;
                  itemId = itemId.replace('-delete', ''); // Get the id of the item to be deleted
          
                  // Getting the updated currentCartItems
                  currentCartItems = JSON.parse(sessionStorage.getItem('cart'))['cart-items'];
          
                  // Filter out the item with the corresponding id from currentCartItems
                  currentCartItems = currentCartItems.filter(item => item.id !== itemId);
          
                  // Update item IDs accordingly
                  currentCartItems.forEach((item, index) => {
                      item.id = (index + 1).toString(); 
                  });
          
                  // Update sessionStorage with the updated cart items
                  let cart = JSON.parse(sessionStorage.getItem('cart'));
                  cart['cart-items'] = currentCartItems;
                  sessionStorage.setItem('cart', JSON.stringify(cart));
          
                  // Regenerate the cart display
                  generateCartDisplay();
              }
          });

          // Function to regenerate the cart display
          function generateCartDisplay() {
              let content = "";
              let totalProductPrice = 0; // Reset total product price
              document.getElementById('order-summary-cart-products').style.display = 'block';
              
              if (currentCartItems === undefined || currentCartItems.length === 0){
                  document.getElementById('order-summary-cart-products').innerHTML = '';
                  document.getElementById('place-order-btn').style.cursor = 'not-allowed'
                  subTotalBill.innerHTML = `<b>$0.00</b>`;
                  totalCartPrice.innerHTML = `<b>$0.00</b>`;
                  discountCost.innerHTML = `<b>-$0.00</b>`;
              }
              else{
                  console.log(JSON.stringify(currentCartItems));
                      for (var i = 0; i < currentCartItems.length; i++) {
                          let id = currentCartItems[i]["id"];
                          let product = currentCartItems[i]["product"];
                          let color = currentCartItems[i]["color"];
                          let quantity = currentCartItems[i]["quantity"];
                          let totalPrice = currentCartItems[i]["totalPrice"];
                          totalProductPrice += parseFloat(totalPrice);
                          if (window.location.pathname.includes("index.html")){
                              content += `<div id="${id}" class="cart-product-container">
                                          <div class="cart-image-container">
                                          <img src="images/${product}.png">
                                          </div>
                                          <div class="cart-details">
                                          <div class="cart-text">
                                              <p class="cart-product-name">${product}</p>
                                              <p class="cart-product-color">${color}</p>
                                              <div class="cart-add-quantity">
                                              <i id="${id}-minus" class="fa-solid fa-minus cart-minus"></i>
                                              <input id="${id}-input" class="cart-quantity-input" type="number" value="${quantity}">
                                              <i id="${id}-plus" class="cart-plus fa-solid fa-plus"></i>
                                              </div>
                                          </div>
                                          <div class="cart-price-cancel">
                                              <p id="${id}-totalprice" class="cart-price">$${totalPrice}</p>
                                              <i id="${id}-delete" class="fa-solid fa-xmark delete-cart"></i>
                                          </div>
                                          </div>
                                      </div>
                                      <hr>
                                      `;
                          }
                          else{
                              content += `<div id="${id}" class="cart-product-container">
                                          <div class="cart-image-container">
                                          <img src="../images/${product}.png">
                                          </div>
                                          <div class="cart-details">
                                          <div class="cart-text">
                                              <p class="cart-product-name">${product}</p>
                                              <p class="cart-product-color">${color}</p>
                                              <div class="cart-add-quantity">
                                              <i id="${id}-minus" class="fa-solid fa-minus cart-minus"></i>
                                              <input id="${id}-input" class="cart-quantity-input" type="number" value="${quantity}">
                                              <i id="${id}-plus" class="cart-plus fa-solid fa-plus"></i>
                                              </div>
                                          </div>
                                          <div class="cart-price-cancel">
                                              <p id="${id}-totalprice" class="cart-price">$${totalPrice}</p>
                                              <i id="${id}-delete" class="fa-solid fa-xmark delete-cart"></i>
                                          </div>
                                          </div>
                                      </div>
                                      <hr>
                                      `;
                          }
                      }
                      document.getElementById('order-summary-cart-products').innerHTML = content;
                      subTotalBill.innerHTML = `<b>$${(totalProductPrice).toFixed(2)}</b>`;
                      if (discountPercent === 0){
                        totalCartPrice.innerHTML = `<b>$${(totalProductPrice).toFixed(2)}</b>`;
                        discountCost.innerHTML = `<b>-$0.00</b>`;
                      }
                      else{
                        totalCartPrice.innerHTML = `<b>$${(totalProductPrice*(1-discountPercent)).toFixed(2)}</b>`;
                        discountCost.innerHTML = `<b>-$${(totalProductPrice*(discountPercent)).toFixed(2)}</b>`;
                      }

                      setUpCartEvenListeners(totalProductPrice);

                      return totalProductPrice;
                  }
          } 
      }
      else
      {
          document.getElementById('no-items').style.display = 'flex';
          document.getElementById('order-summary-cart-products').style.display = 'none';
          document.getElementById('no-item-caption').innerHTML = "Please Login To Add To Cart";
      }
  }

    
    const placeOrderBtn = document.getElementById('place-order-btn');
    const closeModal = document.querySelector("[data-close-modal]");
    const modal = document.querySelector("[data-modal]");
    const tickAnimation = document.querySelector("#tick-animation");

    placeOrderBtn.addEventListener("click", function(event){
      event.preventDefault();
      let orderSummaryCartProducts = document.getElementById('order-summary-cart-products');
      if (orderSummaryCartProducts.innerHTML.trim() === ""){
        alert("Unable to Checkout. Cart is Empty.")
      }
      else{
        // Validate the form
        if (validateForm()) {
          // Empty the cart in the database
          localStorage.setItem('playerPoints', "0")
          let username = sessionStorage.getItem('username');
          let cartId = JSON.parse(sessionStorage.getItem('cart'))._id;
          const APIKEY = "65c4881fe208c2067b545c56";

          var jsondata = {
              "username": username,
              "cart-items": []
          };

          var settings = { 
              method: "PUT", 
              headers: { 
                  "Content-Type": "application/json",   
                  "x-apikey": APIKEY, 
                  "Cache-Control": "no-cache" 
              }, 
              body: JSON.stringify(jsondata) 
          };
          fetch(`https://fedassg2-be9d.restdb.io/rest/user-cart/${cartId}`, settings)
              .then(response => response.json())
              .then(response => {
                console.log(response['cart-items']);
                let rememberMe = localStorage.getItem('rememberMe')
                if (rememberMe){
                  localStorage.setItem('cart', JSON.stringify(response)); 
                  console.log(JSON.parse(localStorage.getItem('cart')));
                }
                else{
                  sessionStorage.setItem('cart', JSON.stringify(response)); 
                  console.log(JSON.parse(sessionStorage.getItem('cart')));
                }
              });
          
          // If form is valid, proceed to show the modal
          modal.showModal();
          tickAnimation.stop();
          tickAnimation.currentFrame = 0;
          tickAnimation.play();
          document.getElementById('thank-you-modal').style.opacity = '1';
          document.body.style.overflowY = "hidden";
          setTimeout(function(){
            modal.close();
            tickAnimation.pause();
            document.getElementById('thank-you-modal').style.opacity = '0';
            document.body.style.overflowY = "scroll";
            window.location.href = "../index.html";
          }, 15000);
        }

      function validateForm() {
        // Get all required input fields
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        
        // Regular expressions for specific validations
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cardNumberRegex = /^(\d{4}\s?){3}\d{4}$/;
        const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        const cvcRegex = /^\d{3}$/;
        const phoneRegex = /^(?:\+\d{1,3}[- ]?\d{4}[- ]?\d{4}|\d{2,3}[- ]?\d{4}[- ]?\d{4})$/;
        
        // Check if all required fields are filled and validate specific criteria
        for (const field of requiredFields) {
          if (!field.value.trim()) {
            field.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
              field.focus();
            }, 100);
            return false; // Return false if any required field is empty
          } else if (field.type === 'email' && !emailRegex.test(field.value.trim())) {
            alert("Please enter a valid email address.");
            field.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
              field.focus();
            }, 100);
            return false;
          } else if (field.id === 'phone_number' && !phoneRegex.test(field.value.trim())) {
            alert("Please enter a valid phone number in the format XX-XXXX-XXXX or XXX-XXXX-XXXX.");
            field.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
              field.focus();
            }, 100);
            return false;
          } else if (field.id === 'card_number' && !cardNumberRegex.test(field.value.trim())) {
            alert("Please enter a valid card number (e.g., 1234 1234 1234 1234).");
            field.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
              field.focus();
            }, 100);
            return false;
          } else if (field.id === 'expiration_date' && !expirationDateRegex.test(field.value.trim())) {
            alert("Please enter a valid expiration date in MM/YY format.");
            field.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
              field.focus();
            }, 100);
            return false;
          } else if (field.id === 'cvc' && !cvcRegex.test(field.value.trim())) {
            alert("Please enter a valid CVC code (3 digits).");
            field.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => {
              field.focus();
            }, 100);
            return false;
          }
        }
        // If all required fields are filled and pass specific validations, return true
        return true;
      }
      
      closeModal.addEventListener("click", () =>{
        modal.close();
        tickAnimation.pause();
        document.getElementById('thank-you-modal').style.opacity = '0';
        document.body.style.overflowY = "scroll";
        window.location.href = "../index.html";
      })
    }
  });
});

