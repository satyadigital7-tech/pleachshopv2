/**
 * Pleach Shop - Product Catalog Filtering, Sorting and Rendering
 */

let filterState = {
  categories: [],
  brands: [],
  priceRanges: [],
  customMin: null,
  customMax: null,
  minRating: null,
  excludeOutOfStock: true,
  sortBy: "relevance",
  searchQuery: "",
  dealsOnly: false,
  bestsellersOnly: false
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof PRODUCTS_DATA === "undefined") return;

  parseUrlParams();
  populateFilterSidebar();
  setupEventListeners();
  applyFiltersAndRender();
});

/* ==========================================================================
   Parse Parameters from URL
   ========================================================================== */
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  
  const categoryParam = params.get("category");
  if (categoryParam) {
    filterState.categories.push(categoryParam);
  }

  const searchParam = params.get("search");
  if (searchParam) {
    filterState.searchQuery = searchParam;
    // Fill the header search input
    const searchInput = document.querySelector(".search-input");
    if (searchInput) searchInput.value = searchParam;
  }

  const filterParam = params.get("filter");
  if (filterParam === "deals") {
    filterState.dealsOnly = true;
  } else if (filterParam === "bestsellers") {
    filterState.bestsellersOnly = true;
  }
}

/* ==========================================================================
   Populate Sidebar Checkboxes Dynamically
   ========================================================================== */
function populateFilterSidebar() {
  const categoryContainer = document.getElementById("category-filter-list");
  const brandContainer = document.getElementById("brand-filter-list");

  if (!categoryContainer || !brandContainer) return;

  // Extract unique categories & brands and counts
  const categoriesMap = {};
  const brandsMap = {};

  PRODUCTS_DATA.forEach(p => {
    categoriesMap[p.category] = (categoriesMap[p.category] || 0) + 1;
    brandsMap[p.brand] = (brandsMap[p.brand] || 0) + 1;
  });

  // Render Categories Checkboxes
  let categoryHtml = "";
  Object.keys(categoriesMap).forEach(cat => {
    const isChecked = filterState.categories.includes(cat) ? "checked" : "";
    categoryHtml += `
      <label class="filter-checkbox-item">
        <input type="checkbox" class="category-filter-chk" value="${cat}" ${isChecked}>
        <span class="ms-2">${cat} <span class="text-muted" style="font-size: 11px;">(${categoriesMap[cat]})</span></span>
      </label>
    `;
  });
  categoryContainer.innerHTML = categoryHtml;

  // Render Brands Checkboxes
  let brandHtml = "";
  Object.keys(brandsMap).forEach(brand => {
    brandHtml += `
      <label class="filter-checkbox-item">
        <input type="checkbox" class="brand-filter-chk" value="${brand}">
        <span class="ms-2">${brand} <span class="text-muted" style="font-size: 11px;">(${brandsMap[brand]})</span></span>
      </label>
    `;
  });
  brandContainer.innerHTML = brandHtml;
}

/* ==========================================================================
   Setup Event Handlers
   ========================================================================== */
function setupEventListeners() {
  // Category checks
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("category-filter-chk")) {
      const val = e.target.value;
      if (e.target.checked) {
        if (!filterState.categories.includes(val)) filterState.categories.push(val);
      } else {
        filterState.categories = filterState.categories.filter(c => c !== val);
      }
      applyFiltersAndRender();
    }

    if (e.target.classList.contains("brand-filter-chk")) {
      const val = e.target.value;
      if (e.target.checked) {
        if (!filterState.brands.includes(val)) filterState.brands.push(val);
      } else {
        filterState.brands = filterState.brands.filter(b => b !== val);
      }
      applyFiltersAndRender();
    }
  });

  // Price range checks
  const priceChkGroup = document.querySelectorAll("input[name='priceRange']");
  priceChkGroup.forEach(chk => {
    chk.addEventListener("change", () => {
      filterState.priceRanges = Array.from(priceChkGroup)
        .filter(c => c.checked)
        .map(c => c.value);
      applyFiltersAndRender();
    });
  });

  // Rating checks
  const ratingChkGroup = document.querySelectorAll("input[name='ratingFilter']");
  ratingChkGroup.forEach(chk => {
    chk.addEventListener("change", () => {
      const checkedRatings = Array.from(ratingChkGroup)
        .filter(c => c.checked)
        .map(c => parseInt(c.value));
      filterState.minRating = checkedRatings.length > 0 ? Math.min(...checkedRatings) : null;
      applyFiltersAndRender();
    });
  });

  // Custom Price inputs
  const applyPriceBtn = document.getElementById("apply-price-btn");
  if (applyPriceBtn) {
    applyPriceBtn.addEventListener("click", () => {
      const minVal = parseFloat(document.getElementById("min-price-input").value);
      const maxVal = parseFloat(document.getElementById("max-price-input").value);
      filterState.customMin = isNaN(minVal) ? null : minVal;
      filterState.customMax = isNaN(maxVal) ? null : maxVal;
      applyFiltersAndRender();
    });
  }

  // Out of stock switch
  const stockSwitch = document.getElementById("exclude-out-of-stock");
  if (stockSwitch) {
    stockSwitch.addEventListener("change", () => {
      filterState.excludeOutOfStock = stockSwitch.checked;
      applyFiltersAndRender();
    });
  }

  // Clear filters button
  const clearBtn = document.getElementById("clear-filters-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      filterState.categories = [];
      filterState.brands = [];
      filterState.priceRanges = [];
      filterState.customMin = null;
      filterState.customMax = null;
      filterState.minRating = null;
      filterState.excludeOutOfStock = true;
      filterState.dealsOnly = false;
      filterState.bestsellersOnly = false;

      // Reset DOM checks
      document.querySelectorAll(".category-filter-chk, .brand-filter-chk, input[name='priceRange'], input[name='ratingFilter']")
        .forEach(chk => chk.checked = false);
      if (stockSwitch) stockSwitch.checked = true;
      document.getElementById("min-price-input").value = "";
      document.getElementById("max-price-input").value = "";

      applyFiltersAndRender();
    });
  }

  // Sorting
  const sortOptions = document.querySelectorAll(".sort-option");
  sortOptions.forEach(opt => {
    opt.addEventListener("click", (e) => {
      e.preventDefault();
      sortOptions.forEach(s => s.classList.remove("active"));
      opt.classList.add("active");
      filterState.sortBy = opt.dataset.sort;
      applyFiltersAndRender();
    });
  });
}

