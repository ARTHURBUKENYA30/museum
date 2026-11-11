/* UPPC Print Heritage Museum — shared behaviour for the editable HTML pages. */
document.addEventListener("DOMContentLoaded", () => {
  const routes = {
  "home": "Home.html",
  "visit": "Visit.html",
  "about": "About.html",
  "history": "About.html#history",
  "mission": "About.html#mission",
  "conservation": "About.html#conservation",
  "leadership": "About.html#leadership",
  "leadership-board": "About.html#board",
  "leadership-management": "About.html#management",
  "collections": "Collections.html",
  "col-presses": "Collections.html#col-presses",
  "col-type": "Collections.html#col-type",
  "col-gazettes": "Collections.html#col-gazettes",
  "col-newspapers": "Collections.html#col-newspapers",
  "col-books": "Collections.html#col-books",
  "col-binding": "Collections.html#col-binding",
  "col-photos": "Collections.html#col-photos",
  "col-oral": "Collections.html#col-oral",
  "research": "Collections.html#research",
  "col-prepress": "Collections.html#col-prepress",
  "col-paper": "Collections.html#col-paper",
  "col-offset": "Collections.html#col-offset",
  "col-ink": "Collections.html#col-ink",
  "col-security": "Collections.html#col-security",
  "col-commercial": "Collections.html#col-commercial",
  "col-tools": "Collections.html#col-tools",
  "col-ephemera": "Collections.html#col-ephemera",
  "exhibitions": "Exhibitions.html",
  "visit-groups": "Visit.html#visit-groups",
  "visit-access": "Visit.html#visit-access",
  "virtual-tour": "Visit.html#virtual-tour",
  "education": "Programs.html",
  "news": "News.html",
  "news-1": "News.html#news-1",
  "news-2": "News.html#news-2",
  "news-3": "News.html#news-3",
  "support": "Support.html",
  "contact": "Contact.html"
};
  // These pages contain multiple views in one HTML file. Show only the requested view,
  // so visitors can open details from the overview instead of seeing every section at once.
  const pageViews = Array.from(document.querySelectorAll("main .view[id]"));
  const viewPages = new Set(["About.html", "Collections.html", "Visit.html", "News.html"]);
  const currentPage = window.location.pathname.split("/").pop();
  if (pageViews.length && viewPages.has(currentPage)) {
    const activateView = (requestedId) => {
      const selectedId = pageViews.some((view) => view.id === requestedId)
        ? requestedId
        : pageViews[0].id;
      pageViews.forEach((view) => {
        const active = view.id === selectedId;
        view.classList.toggle("active", active);
        view.setAttribute("aria-hidden", String(!active));
      });
    };
    activateView(decodeURIComponent(window.location.hash.slice(1)));
    window.addEventListener("hashchange", () => {
      activateView(decodeURIComponent(window.location.hash.slice(1)));
    });
  }

  document.querySelectorAll("button[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      const destination = routes[button.dataset.nav];
      if (destination) window.location.href = destination;
    });
  });

  const mobileToggle = document.getElementById("mobile-toggle");
  const mobilePanel = document.getElementById("mobile-panel");
  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener("click", () => {
      const open = mobilePanel.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(open));
      mobileToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }
  document.querySelectorAll(".mobile-subgroup-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const subgroup = button.closest(".mobile-subgroup");
      if (!subgroup) return;
      const open = subgroup.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  document.querySelectorAll(".mobile-group-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".mobile-group");
      if (group) group.classList.toggle("open");
    });
  });

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-slider-dots button"));
  if (slides.length > 1) {
    let active = Math.max(0, slides.findIndex((slide) => slide.classList.contains("active")));
    const showSlide = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === active));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === active));
    };
    dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));
    window.setInterval(() => showSlide(active + 1), 6000);
  }

  document.querySelectorAll(".read-more-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".explore-item");
      if (!item) return;
      const open = item.classList.toggle("is-open");
      button.textContent = open ? "Show less" : "Read more";
    });
  });

  document.querySelectorAll("form[id^='subscribe-form']").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const messageId = form.id.replace("subscribe-form", "form-message");
      const message = document.getElementById(messageId);
      if (message) {
        message.textContent = "Thank you for subscribing.";
        message.classList.add("success");
      }
      form.reset();
    });
  });

  const contactForm = document.getElementById("contact-form");
  const contactMessage = document.getElementById("contact-message");
  if (contactForm && contactMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("cname")?.value.trim() || "";
      const email = document.getElementById("cemail")?.value.trim() || "";
      const message = document.getElementById("cmsg")?.value.trim() || "";

      contactMessage.textContent = "";
      contactMessage.className = "form-message";

      if (name.length < 2 || name.length > 100 || !email || email.length > 254 ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          message.length < 10 || message.length > 5000) {
        contactMessage.textContent = "Please enter a valid name and email, and a message of at least 10 characters.";
        contactMessage.classList.add("error-dark");
        return;
      }

      const subject = "New Website Enquiry | UPPC Print Heritage Museum";
      const body = [
        "UPPC PRINT HERITAGE MUSEUM",
        "NEW WEBSITE ENQUIRY",
        "",
        "VISITOR DETAILS",
        "Name: " + name,
        "Email: " + email,
        "",
        "MESSAGE",
        message,
        "",
        "----------------------------------------",
        "Sent through the UPPC Print Heritage Museum website contact form."
      ].join("\n");
      const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=" +
        encodeURIComponent("museum@uppc.go.ug") +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      // Open Gmail directly from the submit gesture so browsers do not block the new tab.
      const gmailWindow = window.open(gmailUrl, "_blank");
      if (gmailWindow) {
        contactMessage.textContent = "Gmail has opened with your message addressed to museum@uppc.go.ug. Please review it and press Send in Gmail.";
        contactMessage.classList.add("success-dark");
      } else {
        contactMessage.textContent = "Your browser blocked the Gmail window. Allow pop-ups for this website, then submit the form again.";
        contactMessage.classList.add("error-dark");
      }
    });
  }

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".collection-item").forEach((item) => {
        item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter);
      });
    });
  });

  // Reading progress: tracks how far a visitor has scrolled on the current page.
  const progressTrack = document.createElement("div");
  progressTrack.id = "museum-reading-progress";
  progressTrack.setAttribute("role", "progressbar");
  progressTrack.setAttribute("aria-label", "Page reading progress");
  progressTrack.setAttribute("aria-valuemin", "0");
  progressTrack.setAttribute("aria-valuemax", "100");
  const progressBar = document.createElement("div");
  progressBar.id = "museum-reading-progress__bar";
  progressTrack.appendChild(progressBar);
  document.body.prepend(progressTrack);
  let progressTicking = false;
  const updateReadingProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 100;
    progressBar.style.width = percent + "%";
    progressTrack.setAttribute("aria-valuenow", String(Math.round(percent)));
    progressTicking = false;
  };
  const requestProgressUpdate = () => {
    if (!progressTicking) {
      progressTicking = true;
      window.requestAnimationFrame(updateReadingProgress);
    }
  };
  window.addEventListener("scroll", requestProgressUpdate, { passive: true });
  window.addEventListener("resize", requestProgressUpdate);
  updateReadingProgress();

});