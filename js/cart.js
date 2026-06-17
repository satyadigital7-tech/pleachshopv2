/**
 * Pleach Shop - Cart Operations & Order Processing
 */

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  
  // Re-bind when cart updates from other actions
  window.addEventListener("cartUpdated", () => {
    renderCart();
  });
});

function renderCart() {
  const emptyView = document.getElementById("empty-cart-view");
  const activeView = document.getElementById("active-cart-view");

  if (!emptyView || !activeView) return;

  const cart = getCart();

  if (cart.length === 0) {
    // Show empty cart view
    activeView.classList.add("d-none");
    emptyView.classList.remove("d-none");
    
    // Customize empty cart UI based on login status
    const user = getLoggedInUser();
    const loginHint = document.getElementById("empty-cart-login-hint");
    const loginBtn = document.getElementById("cart-login-btn");
    
    if (user) {
      if (loginHint) loginHint.textContent = "Browse our categories and add products to start shopping!";
      if (loginBtn) loginBtn.classList.add("d-none");
    } else {
      if (loginHint) loginHint.textContent = "Add items to it now, or log in to see items you saved previously.";
      if (loginBtn) loginBtn.classList.remove("d-none");
    }
    return;
  }

  // Show active cart view
  emptyView.classList.add("d-none");
  activeView.classList.remove("d-none");

  const rowsContainer = document.getElementById("cart-rows-container");
  if (!rowsContainer) return;

  let html = "";
  let totalMRP = 0;
  let totalDiscount = 0;
  let totalQty = 0;

  cart.forEach(item => {
    // Find product information
    const prod = typeof PRODUCTS_DATA !== "undefined" ? getProductById(item.id) : null;
    if (!prod) return;

    const itemMRP = prod.originalPrice * item.qty;
    const itemDiscount = (prod.originalPrice - prod.price) * item.qty;

    totalMRP += itemMRP;
    totalDiscount += itemDiscount;
    totalQty += item.qty;

    html += `
      <div class="cart-item-row" data-id="${prod.id}">
        <!-- Image Column -->
        <div class="cart-item-img-col">
          <img src="${prod.image}" alt="${prod.name}">
        </div>
        
        <!-- Info Column -->
        <div class="cart-item-info-col">
          <a href="product-details.html?id=${prod.id}" class="cart-item-name h6 text-dark">${prod.name}</a>
          <span class="cart-item-seller">Seller: ${prod.brand}</span>
          
          <div class="d-flex align-items-baseline gap-2">
            <span class="fw-bold fs-5 text-dark">₹${(prod.price * item.qty).toLocaleString()}</span>
            <span class="text-secondary text-decoration-line-through style-sm" style="font-size: 13px;">₹${itemMRP.toLocaleString()}</span>
            <span class="text-success fw-semibold style-sm" style="font-size: 13px;">${prod.discount}% Off</span>
          </div>

          <!-- Quantity adjusters -->
          <div class="cart-qty-selectors">
            <button class="btn-qty btn-qty-minus" ${item.qty <= 1 ? 'disabled' : ''}>-</button>
            <input type="text" class="qty-input" value="${item.qty}" readonly>
            <button class="btn-qty btn-qty-plus">+</button>
          </div>

          <!-- Actions -->
          <div class="cart-item-actions">
            <button class="btn-cart-action btn-save-later-item">Save For Later</button>
            <button class="btn-cart-action btn-remove-cart-item">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  rowsContainer.innerHTML = html;

  // Calculate pricing breakdown
  const subtotal = totalMRP - totalDiscount;
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const netTotal = subtotal + deliveryCharge;

  document.getElementById("cart-items-count-heading").textContent = `${cart.length} Item${cart.length > 1 ? 's' : ''}`;
  document.getElementById("price-summary-label").textContent = `Price (${totalQty} item${totalQty > 1 ? 's' : ''})`;
  document.getElementById("price-total-mrp").textContent = `₹${totalMRP.toLocaleString()}`;
  document.getElementById("price-total-discount").textContent = `- ₹${totalDiscount.toLocaleString()}`;
  
  const delChargeEl = document.getElementById("price-delivery-charge");
  if (deliveryCharge === 0) {
    delChargeEl.innerHTML = `<span class="text-success fw-bold">FREE</span>`;
  } else {
    delChargeEl.textContent = `₹${deliveryCharge}`;
  }

  document.getElementById("price-net-total").textContent = `₹${netTotal.toLocaleString()}`;
  document.getElementById("price-savings-amount").textContent = `₹${totalDiscount.toLocaleString()}`;

  // Bind cart events
  setupCartItemEvents();
}

function setupCartItemEvents() {
  // Qty Minus
  document.querySelectorAll(".btn-qty-minus").forEach(btn => {
    btn.addEventListener("click", function() {
      const row = this.closest(".cart-item-row");
      const id = row.dataset.id;
      const cart = getCart();
      const item = cart.find(i => i.id === id);
      if (item && item.qty > 1) {
        updateCartQty(id, item.qty - 1);
        renderCart();
      }
    });
  });

  // Qty Plus
  document.querySelectorAll(".btn-qty-plus").forEach(btn => {
    btn.addEventListener("click", function() {
      const row = this.closest(".cart-item-row");
      const id = row.dataset.id;
      const cart = getCart();
      const item = cart.find(i => i.id === id);
      if (item) {
        updateCartQty(id, item.qty + 1);
        renderCart();
      }
    });
  });

  // Remove
  document.querySelectorAll(".btn-remove-cart-item").forEach(btn => {
    btn.addEventListener("click", function() {
      const row = this.closest(".cart-item-row");
      const id = row.dataset.id;
      removeFromCart(id);
      renderCart();
    });
  });

  // Save for later (moves to wishlist)
  document.querySelectorAll(".btn-save-later-item").forEach(btn => {
    btn.addEventListener("click", function() {
      const row = this.closest(".cart-item-row");
      const id = row.dataset.id;
      
      // Add to wishlist if not present
      const wishlist = getWishlist();
      if (!wishlist.includes(id)) {
        toggleWishlist(id);
      } else {
        showToast("Item already saved in Wishlist");
      }
      
      // Remove from cart
      removeFromCart(id);
      renderCart();
    });
  });

  // Place Order Action
  const placeOrderBtn = document.getElementById("place-order-btn");
  if (placeOrderBtn) {
    placeOrderBtn.onclick = () => {
      const user = getLoggedInUser();
      if (!user) {
        showToast("Please login to proceed to checkout", "error");
        setTimeout(() => {
          window.location.href = "login.html?returnUrl=cart.html";
        }, 1200);
        return;
      }

      // Check if user has an address
      const addressKey = `pleach_addresses_${user.email}`;
      const addresses = JSON.parse(localStorage.getItem(addressKey)) || [];
      let activeAddress = addresses.find(a => a.active) || addresses[0] || null;

      if (!activeAddress) {
        // Create a default fallback mock address
        activeAddress = {
          name: user.name,
          phone: user.phone || "9876543210",
          locality: "Main Bazar",
          address: "Flat 402, Highrise Tower, Sector 15",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400051",
          type: "Home",
          active: true
        };
        localStorage.setItem(addressKey, JSON.stringify([activeAddress]));
      }

      // Create Order
      const cart = getCart();
      const orderItems = cart.map(item => {
        const prod = getProductById(item.id);
        return {
          id: item.id,
          name: prod.name,
          price: prod.price,
          originalPrice: prod.originalPrice,
          image: prod.image,
          brand: prod.brand,
          qty: item.qty
        };
      });

      const totalMRP = orderItems.reduce((sum, item) => sum + (item.originalPrice * item.qty), 0);
      const totalDiscount = orderItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.qty), 0);
      const subtotal = totalMRP - totalDiscount;
      const delivery = subtotal > 500 ? 0 : 40;
      const netTotal = subtotal + delivery;

      const orderId = "OD" + Math.floor(100000000 + Math.random() * 900000000);
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const orderDateStr = today.toLocaleDateString('en-US', options);

      const newOrder = {
        orderId: orderId,
        date: orderDateStr,
        items: orderItems,
        subtotal: subtotal,
        delivery: delivery,
        total: netTotal,
        status: "Ordered", // Timeline states: Ordered, Packed, Shipped, Delivered
        shippingAddress: activeAddress
      };

      // Append to orders
      const ordersKey = `pleach_orders_${user.email}`;
      const currentOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
      currentOrders.unshift(newOrder);
      localStorage.setItem(ordersKey, JSON.stringify(currentOrders));

      // Clear cart
      clearCart();

      // Redirect to success
      showToast("Order placed successfully!");
      setTimeout(() => {
        window.location.href = `order-success.html?orderId=${orderId}`;
      }, 1000);
    };
  }
}
