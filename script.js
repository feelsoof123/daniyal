/**
 * Sheikh Daniyal Ansari — Official Website Core JavaScript
 * Features: Scroll reveals, copy deterrence, WhatsApp routing, dynamic year, mobile nav
 */

(function () {
  "use strict";

  // 1. Mobile Menu Toggle
  
function initMobileMenu() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", function () {
    const isOpen = navLinks.style.display === "flex";

    navLinks.style.display = isOpen ? "none" : "flex";
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.style.display = "none";
    });
  });
}


  // 2. Dynamic Year Updater
  function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = currentYear;

    document.querySelectorAll(".current-year").forEach(function (el) {
      el.textContent = currentYear;
    });
  }

  // 3. Scroll Reveal Observer
  function initScrollReveal() {
    const revealItems = document.querySelectorAll(".reveal");
    if (!revealItems.length) return;

    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealItems.forEach(function (item) {
        observer.observe(item);
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add("visible");
      });
    }
  }

  // 4. Client-side Copy Deterrent (Allows input/textarea typing & selection)
  function initCopyProtection() {
    document.addEventListener("contextmenu", function (e) {
      if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
      }
    });

    document.addEventListener("copy", function (e) {
      if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
      }
    });

    document.addEventListener("cut", function (e) {
      if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
      }
    });

    document.addEventListener("keydown", function (e) {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["c", "x", "u", "s", "p"].includes(key)) {
        if (!["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
          e.preventDefault();
        }
      }
      if (e.key === "F12" || ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(key))) {
        e.preventDefault();
      }
    });
  }

  // 5. WhatsApp Contact Form Integration
  function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nameInput = document.getElementById("name");
      const phoneInput = document.getElementById("phone");
      const messageInput = document.getElementById("message");

      if (!nameInput || !phoneInput || !messageInput) return;

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !phone || !message) return;

      const lines = [
        "Website Project Enquiry",
        "Name: " + name,
        "Phone: " + phone,
        "Requirement: " + message
      ];

      const whatsappUrl = "https://wa.me/923111855512?text=" + encodeURIComponent(lines.join("\n"));
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Initialize all features on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    updateYear();
    initScrollReveal();
    initCopyProtection();
    initContactForm();
  });

})();
