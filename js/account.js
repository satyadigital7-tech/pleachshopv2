/**
 * Pleach Shop - User Account Panel Logic
 */

let activeUser = null;

document.addEventListener("DOMContentLoaded", () => {
  activeUser = getLoggedInUser();

  if (!activeUser) {
    showToast("Please login to access your account", "error");
    setTimeout(() => {
      window.location.href = "login.html?returnUrl=account.html";
    }, 1200);
    return;
  }

  initAccountPanel();
});

function initAccountPanel() {
  // Update sidebar user greeting
  const avatarEl = document.getElementById("acc-avatar");
  const usernameEl = document.getElementById("acc-username");
  
  if (avatarEl) avatarEl.textContent = activeUser.name[0].toUpperCase();
  if (usernameEl) usernameEl.textContent = activeUser.name;

  // Handle URL tabs parameters
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get("tab") || "profile";
  switchTab(activeTab);

  // Tab button binders
  const menuButtons = document.querySelectorAll(".account-menu-item[data-tab]");
  menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Logout binder
  const logoutBtn = document.getElementById("acc-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("pleach_user");
      showToast("Logged out successfully");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  }

  // Setup sub-systems
  initProfileTab();
  initAddressTab();
  initOrdersTab();
}

function switchTab(tabName) {
  // Toggle active class on sidebar items
  const menuButtons = document.querySelectorAll(".account-menu-item[data-tab]");
  menuButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  // Toggle active panels visibility
  const panels = document.querySelectorAll(".acc-panel-pane");
  panels.forEach(pane => {
    if (pane.id === `pane-${tabName}`) {
      pane.classList.remove("d-none");
    } else {
      pane.classList.add("d-none");
    }
  });
}

/* ==========================================================================
   1. Profile Tab Logic
   ========================================================================== */
function initProfileTab() {
  const form = document.getElementById("profile-edit-form");
  const editBtn = document.getElementById("profile-edit-btn");
  const saveBtn = document.getElementById("profile-save-btn");

  const nameInput = document.getElementById("profile-name");
  const emailInput = document.getElementById("profile-email");
  const phoneInput = document.getElementById("profile-phone");
  const maleRadio = document.getElementById("gender-male");
  const femaleRadio = document.getElementById("gender-female");

  if (!form || !editBtn || !saveBtn) return;

  // Load existing profile values
  nameInput.value = activeUser.name;
  emailInput.value = activeUser.email;
  phoneInput.value = activeUser.phone || "";
  
  const savedGender = localStorage.getItem(`pleach_gender_${activeUser.email}`);
  if (savedGender === "male") maleRadio.checked = true;
  if (savedGender === "female") femaleRadio.checked = true;

  // Handle Edit Action
  editBtn.onclick = () => {
    nameInput.disabled = false;
    phoneInput.disabled = false;
    maleRadio.disabled = false;
    femaleRadio.disabled = false;

    editBtn.classList.add("d-none");
    saveBtn.classList.remove("d-none");
  };

  // Handle Form Submission Save
  form.onsubmit = function(e) {
    e.preventDefault();

    const updatedName = nameInput.value.trim();
    const updatedPhone = phoneInput.value.trim();
    const selectedGender = maleRadio.checked ? "male" : (femaleRadio.checked ? "female" : "");

    // Update activeUser object
    activeUser.name = updatedName;
    activeUser.phone = updatedPhone;
    localStorage.setItem("pleach_user", JSON.stringify(activeUser));

    // Update gender in local storage
    if (selectedGender) {
      localStorage.setItem(`pleach_gender_${activeUser.email}`, selectedGender);
    }

    // Update registered user catalog database
    const registered = JSON.parse(localStorage.getItem("pleach_registered_users")) || [];
    const idx = registered.findIndex(u => u.email.toLowerCase() === activeUser.email.toLowerCase());
    if (idx > -1) {
      registered[idx].name = updatedName;
      registered[idx].phone = updatedPhone;
      localStorage.setItem("pleach_registered_users", JSON.stringify(registered));
    }

    // Update sidebar text
    const usernameEl = document.getElementById("acc-username");
    if (usernameEl) usernameEl.textContent = updatedName;

    // Reset Form Input disables
    nameInput.disabled = true;
    phoneInput.disabled = true;
    maleRadio.disabled = true;
    femaleRadio.disabled = true;

    saveBtn.classList.add("d-none");
    editBtn.classList.remove("d-none");

    showToast("Profile updated successfully!");
  };
}

/* ==========================================================================
   2. Address Tab Logic
   ========================================================================== */
function getAddressesKey() {
  return `pleach_addresses_${activeUser.email}`;
}

function loadAddresses() {
  return JSON.parse(localStorage.getItem(getAddressesKey())) || [];
}

function saveAddresses(addresses) {
  localStorage.setItem(getAddressesKey(), JSON.stringify(addresses));
}

