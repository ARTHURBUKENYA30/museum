/* ==========================================================================
   UPPC PRINT HERITAGE MUSEUM — SHARED JAVASCRIPT
   Keep site-wide interactions here so every page needs only one JS file.
   ========================================================================== */

"use strict";

/* Wait until the document is ready before wiring up interactive elements. */
document.addEventListener("DOMContentLoaded", function () {
  /* Mobile navigation opens and closes from the accessible menu button. */
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      navigation.classList.toggle("is-open", !isExpanded);
    });

    /* Close the mobile menu after a visitor chooses a destination. */
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuButton.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
      });
    });
  }

  /* Keep the copyright year accurate without editing every page annually. */
  document.querySelectorAll("[data-current-year]").forEach(function (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  });

  /* Provide a clear local confirmation for the contact form.
     IMPORTANT: no email is sent by this static-only implementation.
     Connect an approved backend or form provider before using it live. */
  const contactForm = document.querySelector("#contact-form");
  const formMessage = document.querySelector("#form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        formMessage.textContent = "Please complete the required fields.";
        return;
      }

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "General enquiry");
      const message = String(formData.get("message") || "").trim();

      /* A mailto draft lets visitors open their own email app to send the enquiry. */
      const emailBody = [
        "Name: " + name,
        "Email: " + email,
        "Subject: " + subject,
        "",
        message
      ].join("\n");
      const mailto = "mailto:info@uppc.go.ug"
        + "?subject=" + encodeURIComponent("Museum enquiry: " + subject)
        + "&body=" + encodeURIComponent(emailBody);

      formMessage.textContent =
        "Your email app may open with a prepared draft. Review the recipient and details, then send it.";
      window.location.href = mailto;
    });
  }
});
