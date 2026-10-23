/* UPPC Print Heritage Museum interactions.
   This single shared script supports the responsive navigation, forms and footer year.
*/
document.addEventListener("DOMContentLoaded", () => {
  // Cache the mobile menu controls. Pages without these elements remain safe.
  const menu = document.getElementById("menu");
  const navLinks = document.getElementById("navLinks");

  // Open or close the navigation menu on smaller screens.
  if (menu && navLinks) {
    menu.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menu.textContent = isOpen ? "×" : "☰";
      menu.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu after a visitor follows a navigation link.
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1050) {
          navLinks.classList.remove("open");
          menu.textContent = "☰";
          menu.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Send the contact enquiry through the visitor's configured email application.
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value.trim();
      const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
      window.location.href = `mailto:arthur.bukenya@uppc.go.ug?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Keep the copyright year current without editing every HTML page annually.
  document.querySelectorAll("#year").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });
});
