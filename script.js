const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');


let items = [
    {
        id: 1,
        name: 'Chevrolet Corvette c1',
        price: 147,
    },
    {
        id: 2,
        name: 'Ford Mustang 302 Coupe ',
        price: 123,
    },
    {
        id: 3,
        name: 'Mercedes-Benz 300sl gullwing Coupe',
        price: 330,
    },
    {
        id: 4,
        name: 'BMW M1 ',
        price: 370,
    },
    {
        id: 5,
        name: 'Ford Thunderbird',
        price: 207,
    },
    {
        id: 6,
        name: 'Ferrari-250-GT-SWB',
        price: 403,
    },
    {
        id: 7,
        name: 'Rolls-Royce Corniche II',
        price: 400,
    },
    {
        id: 8,
        name: 'Lamborghini Miura',
        price: 370,
    },
];

let cart = {};

function fillItemsGrid() {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="images/${item.id}.jpg" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event){

   const itemId = parseInt(event.target.getAttribute('data-id'));
   const item = items.find(item => item.id === itemId);

   if(cart[itemId]){
        cart[itemId].quantity++;
    }else{
        cart[itemId]= {
            item: item,
            quantity:1

        };
    }
  
    displayCart();
}

function displayCart(){
    cartItemsList.innerHTML = ""; //ocisti listu

    for (const key in cart) {
        const cartItem = cart[key];
        const cartItemElement = document.createElement('li');
        cartItemElement.textContent = `${cartItem.item.name} - $${cartItem.item.price} (Quantity: ${cartItem.quantity})`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = () => removeItemFromCart(key);

        cartItemElement.appendChild(removeButton);
        cartItemsList.appendChild(cartItemElement);
    }

    calculateTotalPrice();
    updateCartBadge();
}
function updateCartBadge(){
    let totalItems = 0;

    for(const key in cart){
        totalItems += cart[key].quantity;
    }

    cartBadge.textContent = totalItems;
}
function calculateTotalPrice(){
    let totalPrice = 0;

    for(const key in cart){
        const cartItem = cart[key];
        totalPrice += cartItem.item.price * cartItem.quantity;
    }
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

function removeItemFromCart(itemId){
    delete cart[itemId];
    displayCart();
}
function buyItems(){
    if(Object.keys(cart).length === 0){
        alert("Košarica je prazna! Dodajte proizvod prije kupovine.");
        return;
    }

    alert("Narudžba je uspješno obavljena. Hvala vam na kupovini!");
    cart = {};
    displayCart();
}
// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle('show-modal');
}

buyButton.addEventListener('click', buyItems);

fillItemsGrid();


cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);