function initAddressTab() {
  const listContainer = document.getElementById("addresses-list-container");
  const showFormBtn = document.getElementById("show-address-form-btn");
  const formContainer = document.getElementById("new-address-form-container");
  const form = document.getElementById("address-form");
  const cancelBtn = document.getElementById("cancel-address-btn");
  const editIndexInput = document.getElementById("address-edit-index");

  if (!listContainer || !showFormBtn || !formContainer || !form) return;

  const renderAddressesList = () => {
    const list = loadAddresses();
    if (list.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-5 border rounded bg-light mt-3">
          <i class="fas fa-map-marker-alt text-muted mb-2 fs-2 d-block"></i>
          <p class="text-muted mb-0">No saved addresses found. Add one now to speed up checkout.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = list.map((addr, i) => `
      <div class="card p-3 mb-3 border ${addr.active ? 'border-primary' : 'border-light'}" style="position: relative;">
        <div class="d-flex align-items-center mb-2">
          <span class="badge bg-secondary me-2">${addr.type}</span>
          <strong style="font-size: 15px;">${addr.name}</strong>
          <span class="ms-3 text-secondary" style="font-size: 13px;">${addr.phone}</span>
        </div>
        <div class="text-muted mb-3" style="font-size: 13.5px;">
          ${addr.address}, ${addr.locality}, ${addr.city}, ${addr.state} - <strong>${addr.pincode}</strong>
        </div>
        <div class="d-flex gap-3 align-items-center" style="font-size: 13px;">
          ${!addr.active ? `<button class="btn btn-link p-0 text-primary btn-set-default" data-index="${i}">Set as default</button>` : `<span class="text-success"><i class="fas fa-check-circle me-1"></i>Default address</span>`}
          <button class="btn btn-link p-0 text-secondary btn-edit-address" data-index="${i}"><i class="far fa-edit me-1"></i>Edit</button>
          <button class="btn btn-link p-0 text-danger btn-delete-address" data-index="${i}"><i class="far fa-trash-alt me-1"></i>Delete</button>
        </div>
      </div>
    `).join("");

    // Bind Address Actions
    document.querySelectorAll(".btn-set-default").forEach(btn => {
      btn.onclick = function() {
        const idx = parseInt(this.dataset.index);
        const list = loadAddresses();
        list.forEach((item, i) => item.active = (i === idx));
        saveAddresses(list);
        renderAddressesList();
        showToast("Default address updated");
      };
    });

    document.querySelectorAll(".btn-delete-address").forEach(btn => {
      btn.onclick = function() {
        const idx = parseInt(this.dataset.index);
        const list = loadAddresses();
        const deleted = list.splice(idx, 1)[0];
        // If we deleted the active one, set another one as active
        if (deleted.active && list.length > 0) {
          list[0].active = true;
        }
        saveAddresses(list);
        renderAddressesList();
        showToast("Address deleted");
      };
    });

    document.querySelectorAll(".btn-edit-address").forEach(btn => {
      btn.onclick = function() {
        const idx = parseInt(this.dataset.index);
        const list = loadAddresses();
        const addr = list[idx];

        // Fill form fields
        editIndexInput.value = idx;
        document.getElementById("addr-name").value = addr.name;
        document.getElementById("addr-phone").value = addr.phone;
        document.getElementById("addr-pincode").value = addr.pincode;
        document.getElementById("addr-locality").value = addr.locality;
        document.getElementById("addr-street").value = addr.address;
        document.getElementById("addr-city").value = addr.city;
        document.getElementById("addr-state").value = addr.state;
        
        if (addr.type === "Home") {
          document.getElementById("addr-home").checked = true;
        } else {
          document.getElementById("addr-work").checked = true;
        }

        document.getElementById("address-form-title").textContent = "Edit Address";
        formContainer.classList.remove("d-none");
        formContainer.scrollIntoView({ behavior: 'smooth' });
      };
    });
  };

  // Click Show Form
  showFormBtn.onclick = () => {
    editIndexInput.value = "";
    form.reset();
    document.getElementById("address-form-title").textContent = "Add New Address";
    formContainer.classList.toggle("d-none");
  };

  cancelBtn.onclick = () => {
    formContainer.classList.add("d-none");
  };

  // Submit Address Form
  form.onsubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById("addr-name").value.trim();
    const phone = document.getElementById("addr-phone").value.trim();
    const pincode = document.getElementById("addr-pincode").value.trim();
    const locality = document.getElementById("addr-locality").value.trim();
    const street = document.getElementById("addr-street").value.trim();
    const city = document.getElementById("addr-city").value.trim();
    const state = document.getElementById("addr-state").value.trim();
    const type = document.getElementById("addr-home").checked ? "Home" : "Work";

    const addresses = loadAddresses();
    const editIdxStr = editIndexInput.value;

    const newAddress = {
      name, phone, pincode, locality, address: street, city, state, type,
      active: addresses.length === 0 ? true : false // Default active on first address
    };

    if (editIdxStr !== "") {
      // Edit mode
      const idx = parseInt(editIdxStr);
      newAddress.active = addresses[idx].active; // Retain active status
      addresses[idx] = newAddress;
      showToast("Address updated successfully!");
    } else {
      // Add mode
      if (addresses.length === 0) newAddress.active = true;
      addresses.push(newAddress);
      showToast("New address added successfully!");
    }

    saveAddresses(addresses);
    form.reset();
    formContainer.classList.add("d-none");
    renderAddressesList();
  };

  renderAddressesList();
}

