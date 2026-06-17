/**
 * Pleach Shop - Product Details Interactive Page Logic
 */

let activeProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof PRODUCTS_DATA === "undefined") return;

  initProductDetails();
});

function initProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    showError("No product selected. <a href='products.html' class='alert-link'>Go back to catalog</a>.");
    return;
  }

  activeProduct = PRODUCTS_DATA.find(p => p.id === productId);

  if (!activeProduct) {
    showError("Product not found. <a href='products.html' class='alert-link'>Go back to catalog</a>.");
    return;
  }

  // Save to Recently Viewed
  saveRecentlyViewed(productId);

  // Switch loading state
  document.getElementById("details-loading-pane").classList.add("d-none");
  document.getElementById("details-main-pane").classList.remove("d-none");

  // Load UI components
  renderBreadcrumbs();
  renderImages();
  renderProductInfo();
  renderSpecifications();
  renderFaqs();
  renderReviews();
  renderRelatedProducts();

  // Setup Event Bindings
  setupInteractionEvents();
  setupZoomFeature();
  setupTabEvents();
}

function showError(message) {
  const loadingPane = document.getElementById("details-loading-pane");
  if (loadingPane) {
    loadingPane.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning text-center shadow-sm py-4" role="alert">
          <i class="fas fa-exclamation-triangle fs-3 mb-2 text-warning d-block"></i>
          <div>${message}</div>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   LocalStorage Tracking (Recently Viewed)
   ========================================================================== */
function saveRecentlyViewed(id) {
  let viewed = JSON.parse(localStorage.getItem("pleach_recently_viewed")) || [];
  // Remove if exists
  viewed = viewed.filter(vId => vId !== id);
  // Add to front
  viewed.unshift(id);
  // Keep last 8
  if (viewed.length > 8) viewed.pop();
  localStorage.setItem("pleach_recently_viewed", JSON.stringify(viewed));
}

/* ==========================================================================
   UI Render Utilities
   ========================================================================== */

function renderBreadcrumbs() {
  const breadcrumbCat = document.getElementById("breadcrumb-category");
  const breadcrumbProd = document.getElementById("breadcrumb-product-name");

  if (breadcrumbCat) {
    breadcrumbCat.innerHTML = `<a href="products.html?category=${activeProduct.category}">${activeProduct.category}</a>`;
  }
  if (breadcrumbProd) {
    breadcrumbProd.textContent = activeProduct.name;
  }
}

function renderImages() {
  const mainImg = document.getElementById("details-main-img");
  const thumbnailsContainer = document.getElementById("details-thumbnails");

  if (!mainImg) return;

  mainImg.src = activeProduct.image;
  mainImg.alt = activeProduct.name;

  // Render thumbnails (main image + any additional ones)
  const images = activeProduct.additionalImages || [activeProduct.image];
  
  if (images.length > 1) {
    thumbnailsContainer.innerHTML = images.map((img, i) => `
      <div class="thumbnail-box ${i === 0 ? 'active' : ''}" data-src="${img}">
        <img src="${img}" alt="thumbnail">
      </div>
    `).join("");

    // Thumbnail click mapping
    document.querySelectorAll(".thumbnail-box").forEach(box => {
      box.addEventListener("click", function() {
        document.querySelectorAll(".thumbnail-box").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        mainImg.src = this.dataset.src;
      });
    });
  } else {
    thumbnailsContainer.innerHTML = "";
  }
}

function renderProductInfo() {
  document.getElementById("details-brand").textContent = activeProduct.brand;
  document.getElementById("details-title").textContent = activeProduct.name;
  document.getElementById("details-rating").innerHTML = `${activeProduct.rating} <i class="fas fa-star"></i>`;
  document.getElementById("details-reviews-count").textContent = `${activeProduct.reviewsCount.toLocaleString()} Ratings & ${Math.floor(activeProduct.reviewsCount * 0.15).toLocaleString()} Reviews`;
  
  document.getElementById("details-price").textContent = `₹${activeProduct.price.toLocaleString()}`;
  document.getElementById("details-original-price").textContent = `₹${activeProduct.originalPrice.toLocaleString()}`;
  document.getElementById("details-discount").textContent = `${activeProduct.discount}% off`;
  
  document.getElementById("details-description-text").textContent = activeProduct.description;

  // Initialize wishlist toggle state
  const wishlistToggleBtn = document.getElementById("details-wishlist-toggle");
  if (wishlistToggleBtn) {
    wishlistToggleBtn.classList.toggle("active", isInWishlist(activeProduct.id));
  }
}

function renderSpecifications() {
  const table = document.getElementById("details-specs-table");
  if (!table) return;

  const specs = activeProduct.specifications || {};
  let html = "";
  
  Object.keys(specs).forEach(key => {
    html += `
      <tr>
        <td class="spec-label">${key}</td>
        <td class="spec-value">${specs[key]}</td>
      </tr>
    `;
  });

  table.innerHTML = html || "<tr><td colspan='2' class='text-muted py-3 text-center'>No specifications available.</td></tr>";
}

function renderFaqs() {
  const accordion = document.getElementById("details-faq-accordion");
  if (!accordion) return;

  const faqs = activeProduct.faqs || [];
  
  if (faqs.length === 0) {
    accordion.innerHTML = "<div class='text-muted py-3 text-center'>No FAQs available.</div>";
    return;
  }

  accordion.innerHTML = faqs.map((faq, i) => `
    <div class="accordion-item" style="border-bottom: 1px solid var(--border-color) !important;">
      <h2 class="accordion-header" id="faq-heading-${i}">
        <button class="accordion-button collapsed fw-bold px-0 py-3 bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-${i}" aria-expanded="false" aria-controls="faq-collapse-${i}" style="box-shadow: none; font-size: 14px;">
          Q: ${faq.q}
        </button>
      </h2>
      <div id="faq-collapse-${i}" class="accordion-collapse collapse" aria-labelledby="faq-heading-${i}" data-bs-parent="#details-faq-accordion">
        <div class="accordion-body px-0 pb-3 pt-1 text-muted" style="font-size: 14px; line-height: 1.5;">
          ${faq.a}
        </div>
      </div>
    </div>
  `).join("");
}

function renderReviews() {
  const reviewsList = document.getElementById("details-reviews-list");
  if (!reviewsList) return;

  // Set review rating main score
  document.getElementById("details-review-score").textContent = activeProduct.rating;

  // Create default mock reviews
  const defaultReviews = [
    { title: "Great value for money", comment: "The build quality is excellent for the price. Highly recommended!", rating: 5, user: "Karan Johar", date: "June 2026", verified: true },
    { title: "Slightly delayed delivery", comment: "The product itself is amazing and works exactly as described. However, delivery took 5 days.", rating: 4, user: "Rohan M.", date: "May 2026", verified: true }
  ];

  // Retrieve user added reviews
  let userReviews = [];
  try {
    userReviews = JSON.parse(localStorage.getItem(`pleach_reviews_${activeProduct.id}`)) || [];
  } catch (e) {
    userReviews = [];
  }

  const allReviews = [...userReviews, ...defaultReviews];

  reviewsList.innerHTML = allReviews.map((rev, i) => `
    <div class="review-item-block">
      <div class="review-header">
        <span class="rating-badge">${rev.rating} <i class="fas fa-star"></i></span>
        <span class="review-title">${rev.title}</span>
      </div>
      <div class="review-body">${rev.comment}</div>
      <div class="review-user-info">
        <span>By ${rev.user}</span>
        <span>${rev.date}</span>
        ${rev.verified ? '<span><i class="fas fa-check-circle text-success me-1"></i>Certified Buyer</span>' : ''}
      </div>
    </div>
  `).join("");
}

function renderRelatedProducts() {
  const row = document.getElementById("related-products-row");
  const section = document.getElementById("related-products-section");

  if (!row || !section) return;

  // Filter products in same category (excl current)
  const related = PRODUCTS_DATA
    .filter(p => p.category === activeProduct.category && p.id !== activeProduct.id)
    .slice(0, 6);

  if (related.length === 0) {
    section.style.display = "none";
    return;
  }

  row.innerHTML = related.map(p => {
    const isWish = isInWishlist(p.id) ? "active" : "";
    return `
      <div class="product-card">
        <button class="wishlist-toggle ${isWish}" data-id="${p.id}">
          <i class="fas fa-heart"></i>
        </button>
        <a href="product-details.html?id=${p.id}" class="product-image-wrapper">
          <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
        </a>
        <div class="product-details">
          <a href="product-details.html?id=${p.id}" class="product-name-title" title="${p.name}">
            ${p.name}
          </a>
          <div class="d-flex align-items-center mt-1">
            <span class="rating-badge">${p.rating} <i class="fas fa-star"></i></span>
            <span class="reviews-count-text">(${p.reviewsCount.toLocaleString()})</span>
          </div>
          <div class="price-container">
            <span class="current-price">₹${p.price.toLocaleString()}</span>
            <span class="original-price">₹${p.originalPrice.toLocaleString()}</span>
            <span class="discount-tag">${p.discount}% off</span>
          </div>
          <div class="delivery-tag">Free Delivery</div>
        </div>
      </div>
    `;
  }).join("");

  // Bind clicks
  document.querySelectorAll("#related-products-row .wishlist-toggle").forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      const id = this.dataset.id;
      const active = toggleWishlist(id);
      this.classList.toggle("active", active);
    };
  });

  // Recalculate related products scroll arrows
  if (window.updateAllScrollArrows) window.updateAllScrollArrows();
}