/* ==========================================================================
   Filter & Sort Implementation
   ========================================================================== */
function applyFiltersAndRender() {
  let filtered = [...PRODUCTS_DATA];

  // 1. Search Query
  if (filterState.searchQuery) {
    const q = filterState.searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // 2. Deals / Bestsellers only
  if (filterState.dealsOnly) {
    filtered = filtered.filter(p => p.isDeal);
  }
  if (filterState.bestsellersOnly) {
    filtered = filtered.filter(p => p.isBestSeller);
  }

  // 3. Category Filter
  if (filterState.categories.length > 0) {
    filtered = filtered.filter(p => filterState.categories.includes(p.category));
  }

  // 4. Brand Filter
  if (filterState.brands.length > 0) {
    filtered = filtered.filter(p => filterState.brands.includes(p.brand));
  }

  // 5. Price Filter (Ranges + Custom)
  if (filterState.priceRanges.length > 0 || filterState.customMin !== null || filterState.customMax !== null) {
    filtered = filtered.filter(p => {
      // Check custom prices first
      if (filterState.customMin !== null && p.price < filterState.customMin) return false;
      if (filterState.customMax !== null && p.price > filterState.customMax) return false;

      // If ranges are checked, check fits
      if (filterState.priceRanges.length > 0) {
        let fitsRange = false;
        filterState.priceRanges.forEach(range => {
          if (range === "under-500" && p.price < 500) fitsRange = true;
          if (range === "500-1000" && p.price >= 500 && p.price <= 1000) fitsRange = true;
          if (range === "1000-5000" && p.price >= 1000 && p.price <= 5000) fitsRange = true;
          if (range === "5000-15000" && p.price >= 5000 && p.price <= 15000) fitsRange = true;
          if (range === "above-15000" && p.price > 15000) fitsRange = true;
        });
        return fitsRange;
      }
      return true;
    });
  }

  // 6. Rating Filter
  if (filterState.minRating !== null) {
    filtered = filtered.filter(p => p.rating >= filterState.minRating);
  }

  // 7. Stock Availability
  if (filterState.excludeOutOfStock) {
    filtered = filtered.filter(p => p.availability);
  }

  // 8. Sorting
  if (filterState.sortBy === "popularity") {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  } else if (filterState.sortBy === "newest") {
    filtered.sort((a, b) => b.id.localeCompare(a.id));
  } else if (filterState.sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filterState.sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } // 'relevance' maintains initial array ordering

  renderProducts(filtered);
  renderFilterChips();
  updateHeadings(filtered.length);
}

/* ==========================================================================
   Render Products Grid
   ========================================================================== */
function renderProducts(products) {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fas fa-search-minus text-muted mb-3" style="font-size: 48px;"></i>
        <h3 class="fw-bold">No Products Found</h3>
        <p class="text-muted">Try removing some active filters or modifying your search query.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(p => {
    const isWish = isInWishlist(p.id) ? "active" : "";
    return `
      <div class="col-6 col-md-4 col-lg-4">
        <div class="product-card w-100">
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
      </div>
    `;
  }).join("");

  // Re-bind wishlist click listeners
  bindProductCardEvents();
}

function bindProductCardEvents() {
  document.querySelectorAll(".wishlist-toggle").forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      const id = this.dataset.id;
      const active = toggleWishlist(id);
      this.classList.toggle("active", active);
    };
  });
}

