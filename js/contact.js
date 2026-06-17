/**
 * Pleach Shop - Contact Form Handling
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.onsubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    // Perform minimal validation
    if (!name || !email || !phone || !message) {
      showToast("Please fill in all the details.", "error");
      return;
    }

    // Mock form submission success
    showToast(`Thank you ${name}! We've received your query.`);
    
    // Reset form
    form.reset();
  };
});
