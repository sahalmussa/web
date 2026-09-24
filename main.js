// Slideshow on Home
function initSlideshow() {
    const slides = document.querySelectorAll('#slideshow img');
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 3000);
    if (slides.length > 0) slides[0].classList.add('active');
}

// Modal Popup
function showModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'block';
}

// Close Modal (add close button in HTML if needed)
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
}

// Product Search Filter
function initSearch() {
    const search = document.getElementById('search');
    if (search) {
        search.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.product').forEach(product => {
                const name = product.querySelector('h3').textContent.toLowerCase();
                product.style.display = name.includes(term) ? 'block' : 'none';
            });
        });
    }
}

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

function initCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const name = product.querySelector('h3').textContent;
            const price = parseFloat(product.querySelector('p strong').textContent.replace('$', ''));
            addToCart(name, price);
        });
    });
}

function displayCart() {
    const cartList = document.getElementById('cart-items');
    if (cartList) {
        cartList.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = () => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCart();
            };
            li.appendChild(removeBtn);
            cartList.appendChild(li);
        });
    }
}

// Init on Load
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    showModal(); // Show modal on load for first-time (prototype always shows)
    initSearch();
    initCartButtons();
    displayCart();
});