
//  Toggle the Navigation Menu
const menuIcon = document.getElementById("hamburg-menu"); // Selects the hamburger menu icon
const navbr = document.querySelector(".navbar"); // Selects the navigation bar

// Adds a click event to toggle the navigation menu's visibility
menuIcon.addEventListener("click", () => {
    navbr.classList.toggle("active"); // Toggles the "active" class for the navbar
});


//  Selecting UI Elements
// Select elements
const search = document.querySelector('.search-form'); // Selects the search form
const cartshoping = document.querySelector('.shopping-cart'); // Selects the shopping cart
const navbar = document.querySelector('.navbar'); // Selects the navigation bar
const loginForm = document.querySelector('.login-form'); // Selects the login form
const signupForm = document.querySelector('.Signup-form'); // Selects the signup form
const closeCart = document.querySelector('.close-btn'); // Selects the close button for the cart
const iconCartSpan = document.querySelector('#cart-count'); // Selects the cart count span
const listProductHTML = document.querySelector('.listProduct'); // Selects the product list container
const listCartHTML = document.querySelector('.listcart'); // Selects the cart container


//  Function to Remove Active Classes
// Function to remove "active" class from all UI elements
const removeActiveClasses = () => {
    search.classList.remove('active'); // Hide search form
    cartshoping.classList.remove('active'); // Hide shopping cart
    navbar.classList.remove('active'); // Hide navbar
    loginForm.classList.remove('active'); // Hide login form
    signupForm.classList.remove('active'); // Hide signup form
};


// Event Listeners for UI Interactions
document.querySelector("#search-btn").onclick = () => {
    removeActiveClasses(); // Remove active class from other sections
    search.classList.toggle('active'); // Show or hide search form
};

document.querySelector('#cart').onclick = () => {
    removeActiveClasses(); // Remove active class from other sections
    cartshoping.classList.toggle('active'); // Show or hide shopping cart
};

document.querySelector('#hamburg-menu').onclick = () => {
    removeActiveClasses(); // Remove active class from other sections
    navbar.classList.add('active'); // Show navigation menu
};

document.querySelector('#login').onclick = () => {
    removeActiveClasses(); // Remove active class from other sections
    loginForm.classList.add('active'); // Show login form
};

document.querySelector('#Signup').onclick = (event) => {
    event.preventDefault(); // Prevents default page reload
    removeActiveClasses(); // Remove active class from other sections
    signupForm.classList.add('active'); // Show signup form
};

document.querySelector('#switchToLogin').onclick = (event) => {
    event.preventDefault(); // Prevents default page reload
    removeActiveClasses(); // Remove active class from other sections
    loginForm.classList.add('active'); // Show login form
};

// Close the shopping cart when clicking the close button
closeCart.addEventListener('click', () => {
    cartshoping.classList.remove('active');
});

// Remove active classes from all sections when scrolling
window.onscroll = removeActiveClasses;

// scroll code==========


// Initializing Product List and Cart
let products = []; // Array to store product data
let cart = []; // Array to store cart items


document.addEventListener("DOMContentLoaded", () => {
    const listProductHTML = document.querySelector('.listProduct');
    const listCartHTML = document.querySelector('.listcart');
    const iconCartSpan = document.querySelector('#cart-count');
    const totalPriceHTML = document.getElementById('totalPrice');

    // Function to Render Products
    const addDataToHTML = () => {
        if (!listProductHTML) {
            console.error("Error: listProductHTML element not found.");
            return;
        }

        if (products.length > 0) {
            listProductHTML.innerHTML = ''; // Clear before adding new products
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('box1');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price} <span></span></div>
                <button class="addCart">Add To Cart</button>`;
                
                listProductHTML.appendChild(newProduct);
            });
        }
    };

    //  Add Products to Cart

    listProductHTML.addEventListener('click', (event) => {
        let positionclick = event.target;
        if (positionclick.classList.contains("addCart")) {
            let positionid = positionclick.parentElement.dataset.id;
            addtocart(positionid);
        }
    });

    const addtocart = (product_id) => {
        let positionProductInCart = cart.findIndex((value) => value.product_id == product_id);

        if (positionProductInCart < 0) {
            cart.push({
                product_id: product_id,
                quantity: 1
            });
        } else {
            cart[positionProductInCart].quantity += 1;
        }

        addCartToHTML();
        addCartToMemory();
    };

    const addCartToMemory = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    //  Display Cart Items
    const addCartToHTML = () => {
        listCartHTML.innerHTML = '';  // Clear cart items
        let totalQuantity = 0;
        let totalPrice = 0; // 🆕 Variable to store total price
    
        if (cart.length > 0) {
            cart.forEach(item => {
                totalQuantity += item.quantity;
    
                let positionProduct = products.find(value => value.id == item.product_id);
                let productPrice = positionProduct.price * item.quantity;
                totalPrice += productPrice;  // 🆕 Add product price to total price
    
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;
                newItem.innerHTML = `
                    <div class="image">
                        <img src="${positionProduct.image}">
                    </div>
                    <div class="name">${positionProduct.name}</div>
                    <div class="totalPrice">$${productPrice.toFixed(2)}</div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${item.quantity}</span>
                        <span class="plus">></span>
                    </div>
                `;
                listCartHTML.appendChild(newItem);
            });
        }
        
        iconCartSpan.innerText = totalQuantity;
        totalPriceHTML.innerText = totalPrice.toFixed(2);  // 🆕 Update total price in HTML
    };
    

    listCartHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
            let product_id = positionClick.parentElement.parentElement.dataset.id;
            let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
            changeQuantityCart(product_id, type);
        }
    });

    const changeQuantityCart = (product_id, type) => {
        let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
        if (positionItemInCart >= 0) {
            switch (type) {
                case 'plus':
                    cart[positionItemInCart].quantity += 1;
                    break;
                default:
                    let changeQuantity = cart[positionItemInCart].quantity - 1;
                    if (changeQuantity > 0) {
                        cart[positionItemInCart].quantity = changeQuantity;
                    } else {
                        cart.splice(positionItemInCart, 1);
                    }
                    break;
            }
        }
        addCartToHTML();
        addCartToMemory();
    };

    //  Fetch Product Data
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    }).catch(error => console.error("Error fetching products.json:", error));
});
