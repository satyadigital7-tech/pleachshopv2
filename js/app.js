/**
 * Pleach Shop - Universal Application Logic
 * Manages Cart, Wishlist, Authentication sessions, Search Autocomplete, and Newsletter elements
 */

document.addEventListener("DOMContentLoaded", () => {
  // Init shared systems
  initCartAndWishlistBadges();
  initSearchAutocomplete();
  initAuthenticationUI();
  initNewsletterForms();
  initMobileNav();
  initScrollArrows();
});

/* ==========================================================================
   State Helpers (LocalStorage Sync)
   ========================================================================== */

// Cart Operations
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("pleach_cart")) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("pleach_cart", JSON.stringify(cart));
  updateCartBadge();
  // Dispatch custom event to notify other scripts on same page
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }
  saveCart(cart);
  showToast("Added to Cart successfully!");
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  showToast("Removed from Cart");
}

function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// Wishlist Operations
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem("pleach_wishlist")) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem("pleach_wishlist", JSON.stringify(wishlist));
  updateWishlistBadge();
  window.dispatchEvent(new CustomEvent("wishlistUpdated", { detail: wishlist }));
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  let added = false;
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
    added = true;
  }
  saveWishlist(wishlist);
  
  if (added) {
    showToast("Added to Wishlist!");
  } else {
    showToast("Removed from Wishlist");
  }
  return added;
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

// Update Badges in Header
function updateCartBadge() {
  const count = getCartCount();
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  });
}

function updateWishlistBadge() {
  const count = getWishlist().length;
  const badges = document.querySelectorAll(".wishlist-badge");
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  });
}

function initCartAndWishlistBadges() {
  updateCartBadge();
  updateWishlistBadge();
}

/* ==========================================================================
   Search Autocomplete Suggestions
   ========================================================================== */
function initSearchAutocomplete() {
  const searchInput = document.querySelector(".search-input");
  const suggestionsBox = document.querySelector(".search-suggestions");
  const searchBtn = document.querySelector(".search-btn");

  if (!searchInput || !suggestionsBox) return;

  const trendingSearches = ["T-Shirts", "Caps", "Tote Bags", "Mugs", "Phone Cases", "Laptop Skins", "Puzzles", "Mandala"];

  // Show suggestions
  const showSuggestions = (query) => {
    suggestionsBox.innerHTML = "";
    
    if (!query) {
      // Show trending searches when empty
      let html = `<div class="p-3 text-muted border-bottom" style="font-size: 12px; font-weight: 600;">TRENDING SEARCHES</div>`;
      trendingSearches.forEach(term => {
        html += `
          <div class="suggestion-item" data-search="${term}">
            <i class="fas fa-chart-line suggestion-icon"></i>
            <span class="suggestion-trending">${term}</span>
          </div>
        `;
      });
      suggestionsBox.innerHTML = html;
      suggestionsBox.style.display = "block";
    } else {
      // Filter from PRODUCTS_DATA (if loaded)
      if (typeof PRODUCTS_DATA !== "undefined") {
        const results = PRODUCTS_DATA.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6);

        if (results.length > 0) {
          let html = "";
          results.forEach(product => {
            html += `
              <div class="suggestion-item" data-product-id="${product.id}">
                <i class="fas fa-search suggestion-icon"></i>
                <div>
                  <div style="font-weight: 500;">${product.name}</div>
                  <small class="text-muted">${product.category} in ${product.brand}</small>
                </div>
              </div>
            `;
          });
          suggestionsBox.innerHTML = html;
          suggestionsBox.style.display = "block";
        } else {
          suggestionsBox.innerHTML = `
            <div class="p-3 text-muted text-center" style="font-size: 14px;">
              No results found for "${query}"
            </div>
          `;
          suggestionsBox.style.display = "block";
        }
      }
    }
  };

  searchInput.addEventListener("focus", () => {
    showSuggestions(searchInput.value.trim());
  });

  searchInput.addEventListener("input", () => {
    showSuggestions(searchInput.value.trim());
  });

  // Handle outside clicks to close suggestions
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });

  // Handle clicking on suggestions
  suggestionsBox.addEventListener("click", (e) => {
    const item = e.target.closest(".suggestion-item");
    if (!item) return;

    if (item.dataset.search) {
      searchInput.value = item.dataset.search;
      suggestionsBox.style.display = "none";
      window.location.href = `products.html?search=${encodeURIComponent(item.dataset.search)}`;
    } else if (item.dataset.productId) {
      suggestionsBox.style.display = "none";
      window.location.href = `product-details.html?id=${item.dataset.productId}`;
    }
  });

  // Handle Enter keypress
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const val = searchInput.value.trim();
      if (val) {
        window.location.href = `products.html?search=${encodeURIComponent(val)}`;
      }
    }
  });

  // Handle Search button click
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const val = searchInput.value.trim();
      if (val) {
        window.location.href = `products.html?search=${encodeURIComponent(val)}`;
      }
    });
  }
}

