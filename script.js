const API_URL = "https://shopspherebackend-3q9h.onrender.com/api";
const categories = ["All", "Beauty", "Home Decor", "Electronics", "Dresses", "Jewellery", "Footwear", "Home Appliances", "Paintings", "Handbags", "Luxury"];
let activeCategory = "All";
let cart = [];
// NEW VARIABLES FOR WISHLIST AND USER
let wishlist = JSON.parse(localStorage.getItem('shopsphere_wishlist')) || [];
let currentUser = localStorage.getItem('shopsphere_user') || null;

const catImages = {
    "All": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&q=80",
    "Beauty": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&q=80",
    "Home Decor": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&q=80",
    "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&q=80",
    "Dresses": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150&q=80",
    "Jewellery": "https://images.unsplash.com/photo-1599643478514-4a4204e27e17?w=150&q=80",
    "Footwear": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&q=80",
    "Home Appliances": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&q=80",
    "Paintings": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150&q=80",
    "Handbags": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=150&q=80",
    "Luxury": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=150&q=80"
};

const products = [
    { id: 1, name: "Luxury Perfume", cat: "Beauty", price: 2499, img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80" },
    { id: 2, name: "Matte Lipstick", cat: "Beauty", price: 899, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80" },
    { id: 3, name: "Skincare Kit", cat: "Beauty", price: 1599, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80" },
    { id: 4, name: "Ceramic Vase", cat: "Home Decor", price: 599, img: "https://images.unsplash.com/photo-1581783342308-f792ca4ac094?w=400&q=80" },
    { id: 5, name: "Scented Candle", cat: "Home Decor", price: 499, img: "https://images.unsplash.com/photo-1602874801006-e26e46ef3b5e?w=400&q=80" },
    { id: 6, name: "Table Lamp", cat: "Home Decor", price: 1899, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" },
    { id: 7, name: "Wireless Headphones", cat: "Electronics", price: 2999, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
    { id: 8, name: "Smart Watch", cat: "Electronics", price: 4999, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" },
    { id: 9, name: "Bluetooth Speaker", cat: "Electronics", price: 1899, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80" },
    { id: 10, name: "Summer Dress", cat: "Dresses", price: 1499, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80" },
    { id: 11, name: "Denim Jacket", cat: "Dresses", price: 2999, img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80" },
    { id: 12, name: "Evening Gown", cat: "Dresses", price: 3999, img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80" },
    { id: 13, name: "Diamond Necklace", cat: "Jewellery", price: 9999, img: "https://images.unsplash.com/photo-1599643478514-4a4204e27e17?w=400&q=80" },
    { id: 14, name: "Gold Earrings", cat: "Jewellery", price: 4999, img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80" },
    { id: 15, name: "Silver Bracelet", cat: "Jewellery", price: 1999, img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80" },
    { id: 16, name: "Running Shoes", cat: "Footwear", price: 2499, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
    { id: 17, name: "High Heels", cat: "Footwear", price: 1899, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80" },
    { id: 18, name: "Leather Boots", cat: "Footwear", price: 3499, img: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=400&q=80" },
    { id: 19, name: "Coffee Maker", cat: "Home Appliances", price: 3999, img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=80" },
    { id: 20, name: "Air Fryer", cat: "Home Appliances", price: 5999, img: "https://images.unsplash.com/photo-1626269984841-19f53a17dc11?w=400&q=80" },
    { id: 21, name: "Electric Kettle", cat: "Home Appliances", price: 1299, img: "https://images.unsplash.com/photo-1594213114663-d94db9b17125?w=400&q=80" },
    { id: 22, name: "Abstract Art", cat: "Paintings", price: 2499, img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80" },
    { id: 23, name: "Landscape Painting", cat: "Paintings", price: 3499, img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&q=80" },
    { id: 24, name: "Modern Canvas", cat: "Paintings", price: 1999, img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80" },
    { id: 25, name: "Leather Tote", cat: "Handbags", price: 4599, img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80" },
    { id: 26, name: "Clutch Bag", cat: "Handbags", price: 1999, img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80" },
    { id: 27, name: "Shoulder Bag", cat: "Handbags", price: 2999, img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80" },
    { id: 28, name: "Designer Sunglasses", cat: "Luxury", price: 7999, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80" },
    { id: 29, name: "Luxury Watch", cat: "Luxury", price: 15999, img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80" },
    { id: 30, name: "Silk Scarf", cat: "Luxury", price: 3499, img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80" }
];

function init() {
    renderCategories();
    renderProducts();
    updateCartCount();
    checkLoginStatus();
    
    // SHOW WELCOME POPUP ON LOAD
    setTimeout(() => {
        showModal('welcomeModal');
    }, 500); // 0.5 second delay so page loads first
}

function renderCategories() {
    const list = document.getElementById('categoryList');
    list.innerHTML = categories.map(c => `
        <div class="cat-item ${c === activeCategory ? 'active' : ''}" onclick="selectCategory('${c}')">
            <img src="${catImages[c] || catImages['All']}" class="cat-img">
            <p>${c}</p>
        </div>
    `).join('');
}

function selectCategory(cat) {
    activeCategory = cat;
    renderCategories();
    document.getElementById('categoryTitle').innerText = cat === "All" ? "Trending Products" : cat;
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = products.filter(p => {
        const matchCategory = (activeCategory === "All" || p.cat === activeCategory);
        const matchSearch = p.name.toLowerCase().includes(search);
        return matchCategory && matchSearch;
    });
    
    grid.innerHTML = filtered.map(p => {
        // CHECK IF ITEM IS IN WISHLIST
        const isWishlisted = wishlist.includes(p.id) ? 'active' : '';
        
        return `
        <div class="card">
            <span class="wishlist-icon ${isWishlisted}" onclick="toggleWishlist(${p.id})">❤️</span>
            <img src="${p.img}" alt="${p.name}">
            <div class="card-info">
                <h4>${p.name}</h4>
                <p class="price">₹${p.price}</p>
                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        </div>
        `;
    }).join('');
}

// --- NEW WISHLIST LOGIC ---
function toggleWishlist(id) {
    const index = wishlist.indexOf(id);
    if (index > -1) {
        wishlist.splice(index, 1); // Remove
        showToast("Removed from Wishlist!");
    } else {
        wishlist.push(id); // Add
        showToast("Added to Wishlist! ❤️");
    }
    localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlist));
    renderProducts(); // Refresh grid to update heart color
}

function openWishlist() {
    const container = document.getElementById('wishlistItems');
    
    if (wishlist.length === 0) {
        container.innerHTML = "<p style='text-align:center; padding: 20px;'>Your wishlist is empty.</p>";
    } else {
        container.innerHTML = wishlist.map(id => {
            const p = products.find(prod => prod.id === id);
            return `
            <div class="cart-item">
                <span>${p.name} - ₹${p.price}</span>
                <button class="remove-btn" onclick="toggleWishlist(${p.id}); openWishlist();">Remove</button>
            </div>`;
        }).join('');
    }
    showModal('wishlistModal');
}

// --- NEW LOGIN LOGIC ---
function openAuth() {
    if (currentUser) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('profileInfo').style.display = 'block';
        document.getElementById('profileName').innerText = currentUser;
        document.getElementById('authTitle').innerText = "My Profile";
    } else {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('profileInfo').style.display = 'none';
        document.getElementById('authTitle').innerText = "Login / Register";
    }
    showModal('authModal');
}

function loginUser() {
    const name = document.getElementById('userName').value;
    if (name) {
        currentUser = name;
        localStorage.setItem('shopsphere_user', name);
        document.getElementById('loginBtn').innerText = "👤 " + name;
        closeModal('authModal');
        showToast("Welcome " + name + "! 🎉");
    } else {
        alert("Please enter your name.");
    }
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('shopsphere_user');
    document.getElementById('loginBtn').innerText = "👤 Login";
    closeModal('authModal');
    showToast("Logged out.");
}

function checkLoginStatus() {
    if (currentUser) {
        document.getElementById('loginBtn').innerText = "👤 " + currentUser;
    }
}

// --- CART LOGIC ---
function addToCart(id) {
    const p = products.find(x => x.id === id);
    const existing = cart.find(x => x.id === id);
    if(existing) existing.qty++;
    else cart.push({ ...p, qty: 1 });
    updateCartCount();
    showToast("Added to Cart! 🛒");
}

function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cartCount').innerText = count;
}

function openCart() {
    let total = 0;
    const itemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        itemsDiv.innerHTML = "<p style='text-align:center; padding: 20px;'>Your bag is empty.</p>";
    } else {
        itemsDiv.innerHTML = cart.map((item, i) => {
            total += item.price * item.qty;
            return `
            <div class="cart-item">
                <span>${item.name} (x${item.qty})</span>
                <span>₹${item.price * item.qty} <button class="remove-btn" onclick="removeFromCart(${i})">Remove</button></span>
            </div>`;
        }).join('');
    }
    document.getElementById('cartTotal').innerText = total;
    showModal('cartModal');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    openCart();
}

// --- ORDER LOGIC ---
async function placeOrder() {
    if(cart.length === 0) return alert("Bag is empty!");
    
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    
    let savedOrders = JSON.parse(localStorage.getItem('shopsphere_orders')) || [];
    const newOrder = {
        id: "ORD-" + Math.floor(Math.random() * 10000),
        items: [...cart],
        total: total,
        date: new Date().toLocaleString()
    };
    savedOrders.push(newOrder);
    localStorage.setItem('shopsphere_orders', JSON.stringify(savedOrders));

    const orderData = { items: cart, total: total };
    try {
        await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
    } catch (err) {
        console.log("Backend offline, saved locally.");
    }

    cart = [];
    updateCartCount();
    closeModal('cartModal');
    showToast("Order Placed Successfully! 🎉");
}

function showOrders() {
    document.getElementById('ordersModal').style.display = 'block';
    const list = document.getElementById('ordersList');
    
    let savedOrders = JSON.parse(localStorage.getItem('shopsphere_orders')) || [];
    
    if(savedOrders.length === 0) {
        list.innerHTML = "<p style='text-align:center; padding: 20px;'>No orders yet.</p>";
        return;
    }
    
    list.innerHTML = savedOrders.reverse().map(o => `
        <div style="border:1px solid #eee; padding:12px; margin-bottom:12px; border-radius:8px;">
            <h4 style="color: #ff3f6c; margin-bottom:5px;">Order ID: ${o.id}</h4>
            <p style="font-size:13px; color:#666;"><b>Date:</b> ${o.date}</p>
            <p style="font-size:14px; margin-top:5px;"><b>Total:</b> ₹${o.total}</p>
        </div>
    `).join('');
}

function showModal(id) { document.getElementById(id).style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg; 
    t.style.display = 'block';
    setTimeout(() => t.style.display = 'none', 3000);
}

init();