document.addEventListener('DOMContentLoaded', function () {

    //FUNCTIONS for the slideout menu
    document.querySelector('.hamburg-menu').addEventListener('click', function() {
        var menu = document.getElementById('slideout-menu');
        var overlay = document.getElementById('overlay');
        var html = document.documentElement;

        menu.classList.toggle('open');
        overlay.classList.toggle('active');
        html.classList.toggle('no-scroll'); // Toggle the no-scroll class
    });

    // Close the menu and hide the overlay when clicking on the overlay
    document.getElementById('overlay').addEventListener('click', function() {
        document.getElementById('slideout-menu').classList.remove('open');
        this.classList.remove('active');
        document.documentElement.classList.remove('no-scroll'); // Remove the no-scroll class
    });

    // close the menu and hide the overlay when clicking outside
    document.addEventListener('click', function(event) {
        var isClickInsideMenu = document.getElementById('slideout-menu').contains(event.target);
        var isClickHamburgMenu = document.querySelector('.hamburg-menu').contains(event.target);
        var overlay = document.getElementById('overlay');

        if (!isClickInsideMenu && !isClickHamburgMenu && overlay.classList.contains('active')) {
            document.getElementById('slideout-menu').classList.remove('open');
            overlay.classList.remove('active');
            document.documentElement.classList.remove('no-scroll'); // Remove the no-scroll class
        }
    });

    // Function for the slideout cart
    function toggleCart() {
        var cartContainer = document.querySelector('#cart-container');
        var cartOverlay = document.getElementById('cart-blur-overlay');
    
        cartContainer.classList.toggle('open-cart');
        cartOverlay.style.display = "block";
        cartContainer.scrollTop = 0;
        document.body.style.overflowY = "hidden";
    }

    const toggleCartBtn = document.querySelectorAll('.toggle-cart-button');
    toggleCartBtn.forEach(element => {
        element.addEventListener('click', toggleCart);
    });

    const closeCart = document.querySelector('#close-cart');
    if (closeCart) {
    closeCart.addEventListener('click', function(){
        var cartContainer = document.getElementById('cart-container');
        var cartOverlay = document.getElementById('cart-blur-overlay');
        
        cartContainer.classList.remove('open-cart');
        cartOverlay.style.display = "none";
        document.body.style.overflowY = "scroll";
    })
}

    document.getElementById('cart-blur-overlay').addEventListener('click', function() {
        var cartContainer = document.getElementById('cart-container');
        var cartOverlay = document.getElementById('cart-blur-overlay');
        cartContainer.classList.remove('open-cart');
        cartOverlay.style.display = "none";
        document.body.style.overflowY = "scroll";
    });

    /* detect Escape key when the overlay is open */
    document.body.addEventListener('keyup', (ev) => {
    if (ev.key === "Escape" && document.querySelector('#cart-container').classList.contains("open-cart")) {
        document.querySelector('#cart-container').classList.remove('open-cart');
        document.getElementById('cart-blur-overlay').style.display = "none";
        document.body.style.overflowY = "scroll";
    }
    })

    const observer = new MutationObserver((mutationsList, observer) => {
        let cartContainer = document.getElementById('cart-container');
        
        for(const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const classList = cartContainer.classList;
                let isLoggedIn = sessionStorage.getItem('isLoggedIn');
                if (!classList.contains('open-cart') && isLoggedIn === true) {
                    // Event triggers when open-cart class is removed
                    console.log('open-cart class was removed');
                    // Updating the cart items to the database when the cart is closed
                    let username = sessionStorage.getItem('username');
                    let cart = JSON.parse(sessionStorage.getItem('cart'));
                    let cartId = cart._id;
                    const APIKEY = "65b39da5fc1ad2bd332e3653";
    
                    var jsondata = {
                        "username": username,
                        "cart-items": cart['cart-items']
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
                    fetch(`https://fedassg2product-f089.restdb.io/rest/user-cart/${cartId}`, settings)
                        .then(response => response.json()) // Parse the response JSON and return it
                }
            }
        }
    });
    
    let cartContainer = document.getElementById('cart-container');
    // Observer to observe if open-cart class is removed from id='cart-Container'
    observer.observe(cartContainer, { attributes: true });

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

            // Find the item in currentCartItems array and update its quantity
            for (let i = 0; i < currentCartItems.length; i++) {
                let currentItem = currentCartItems[i];
                if (`${currentItem.id}-input` === inputId) {
                    totalProductPrice -= parseFloat(currentItem.totalPrice);
                    document.getElementById(`${currentItem.id}-totalprice`).innerHTML = `$${(parseFloat(currentItem.totalPrice) / parseInt(currentItem.quantity) * parseInt(quantity)).toFixed(2).toString()}`;
                    currentItem.totalPrice = (parseFloat(currentItem.totalPrice) / parseInt(currentItem.quantity) * parseInt(quantity)).toFixed(2).toString();
                    console.log(currentItem.totalPrice);
                    totalProductPrice += parseFloat(currentItem.totalPrice);
                    totalBill.innerHTML = `$${totalProductPrice.toFixed(2)}`;
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

    setUpCartEvenListeners()

    // IMPORTANT LOGIC for getting the cart items
    // TO REMOVE AFTER API BAN
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn === true){
        // Function to regenerate the cart display
        let username = sessionStorage.getItem('username');
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        let currentCartItems = cart['cart-items'];
        let totalProductPrice = 0.00;
        const totalBill = document.getElementById('total-bill');
        totalProductPrice = generateCartDisplay();
        // console.log(currentCartItems);
        // console.log(currentCartItems.length);

        function generateCartDisplay() {
            let content = "";
            let totalProductPrice = 0; // Reset total product price
            if (currentCartItems === undefined || currentCartItems.length === 0){
                document.getElementById('no-items').style.display = 'flex';
                document.getElementById('cart-products').style.display = 'none';
                document.getElementById('no-item-caption').innerHTML = "Empty Cart";
            }
            console.log(JSON.stringify(currentCartItems));
            for (var i = 0; i < currentCartItems.length; i++) {
                let id = currentCartItems[i]["id"];
                let product = currentCartItems[i]["product"];
                let color = currentCartItems[i]["color"];
                let quantity = currentCartItems[i]["quantity"];
                let totalPrice = currentCartItems[i]["totalPrice"];
                totalProductPrice += parseFloat(totalPrice);
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
            document.getElementById('cart-products').innerHTML = content;
            totalBill.innerHTML = `$${totalProductPrice.toFixed(2)}`;

            setUpCartEvenListeners(totalProductPrice);

            return totalProductPrice;
        }

        // Attach event listener to a parent element that persists in the DOM
        document.getElementById('cart-products').addEventListener('click', function(event) {
            // Check if the click event originated from a delete button
            if (event.target.classList.contains('delete-cart')) {
                let itemId = event.target.id.replace('-delete', ''); // Get the id of the item to be deleted
                console.log(itemId);
                // Getting the updated currentCartItems
                currentCartItems = JSON.parse(sessionStorage.getItem('cart'))['cart-items'];

                // Filter out the item with the corresponding id from currentCartItems
                currentCartItems = currentCartItems.filter(item => item.id !== itemId);
                console.log(currentCartItems);
                // Update item IDs accordingly
                currentCartItems.forEach((item, index) => {
                    item.id = (index + 1).toString(); 
                });
                // Update sessionStorage with the updated cart items
                let cart = JSON.parse(sessionStorage.getItem('cart'));
                cart['cart-items'] = currentCartItems;
                sessionStorage.setItem('cart', JSON.stringify(cart));
                console.log(JSON.parse(sessionStorage.getItem('cart')));
                // Regenerate the cart display
                generateCartDisplay();
            }
        });
    }
    else
    {
        document.getElementById('no-items').style.display = 'flex';
        document.getElementById('cart-products').style.display = 'none';
        document.getElementById('no-item-caption').innerHTML = "Please Login To Add To Cart";
    }
});




//Ends Here

document.addEventListener('DOMContentLoaded', function() {
    // Assign URLs to each menu item
    var urls = {
        'Home': '../index.html',
        'Shop': 'shop.html',
        'Game': 'game.html',
        'Contact Us': 'Contact.html',
        'Forums': 'Discussion.html',
        'Check out': 'checkout.html',
        'Create A Post': 'Create.html',
    };

    // Select all slideout items
    var items = document.querySelectorAll('.slideout-item, .slideout-button');

    items.forEach(function(item) {
        item.addEventListener('click', function() {
            // Get the text content of the item or button
            var text = item.textContent.trim();
            // Navigate to the corresponding URL
            if (urls[text]) {
                window.location.href = urls[text];
            }
        });
    });
});
