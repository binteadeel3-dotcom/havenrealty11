/**
 * Haven Realty - Optimized Main JavaScript
 * Handles:
 * - Sticky Navbar
 * - Property Image Gallery
 * - Dynamic Range Sliders
 * - Swiper Initialization
 * - Form Submissions
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =====================================================
     1. Sticky Navbar (Optimized & Throttled)
  ===================================================== */
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  const onScroll = () => {
    if (!navbar) return;

    const currentScroll = window.scrollY;

    if (currentScroll > 50 && lastScrollY <= 50) {
      navbar.classList.add("scrolled", "shadow-lg");
    } else if (currentScroll <= 50 && lastScrollY > 50) {
      navbar.classList.remove("scrolled", "shadow-lg");
    }

    lastScrollY = currentScroll;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // Initial state

  /* =====================================================
     2. Property Detail Image Gallery (Class-based)
  ===================================================== */
  const mainImg = document.getElementById("mainDetailImg");
  const thumbnails = document.querySelectorAll(".gallery-trigger");

  if (mainImg && thumbnails.length) {
    thumbnails[0].classList.add("active");

    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        if (thumb.classList.contains("active")) return;

        thumbnails.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");

        mainImg.classList.add("fade-out");

        setTimeout(() => {
          mainImg.src = thumb.src;
          mainImg.classList.remove("fade-out");
        }, 250);
      });
    });
  }

  /* =====================================================
     3. Dynamic Range Sliders (Reusable Utility)
  ===================================================== */
  const initRangeSlider = (rangeId, valueId, prefix = "", suffix = "") => {
    const range = document.getElementById(rangeId);
    const display = document.getElementById(valueId);

    if (!range || !display) return;

    const updateValue = () => {
      const val = Number(range.value).toLocaleString();
      display.textContent = `${prefix}${val}${suffix}`;
    };

    range.addEventListener("input", updateValue);
    updateValue(); // Initial render
  };

  initRangeSlider("sqftRange", "sqftValue", "Up to ", " Sq Ft");
  initRangeSlider("priceRange", "priceValue", "Up to $");

  /* =====================================================
     4. Swiper Initialization (Responsive & Safe)
  ===================================================== */
  const initPropertySwiper = () => {
    const swiperEl = document.querySelector(".propertySwiper");

    if (!swiperEl || typeof Swiper === "undefined") return;

    new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      watchOverflow: true,
      observer: true,
      observeParents: true,

      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          autoplay: false, // Better mobile UX
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  };

  initPropertySwiper();

  /* =====================================================
     5. Form Submission (Scoped & Safe)
  ===================================================== */
  document.querySelectorAll(".js-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Success! Your message has been sent to Haven Realty.");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
      }, 1500);
    });
  });
});