/* ==========================================================================
   Render Chips representing Active Filters
   ========================================================================== */
function renderFilterChips() {
  const chipsContainer = document.getElementById("active-filter-chips");
  if (!chipsContainer) return;

  let html = "";

  // Categories
  filterState.categories.forEach(cat => {
    html += `
      <div class="active-filter-pill">
        <span>Category: ${cat}</span>
        <i class="fas fa-times remove-chip-btn" data-type="category" data-val="${cat}"></i>
      </div>
    `;
  });

  // Brands
  filterState.brands.forEach(brand => {
    html += `
      <div class="active-filter-pill">
        <span>Brand: ${brand}</span>
        <i class="fas fa-times remove-chip-btn" data-type="brand" data-val="${brand}"></i>
      </div>
    `;
  });

  // Price ranges
  filterState.priceRanges.forEach(range => {
    let text = range;
    if (range === "under-500") text = "Under ₹500";
    if (range === "500-1000") text = "₹500 - ₹1,000";
    if (range === "1000-5000") text = "₹1,000 - ₹5,000";
    if (range === "5000-15000") text = "₹5,000 - ₹15,000";
    if (range === "above-15000") text = "Over ₹15,000";
    
    html += `
      <div class="active-filter-pill">
        <span>Price: ${text}</span>
        <i class="fas fa-times remove-chip-btn" data-type="priceRange" data-val="${range}"></i>
      </div>
    `;
  });

  // Custom Prices
  if (filterState.customMin !== null || filterState.customMax !== null) {
    const minText = filterState.customMin !== null ? `₹${filterState.customMin}` : "Min";
    const maxText = filterState.customMax !== null ? `₹${filterState.customMax}` : "Max";
    html += `
      <div class="active-filter-pill">
        <span>Price: ${minText} - ${maxText}</span>
        <i class="fas fa-times remove-chip-btn" data-type="customPrice" data-val="custom"></i>
      </div>
    `;
  }

  // Rating
  if (filterState.minRating !== null) {
    html += `
      <div class="active-filter-pill">
        <span>Rating: ${filterState.minRating}★ & above</span>
        <i class="fas fa-times remove-chip-btn" data-type="rating" data-val="${filterState.minRating}"></i>
      </div>
    `;
  }

  // Search keyword
  if (filterState.searchQuery) {
    html += `
      <div class="active-filter-pill">
        <span>Search: "${filterState.searchQuery}"</span>
        <i class="fas fa-times remove-chip-btn" data-type="search" data-val="${filterState.searchQuery}"></i>
      </div>
    `;
  }

  chipsContainer.innerHTML = html;

  // Bind clicks to clear chip
  document.querySelectorAll(".remove-chip-btn").forEach(btn => {
    btn.onclick = function() {
      const type = this.dataset.type;
      const val = this.dataset.val;

      if (type === "category") {
        filterState.categories = filterState.categories.filter(c => c !== val);
        const input = document.querySelector(`.category-filter-chk[value="${val}"]`);
        if (input) input.checked = false;
      } else if (type === "brand") {
        filterState.brands = filterState.brands.filter(b => b !== val);
        const input = document.querySelector(`.brand-filter-chk[value="${val}"]`);
        if (input) input.checked = false;
      } else if (type === "priceRange") {
        filterState.priceRanges = filterState.priceRanges.filter(p => p !== val);
        const input = document.querySelector(`input[name='priceRange'][value="${val}"]`);
        if (input) input.checked = false;
      } else if (type === "customPrice") {
        filterState.customMin = null;
        filterState.customMax = null;
        document.getElementById("min-price-input").value = "";
        document.getElementById("max-price-input").value = "";
      } else if (type === "rating") {
        filterState.minRating = null;
        document.querySelectorAll("input[name='ratingFilter']").forEach(c => c.checked = false);
      } else if (type === "search") {
        filterState.searchQuery = "";
        const searchInput = document.querySelector(".search-input");
        if (searchInput) searchInput.value = "";
      }

      applyFiltersAndRender();
    };
  });
}

/* ==========================================================================
   Update Results Header Text
   ========================================================================== */
function updateHeadings(count) {
  const heading = document.getElementById("results-heading");
  const breadcrumbActive = document.getElementById("breadcrumb-active");

  if (!heading) return;

  let queryName = "All Products";
  if (filterState.categories.length === 1) {
    queryName = filterState.categories[0];
  } else if (filterState.searchQuery) {
    queryName = `Search results for "${filterState.searchQuery}"`;
  } else if (filterState.dealsOnly) {
    queryName = "Deals of the Day";
  } else if (filterState.bestsellersOnly) {
    queryName = "Best Sellers";
  }

  heading.textContent = `${queryName} (Showing ${count} products)`;
  if (breadcrumbActive) breadcrumbActive.textContent = queryName;
}