/* ==========================================================================
   3. Orders Tab Logic
   ========================================================================== */
function initOrdersTab() {
  const container = document.getElementById("orders-list-container");
  if (!container) return;

  const renderOrdersList = () => {
    const ordersKey = `pleach_orders_${activeUser.email}`;
    const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];

    if (orders.length === 0) {
      container.innerHTML = `
        <div class="text-center py-5 border rounded bg-light">
          <i class="fas fa-shopping-bag text-muted mb-2 fs-2 d-block"></i>
          <p class="text-muted mb-0">You haven't placed any orders yet.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map((order, orderIdx) => {
      // Determine active tracking step indexes
      let timelineHtml = "";
      const statusSteps = ["Ordered", "Packed", "Shipped", "Delivered"];
      const currentIdx = statusSteps.indexOf(order.status);

      timelineHtml = statusSteps.map((step, stepIdx) => {
        let stateClass = "";
        if (stepIdx < currentIdx) stateClass = "completed";
        else if (stepIdx === currentIdx) stateClass = "active";
        
        return `
          <div class="timeline-step ${stateClass}">
            <div class="timeline-dot"></div>
            <div class="timeline-label">${step}</div>
          </div>
        `;
      }).join("");

      // Render order details
      return `
        <div class="card mb-4 border border-light shadow-sm">
          <!-- Card Header -->
          <div class="card-header bg-white p-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <span class="text-muted" style="font-size: 13px;">Ordered on <strong>${order.date}</strong></span>
              <span class="ms-3 bg-light text-primary px-2 py-1 rounded fw-bold" style="font-size: 12px;">ID: ${order.orderId}</span>
            </div>
            <div class="d-flex align-items-center gap-3">
              <strong class="text-dark">Total: ₹${order.total.toLocaleString()}</strong>
              ${order.status !== 'Delivered' ? `
                <button class="btn btn-sm btn-outline-success btn-advance-order py-1 fw-bold" data-order-idx="${orderIdx}" style="font-size: 11px;">
                  Mock: Ship / Deliver
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Timeline Tracker Panel -->
          <div class="px-4 py-3 border-bottom bg-light">
            <div class="order-tracking-timeline">
              ${timelineHtml}
            </div>
          </div>

          <!-- Items Panel -->
          <div class="p-3">
            <h6 class="fw-bold mb-3" style="font-size: 14px;">Items Purchased:</h6>
            <div class="table-responsive">
              <table class="table table-borderless align-middle mb-0" style="font-size: 13.5px;">
                <tbody>
                  ${order.items.map(item => `
                    <tr>
                      <td style="width: 60px;">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain;">
                      </td>
                      <td>
                        <a href="product-details.html?id=${item.id}" class="text-dark fw-semibold">${item.name}</a>
                        <div class="text-muted small">Seller: ${item.brand}</div>
                      </td>
                      <td class="text-center">Qty: ${item.qty}</td>
                      <td class="text-end fw-bold">₹${(item.price * item.qty).toLocaleString()}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Delivery Address Block -->
          <div class="card-footer bg-white p-3 border-top text-muted" style="font-size: 12.5px; line-height: 1.4;">
            <strong>Shipping Address:</strong> ${order.shippingAddress.name} | Phone: ${order.shippingAddress.phone} | Address: ${order.shippingAddress.address}, ${order.shippingAddress.locality}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}
          </div>
        </div>
      `;
    }).join("");

    // Bind mockup order timeline advances
    document.querySelectorAll(".btn-advance-order").forEach(btn => {
      btn.onclick = function() {
        const orderIdx = parseInt(this.dataset.orderIdx);
        const ordersKey = `pleach_orders_${activeUser.email}`;
        const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
        
        const statusSteps = ["Ordered", "Packed", "Shipped", "Delivered"];
        const currentIdx = statusSteps.indexOf(orders[orderIdx].status);
        
        if (currentIdx < statusSteps.length - 1) {
          orders[orderIdx].status = statusSteps[currentIdx + 1];
          localStorage.setItem(ordersKey, JSON.stringify(orders));
          renderOrdersList();
          showToast(`Order status updated to: ${orders[orderIdx].status}`);
        }
      };
    });
  };

  renderOrdersList();
}
