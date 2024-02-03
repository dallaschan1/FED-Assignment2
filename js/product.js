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

const openModal = document.querySelector("[data-open-modal]");
const closeModal = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

openModal.addEventListener("click", () => {
    modal.showModal();
    quantityInput.blur();
});

closeModal.addEventListener("click", () =>{
    modal.close();
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



