// Cart functionality
let cart = [];
const cartModal = document.getElementById('cartModal');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPrice = document.querySelector('.total-price');

// Open/Close cart modal
document.querySelector('.cart-btn').addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCart();
});

document.querySelector('.close-cart').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Close modal when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Quantity buttons functionality
document.querySelectorAll('.qty-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const input = e.target.parentElement.querySelector('.qty-input');
        if (e.target.classList.contains('plus')) {
            input.value = parseInt(input.value) + 1;
        } else if (e.target.classList.contains('minus') && parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.produto-card');
        const name = card.querySelector('h3').textContent;
        const price = parseFloat(card.querySelector('.preco').textContent.replace('R$ ', '').replace(',', '.'));
        const quantity = parseInt(card.querySelector('.qty-input').value);

        addToCart(name, price, quantity);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Produto adicionado ao carrinho!';
        successMessage.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-blue);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
});

function addToCart(name, price, quantity) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    
    updateCartCount();
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--light-gray);">
                <div>
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div>
                    <span>R$ ${itemTotal.toFixed(2)}</span>
                    <button onclick="removeFromCart('${item.name}')" style="background: none; border: none; color: red; cursor: pointer; margin-left: 1rem;">&times;</button>
                </div>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });
    
    totalPrice.textContent = `R$ ${total.toFixed(2)}`;
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartCount();
    updateCart();
}

// Newsletter form
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Obrigado por se inscrever!';
    successMessage.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-blue);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
    
    e.target.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Add animations on scroll
function reveal() {
    const reveals = document.querySelectorAll("[data-aos]");
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("aos-animate");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal(); // Initial check
