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

    // Optional: close the menu and hide the overlay when clicking outside
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
    closeCart.addEventListener('click', function(){
        var cartContainer = document.getElementById('cart-container');
        var cartOverlay = document.getElementById('cart-blur-overlay');
        
        cartContainer.classList.remove('open-cart');
        cartOverlay.style.display = "none";
        document.body.style.overflowY = "scroll";
    })

    document.addEventListener('click', function(event) {
        var cartContainer = document.getElementById('cart-container');
        var cartOverlay = document.getElementById('cart-blur-overlay');
        var isClickInsideCart = cartContainer.contains(event.target);
        var isClickInsideToggleButtons = Array.from(document.querySelectorAll('.toggle-cart-button')).some(button => button.contains(event.target));

        // Close the cart if the click is outside the cart and not on the toggle buttons
        if (!isClickInsideCart && !isClickInsideToggleButtons && cartContainer.classList.contains('open-cart')) {
            cartContainer.classList.remove('open-cart');
            cartOverlay.style.display = "none";
            document.body.style.overflowY = "scroll";
        }
    });

    /* detect Escape key when the overlay is open */
    document.body.addEventListener('keyup', (ev) => {
    if (ev.key === "Escape" && document.querySelector('#cart-container').classList.contains("open-cart")) {
        document.querySelector('#cart-container').classList.remove('open-cart');
        document.getElementById('cart-blur-overlay').style.display = "none";
        document.body.style.overflowY = "scroll";
    }
    })
});




//Ends Here