/* ==========================================================================
   Image Zoom Lens & Result Window
   ========================================================================== */
function setupZoomFeature() {
  const container = document.getElementById("main-preview-box");
  const img = document.getElementById("details-main-img");
  const lens = document.getElementById("details-zoom-lens");
  const result = document.getElementById("details-zoom-window");

  if (!container || !img || !lens || !result) return;

  // Mouse move inside preview box
  container.addEventListener("mousemove", (e) => {
    // Show lens & zoom result
    lens.style.display = "block";
    result.style.display = "block";

    // Set background image of zoom window
    result.style.backgroundImage = `url('${img.src}')`;
    
    // Get mouse position relative to container
    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left - (lens.offsetWidth / 2);
    let y = e.clientY - rect.top - (lens.offsetHeight / 2);

    // Limit boundaries of the lens inside container
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > container.offsetWidth - lens.offsetWidth) {
      x = container.offsetWidth - lens.offsetWidth;
    }
    if (y > container.offsetHeight - lens.offsetHeight) {
      y = container.offsetHeight - lens.offsetHeight;
    }

    // Place lens
    lens.style.left = x + "px";
    lens.style.top = y + "px";

    // Calculate ratio size
    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundSize = (img.offsetWidth * cx) + "px " + (img.offsetHeight * cy) + "px";
    result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
  });

  // Mouse leave preview box
  container.addEventListener("mouseleave", () => {
    lens.style.display = "none";
    result.style.display = "none";
  });
}

