/**
 * Pleach Shop - Wishlist Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();

  // Re-bind when wishlist updates from other actions
  window.addEventListener("wishlistUpdated", () => {
    renderWishlist();
  });
});

function renderWishlist() {
  const emptyView = document.getElementById("empty-wishlist-view");
  const activeView = document.getElementById("active-wishlist-view");

  if (!emptyView || !activeView) return;

  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    activeView.classList.add("d-none");
    emptyView.classList.remove("d-none");
    return;
  }

  emptyView.classList.add("d-none");
  activeView.classList.remove("d-none");

  // Render Left sidebar user details
  const user = getLoggedInUser();
  const avatarEl = document.getElementById("wishlist-avatar");
  const nameEl = document.getElementById("wishlist-username");

  if (user) {
    if (avatarEl) avatarEl.textContent = user.name[0].toUpperCase();
    if (nameEl) nameEl.textContent = user.name;
  } else {
    if (avatarEl) avatarEl.textContent = "G";
    if (nameEl) nameEl.textContent = "Guest User";
  }

  const container = document.getElementById("wishlist-items-container");
  if (!container) return;

  let html = "";
  wishlist.forEach(id => {
    const prod = typeof PRODUCTS_DATA !== "undefined" ? getProductById(id) : null;
    if (!prod) return;

    html += `
      <div class="wishlist-item-row" data-id="${prod.id}">
        <!-- Remove icon -->
        <button class="btn-remove-wishlist" data-id="${prod.id}" title="Remove from wishlist">
          <i class="fas fa-trash-alt"></i>
        </button>
        
        <div class="row w-100 g-3 align-items-center">
          
          <!-- Image -->
          <div class="col-3 col-md-2 d-flex justify-content-center">
            <a href="product-details.html?id=${prod.id}">
              <img src="${prod.image}" alt="${prod.name}" class="img-fluid" style="max-height: 80px; object-fit: contain;">
            </a>
          </div>

          <!-- Product Details -->
          <div class="col-9 col-md-6">
            <a href="product-details.html?id=${prod.id}" class="fw-bold text-dark d-block mb-1 text-truncate">${prod.name}</a>
            <div class="d-flex align-items-center mb-2">
              <span class="rating-badge me-2">${prod.rating} <i class="fas fa-star"></i></span>
              <span class="reviews-count-text">(${prod.reviewsCount.toLocaleString()})</span>
            </div>
            <div class="d-flex align-items-baseline gap-2">
              <span class="fw-bold text-dark">₹${prod.price.toLocaleString()}</span>
              <span class="text-secondary text-decoration-line-through style-sm" style="font-size: 12px;">₹${prod.originalPrice.toLocaleString()}</span>
              <span class="text-success fw-semibold style-sm" style="font-size: 12px;">${prod.discount}% Off</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="col-12 col-md-4 d-flex justify-content-md-end mt-3 mt-md-0">
            <button class="btn btn-warning text-white fw-bold px-4 py-2 btn-move-to-cart" data-id="${prod.id}" style="background-color: var(--flipkart-yellow); border-color: var(--flipkart-yellow); font-size: 13px; border-radius: 2px;">
              <i class="fas fa-shopping-cart me-2"></i> MOVE TO CART
            </button>
          </div>

        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  document.getElementById("wishlist-count-header").textContent = `${wishlist.length} Item${wishlist.length > 1 ? 's' : ''}`;

  setupWishlistEvents();
}

function setupWishlistEvents() {
  // Remove Trash Icon
  document.querySelectorAll(".btn-remove-wishlist").forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      const id = this.dataset.id;
      toggleWishlist(id);
      renderWishlist();
    };
  });

  // Move To Cart Button
  document.querySelectorAll(".btn-move-to-cart").forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      const id = this.dataset.id;

      // Add to cart
      addToCart(id, 1);
      // Remove from wishlist
      toggleWishlist(id);

      renderWishlist();
    };
  });
}
