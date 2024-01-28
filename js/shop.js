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

let filterableCards;

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
            content += `<div class="card-container" data-name="${products[i].category}">
                            <div class="card">
                                <img src="../images/${products[i].name}.png" class="card-img-top card-img" alt="${products[i].name}">
                            </div>
                            <p class="card-product">${products[i].name}</p>
                            <p class="card-price">$${products[i].price.toFixed(2)}</p>
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

      const dropdowns = document.querySelectorAll('.mydropdown');
      const slider = document.getElementById('drag-filter');
      const valueInput = document.getElementById('text-filter');

      valueInput.value = slider.value;

      dropdowns.forEach(dropdown => {
          const select = dropdown.querySelector('.select');
          const caret = dropdown.querySelector('.caret');
          const menu = dropdown.querySelector('.mymenu');
          const options = dropdown.querySelectorAll('.mymenu li');
          const selected = dropdown.querySelector('.selected');

          select.addEventListener('click', () => {
              select.classList.toggle('select-clicked');
              caret.classList.toggle('caret-rotate');
              menu.classList.toggle('mymenu-open');
          });

          options.forEach(option => {
            option.addEventListener('click', () => {
              selected.innerText = option.innerText;
              select.classList.remove('select-clicked');
              caret.classList.remove('caret-rotate');
              menu.classList.remove('mymenu-open');
          
              options.forEach(opt => {
                opt.classList.remove('active-filter');
              });
              option.classList.add('active-filter');
          
              const selectedCategory = option.dataset.name;
              const selectedPrice = parseFloat(valueInput.value) || 0;
              filterCards(selectedCategory, selectedPrice);
            });
          });
      });

      const filterCards = (selectedCategory, selectedPrice) => {
        filterableCards.forEach(card => {
          const cardCategories = card.dataset.name.includes(',')
            ? card.dataset.name.split(',')
            : [card.dataset.name.trim()];
      
          const cardPrice = parseFloat(card.querySelector('.card-price').textContent.replace('$', ''));
      
          card.classList.add("hide");
      
          const categoryCondition = selectedCategory === "all" || cardCategories.includes(selectedCategory);
          const priceCondition = selectedPrice === 300 || (cardPrice <= selectedPrice);
      
          if (categoryCondition && priceCondition) {
            card.classList.remove("hide");
          }
        });
      };

      valueInput.addEventListener('input', function() {
        const inputValue = parseFloat(valueInput.value) || 0;
      
        // Ensure the input value is within the range
        const clampedValue = Math.min(Math.max(inputValue, slider.min), slider.max);
      
        slider.value = clampedValue;
      
        const selectedCategory = document.querySelector('.active-filter').dataset.name;
        filterCards(selectedCategory, clampedValue);
      });

      slider.addEventListener('input', function() {
        valueInput.value = this.value;
      
        const selectedCategory = document.querySelector('.active-filter').dataset.name;
        filterCards(selectedCategory, parseInt(this.value));
      });
    })
    .catch(error => {
      console.error("Error:", error.message);
    });
});