/* ==========================================================================
   Actions & Button Triggers
   ========================================================================== */
function setupInteractionEvents() {
  // Wishlist toggle
  const wishlistBtn = document.getElementById("details-wishlist-toggle");
  if (wishlistBtn) {
    wishlistBtn.onclick = function(e) {
      e.preventDefault();
      const active = toggleWishlist(activeProduct.id);
      this.classList.toggle("active", active);
    };
  }

  // Add to Cart
  const addCartBtn = document.getElementById("details-add-to-cart-btn");
  if (addCartBtn) {
    addCartBtn.onclick = () => {
      addToCart(activeProduct.id, 1);
    };
  }

  // Buy Now
  const buyNowBtn = document.getElementById("details-buy-now-btn");
  if (buyNowBtn) {
    buyNowBtn.onclick = () => {
      // Add to cart and redirect immediately to cart.html
      addToCart(activeProduct.id, 1);
      setTimeout(() => {
        window.location.href = "cart.html";
      }, 300);
    };
  }

  // Delivery Checker
  const checkBtn = document.getElementById("pincode-check-btn");
  const pincodeField = document.getElementById("pincode-field");
  const feedbackMsg = document.getElementById("pincode-feedback-msg");

  if (checkBtn && pincodeField && feedbackMsg) {
    checkBtn.onclick = () => {
      const pin = pincodeField.value.trim();
      
      if (!/^\d{6}$/.test(pin)) {
        feedbackMsg.textContent = "Please enter a valid 6-digit Pincode.";
        feedbackMsg.style.color = "red";
        return;
      }

      // Check first digit of pincode: if 0 or 9, mock delivery failure, otherwise return success
      const firstDigit = pin[0];
      if (firstDigit === "0" || firstDigit === "9") {
        feedbackMsg.innerHTML = `<i class="fas fa-times-circle me-1"></i> Delivery not available for "${pin}".`;
        feedbackMsg.style.color = "red";
      } else {
        // Calculate date: today + deliveryDays
        const days = activeProduct.deliveryDays || 3;
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + days);
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        const dateStr = targetDate.toLocaleDateString('en-US', options);

        feedbackMsg.innerHTML = `
          <i class="fas fa-check-circle me-1"></i> Delivery available. 
          <span class="text-success fw-bold">Delivery by ${dateStr}</span>
        `;
        feedbackMsg.style.color = "green";
      }
    };

    pincodeField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") checkBtn.click();
    });
  }

  // Add Review Form Submission
  const reviewForm = document.getElementById("add-review-form");
  if (reviewForm) {
    reviewForm.onsubmit = function(e) {
      e.preventDefault();
      
      const rating = parseInt(document.getElementById("new-review-rating").value);
      const title = document.getElementById("new-review-title").value.trim();
      const comment = document.getElementById("new-review-comment").value.trim();
      const user = getLoggedInUser() ? getLoggedInUser().name : "Guest Reviewer";

      const newReview = {
        title,
        comment,
        rating,
        user,
        date: "Today",
        verified: getLoggedInUser() ? true : false
      };

      // Retrieve old, save new
      const reviewsKey = `pleach_reviews_${activeProduct.id}`;
      const reviewsList = JSON.parse(localStorage.getItem(reviewsKey)) || [];
      reviewsList.unshift(newReview);
      localStorage.setItem(reviewsKey, JSON.stringify(reviewsList));

      // Clear form inputs
      document.getElementById("new-review-title").value = "";
      document.getElementById("new-review-comment").value = "";

      showToast("Thank you for your feedback! Review added.");
      renderReviews();
    };
  }
}

/* ==========================================================================
   Tab Page Transitions
   ========================================================================== */
function setupTabEvents() {
  const tabs = document.querySelectorAll(".detail-tab-btn");
  
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      // Remove active from tabs and contents
      document.querySelectorAll(".detail-tab-btn").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".detail-tab-pane").forEach(p => p.classList.remove("active"));

      // Set active
      this.classList.add("active");
      const target = this.dataset.target;
      const targetPane = document.querySelector(target);
      if (targetPane) targetPane.classList.add("active");
    });
  });
}