/* ==========================================================================
   User Session / Auth UI
   ========================================================================== */
function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem("pleach_user")) || null;
  } catch (e) {
    return null;
  }
}

function initAuthenticationUI() {
  const authContainer = document.getElementById("header-auth-container");
  if (!authContainer) return;

  const user = getLoggedInUser();

  if (user) {
    // User is logged in: Show Dropdown Menu
    authContainer.innerHTML = `
      <div class="user-dropdown">
        <a href="account.html" class="header-action-link">
          <i class="fas fa-user-circle me-1" style="font-size: 18px;"></i>
          <span>${user.name.split(" ")[0]}</span>
          <i class="fas fa-chevron-down ms-1" style="font-size: 10px;"></i>
        </a>
        <div class="user-dropdown-menu">
          <a href="account.html"><i class="fas fa-user"></i> My Profile</a>
          <a href="account.html?tab=orders"><i class="fas fa-shopping-bag"></i> Orders</a>
          <a href="wishlist.html"><i class="fas fa-heart"></i> Wishlist</a>
          <a href="account.html?tab=addresses"><i class="fas fa-map-marker-alt"></i> Addresses</a>
          <hr class="dropdown-divider my-1">
          <a href="#" id="header-logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
      </div>
    `;

    document.getElementById("header-logout-btn").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("pleach_user");
      showToast("Logged out successfully");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  } else {
    // User is not logged in: Show Login Button
    authContainer.innerHTML = `
      <a href="login.html" class="btn-login-header">Login</a>
    `;
  }
}

/* ==========================================================================
   Newsletter Subscription Form
   ========================================================================== */
function initNewsletterForms() {
  const newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value.trim()) {
        showToast(`Thank you for subscribing, ${input.value.trim()}!`);
        input.value = "";
      }
    });
  });
}

/* ==========================================================================
   Mobile Nav Bar helper
   ========================================================================== */
function initMobileNav() {
  // Mobile search focus placeholder toggle, etc.
}

/* ==========================================================================
   Toast Notification Utility
   ========================================================================== */
function showToast(message, type = "success") {
  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast-popup toast-${type}`;
  toast.innerHTML = `
    <div class="toast-body-content">
      <i class="fas ${type === "success" ? "fa-check-circle text-success" : "fa-exclamation-circle text-danger"} me-2"></i>
      <span>${message}</span>
    </div>
  `;

  // Dynamic toast styles
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%) translateY(100px)",
    backgroundColor: "#212121",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "4px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: "9999",
    display: "flex",
    alignItems: "center",
    transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    fontSize: "14px",
    fontWeight: "500"
  });

  document.body.appendChild(toast);

  // Trigger animation reflow
  toast.offsetHeight;

  // Slide up
  toast.style.transform = "translateX(-50%) translateY(0)";

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = "translateX(-50%) translateY(100px)";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}

/* ==========================================================================
   Horizontal Scroll Slider Arrow Controls
   ========================================================================== */
function initScrollArrows() {
  document.querySelectorAll(".scroll-section-wrapper").forEach(wrapper => {
    const row = wrapper.querySelector(".horizontal-scroll-row");
    const leftArrow = wrapper.querySelector(".scroll-arrow-left");
    const rightArrow = wrapper.querySelector(".scroll-arrow-right");

    if (!row || !leftArrow || !rightArrow) return;

    const updateArrows = () => {
      const maxScroll = row.scrollWidth - row.clientWidth;
      
      if (row.scrollLeft <= 5) {
        leftArrow.classList.add("disabled");
      } else {
        leftArrow.classList.remove("disabled");
      }

      if (row.scrollLeft >= maxScroll - 5) {
        rightArrow.classList.add("disabled");
      } else {
        rightArrow.classList.remove("disabled");
      }
    };

    // Attach scroll listener
    row.removeEventListener("scroll", updateArrows);
    row.addEventListener("scroll", updateArrows);

    // Left arrow click
    leftArrow.onclick = (e) => {
      e.preventDefault();
      row.scrollBy({ left: -row.clientWidth * 0.75, behavior: "smooth" });
    };

    // Right arrow click
    rightArrow.onclick = (e) => {
      e.preventDefault();
      row.scrollBy({ left: row.clientWidth * 0.75, behavior: "smooth" });
    };

    // Initial call
    setTimeout(updateArrows, 200);
  });
}

// Global hook to recalculate arrow visibility after dynamic rendering
window.updateAllScrollArrows = () => {
  initScrollArrows();
};
