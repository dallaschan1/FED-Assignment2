document.addEventListener("DOMContentLoaded", function(){
    // object = {"_id":"65c370b1d0ce5e3900011c4f","username":"ian22","cart-items":[{"id":1,"product":"Luxury Sofa","color":"Black","quantity":"1","totalPrice":"299.00"}]}
    // sessionStorage.setItem('isLoggedIn', 'true');
    // sessionStorage.setItem('RememberMe', false);
    // sessionStorage.setItem('username', 'ian22');
    // sessionStorage.setItem('cart', JSON.stringify(object));
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
    });
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

    DisplayCartItems();

    window.addEventListener('storage', function(e) {
        // Check if the storage event is for sessionStorage and if the key is 'cart'
        if (e.storageArea === sessionStorage && e.key === 'cart') {
            // Do something in response to changes to sessionStorage.getItem('cart')
            console.log('Changes detected in sessionStorage.getItem("cart")');
            DisplayCartItems()
        }
    });

    function DisplayCartItems(){
        console.log(JSON.parse(sessionStorage.getItem('cart')));
                
        const checkOutBtn = document.getElementById('checkout-btn');
        const cartProducts = document.getElementById('cart-products');
        updateCheckoutButton();
        function updateCheckoutButton() {
            if (cartProducts.innerHTML.trim() === "") {
                checkOutBtn.classList.add("disabled");
            }
            else {
                checkOutBtn.classList.remove("disabled");
                console.log(!(checkOutBtn.classList.contains('disabled')));
                document.getElementById('checkout-btn').addEventListener('click', function() {
                    document.querySelector('#cart-container').classList.remove('open-cart');
                    document.getElementById('cart-blur-overlay').style.display = "none";
                    document.body.style.overflowY = "scroll";
                    console.log("activating");

                    if (rememberMe){
                        localStorage.setItem('cart', sessionStorage.getItem('cart'));
                        localStorage.setItem('username', sessionStorage.getItem('username'));  
                    }
                    // Updating the cart items to the database when the cart is closed
                    let username = sessionStorage.getItem('username');
                    let cart = JSON.parse(sessionStorage.getItem('cart'));
                    console.log(cart);
                    console.log(cart['cart-items'])
                    let cartId = cart._id;
                    const APIKEY = "65c4881fe208c2067b545c56";

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
                    fetch(`https://fedassg2b-4d22.restdb.io/rest/user-cart/${cartId}`, settings)
                        .then(response => response.json()) // Parse the response JSON and return it
                        .then(response => {
                            for (var i = 0; i < response.length; i++) {
                            if (username === response[i].username){
                                if (rememberMe){
                                localStorage.setItem('cart', JSON.stringify(response[i])); 
                                }
                                else{
                                sessionStorage.setItem('cart', JSON.stringify(response[i]));
                                console.log(JSON.parse(sessionStorage.getItem('cart')));
                                }
                            }
                            }
                        })
                    
                    if (window.location.pathname.includes("checkout.html")){
                        // Do nothing
                    }
                    else if (window.location.pathname.includes("index.html")){
                        window.location.href = "html/checkout.html";
                    }
                    else{
                        window.location.href = "checkout.html";
                    }
                });
            }
                
        }

        const cartProductsObserver = new MutationObserver(function(mutations) {
            updateCheckoutButton();
        });
        cartProductsObserver.observe(cartProducts, { childList: true });


        const observer = new MutationObserver((mutationsList, observer) => {
            let cartContainer = document.getElementById('cart-container');
            
            for(const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const classList = cartContainer.classList;
                    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
                    if (!classList.contains('open-cart') && isLoggedIn === 'true') {
                        console.log('open-cart class was removed');
                        if (rememberMe){
                            localStorage.setItem('cart', sessionStorage.getItem('cart'));
                            localStorage.setItem('username', sessionStorage.getItem('username'));  
                        }
                        // Updating the cart items to the database when the cart is closed
                        let username = sessionStorage.getItem('username');
                        let cart = JSON.parse(sessionStorage.getItem('cart'));
                        console.log(cart);
                        console.log(cart['cart-items'])
                        let cartId = cart._id;
                        const APIKEY = "65c4881fe208c2067b545c56";

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
                        fetch(`https://fedassg2b-4d22.restdb.io/rest/user-cart/${cartId}`, settings)
                            .then(response => response.json()) // Parse the response JSON and return it
                            .then(response => {
                                for (var i = 0; i < response.length; i++) {
                                if (username === response[i].username){
                                    if (rememberMe){
                                    localStorage.setItem('cart', JSON.stringify(response[i])); 
                                    }
                                    else{
                                    sessionStorage.setItem('cart', JSON.stringify(response[i]));
                                    console.log(JSON.parse(sessionStorage.getItem('cart'))); 
                                    }
                                }
                                }
                            })
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
            const totalBill = document.getElementById('total-bill');

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

        // IMPORTANT LOGIC for getting the cart items
        // TO REMOVE AFTER API BAN
        const rememberMe = localStorage.getItem('rememberMe');
        console.log(rememberMe); // false
        if (rememberMe){
            sessionStorage.setItem('cart', localStorage.getItem('cart'));
            sessionStorage.setItem('username', localStorage.getItem('username'));
            sessionStorage.setItem('isLoggedIn', localStorage.getItem('isLoggedIn'));
            console.log(localStorage.getItem('cart'));
            console.log(localStorage.getItem('username'));
            console.log(localStorage.getItem('isLoggedIn'));
        }
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        console.log(isLoggedIn);
        console.log(sessionStorage.getItem('cart'));

        if (isLoggedIn === "true"){
            document.getElementById('no-items').style.display = 'none';
            document.getElementById('cart-products').style.display = 'block';
            let username = sessionStorage.getItem('username');
            let cart = JSON.parse(sessionStorage.getItem('cart'));
            console.log(cart);
            let currentCartItems = cart['cart-items'];
            console.log(cart['cart-items']);
            const totalBill = document.getElementById('total-bill');
            // console.log(cart);
            // console.log(currentCartItems);
            // console.log(currentCartItems.length);

            // Attach event listener to a parent element that persists in the DOM
            document.getElementById('cart-products').addEventListener('click', function(event) {
                // Check if the click event originated from a delete button or its parent
                if (event.target.classList.contains('delete-cart') || event.target.parentElement.classList.contains('delete-cart')) {
                    // Extract the item ID to be deleted
                    let itemId = event.target.closest('.cart-product-container').id;
                    console.log(itemId);
                    itemId = itemId.replace('-delete', ''); // Get the id of the item to be deleted
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
                    console.log(currentCartItems);
                    let cart = JSON.parse(sessionStorage.getItem('cart'));
                    cart['cart-items'] = currentCartItems;
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    console.log(JSON.parse(sessionStorage.getItem('cart')));
            
                    // Regenerate the cart display
                    generateCartDisplay();
                }
            });

            generateCartDisplay();

            // Function to regenerate the cart display
            function generateCartDisplay() {
                let content = "";
                let totalProductPrice = 0; // Reset total product price
                document.getElementById('no-items').style.display = 'none';
                document.getElementById('cart-products').style.display = 'block';
                console.log(currentCartItems);
                if (currentCartItems === undefined || currentCartItems.length === 0){
                    console.log("emptycart");
                    document.getElementById('no-items').style.display = 'flex';
                    document.getElementById('cart-products').style.display = 'none';
                    document.getElementById('no-item-caption').innerHTML = "Empty Cart";
                    document.getElementById('cart-products').innerHTML = "";
                    totalBill.innerHTML = `$0.00`;
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
                    document.getElementById('cart-products').innerHTML = content;
                    totalBill.innerHTML = `$${totalProductPrice.toFixed(2)}`;

                    setUpCartEvenListeners(totalProductPrice);
                    }
            } 
        }
        else
        {
            document.getElementById('no-items').style.display = 'flex';
            document.getElementById('cart-products').style.display = 'none';
            document.getElementById('no-item-caption').innerHTML = "Please Login To Add To Cart";
        }
    }
});