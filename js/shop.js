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

// document.addEventListener("DOMContentLoaded", function () {
//     const APIKEY = "65b39da5fc1ad2bd332e3653";
  
//     function fetchProductsAndPopulateCards() {
//       let settings = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-apikey": APIKEY,
//           "Cache-Control": "no-cache"
//         },
//       };
    
//       fetch("https://fedassg2product-f089.restdb.io/rest/product", settings)
//         .then(response => response.json())
//         .then(products => {
//           let content = "";
    
//           for (let i = 0; i < 6; i++) {
//             content += `<div class="card-container" data-name="${product[i].category}">
//                             <div class="card">
//                                 <img src="../images/${products[i].name}.png" class="card-img-top card-img" alt="${products[i].name}">
//                             </div>
//                             <p class="card-product">${products[i].name}</p>
//                             <p class="card-price">$${products[i].price.toFixed(2)}</p>
//                         </div>`;
//           }
    
//           document.getElementById("card-flex").innerHTML = content;
  
//           // Hide the loader after data is loaded
//           const loader = document.getElementById("loader");
//           loader.style.opacity = "0";
//           setTimeout(function(){
//             document.body.style.overflowY = 'scroll';
//             loader.style.display = "none";
//           }, 1000);
//         })
//         .catch(error => {
//           console.error("Error fetching products:", error.message);
//           // You may want to handle errors here and adjust the loader accordingly
//         });
//     }
    
//     // Call the function to fetch data and populate cards
//     fetchProductsAndPopulateCards();  
//   }
//   );

const dropdowns = document.querySelectorAll('.mydropdown');

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
        console.log('OPEN MENU');
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

            filterCards(option.dataset.name); // Call the filtering function with the selected category
        });
    });
});

const filterableCards = document.querySelectorAll(".card-container");

const filterCards = (selectedCategory) => {
    filterableCards.forEach(card => {
        const cardCategories = card.dataset.name.split(',');

        card.classList.add("hide");

        if (selectedCategory === "all" || cardCategories.includes(selectedCategory)) {
            card.classList.remove("hide");
        }
    });
};


const slider = document.getElementById('drag-filter');
const valueInput = document.getElementById('text-filter');
const cardPrice = document.querySelectorAll(".card-price");

valueInput.value = slider.value;

valueInput.addEventListener('input', function() {
  const inputValue = parseInt(valueInput.value) || 0;

  // Ensure the input value is within the range
  const clampedValue = Math.min(Math.max(inputValue, slider.min), slider.max);

  slider.value = clampedValue;
  
  filterCardsPrice(clampedValue);
});

slider.addEventListener('input', function() {
  valueInput.value = this.value;
  filterCardsPrice(parseInt(this.value));
});


function filterCardsPrice(selectedPrice) {
  filterableCards.forEach(card => {
    const cardPrice = parseFloat(card.querySelector('.card-price').textContent.replace('$', ''));

    card.classList.add("hide");

    if (selectedPrice === 300 || (cardPrice <= selectedPrice)) {
      card.classList.remove("hide");
    }
  });
}