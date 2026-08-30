(function () {
  "use strict";

  // ---- Sticky top bar background on scroll ----
  var topbar = document.getElementById("topbar");
  var stickyCta = document.getElementById("sticky-cta");
  var heroMedia = document.querySelector(".hero__media");

  function onScroll() {
    var scrolled = window.scrollY > 40;
    if (topbar) topbar.classList.toggle("is-scrolled", scrolled);

    if (stickyCta && heroMedia) {
      var heroBottom = heroMedia.getBoundingClientRect().bottom;
      stickyCta.classList.toggle("is-visible", heroBottom < 0);
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Reveal-on-scroll for section titles and cards ----
  var revealTargets = document.querySelectorAll(
    ".section__title, .heading--functional, .day-row, .price-card, .testimonial-block__grid, .reservation-box, .guest"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- Frühbucher countdown ----
  var countdownEl = document.getElementById("countdown-note");
  if (countdownEl) {
    var deadline = new Date("2026-10-15T23:59:59+02:00");
    var now = new Date();
    var diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      countdownEl.textContent =
        "Noch " + diffDays + " Tage bis zum Frühbucherpreis (15.10.2026).";
    } else if (diffDays === 1) {
      countdownEl.textContent = "Letzter Tag zum Frühbucherpreis — heute endet er.";
    } else {
      countdownEl.textContent = "Der Frühbucherpreis ist abgelaufen. Regulärer Preis: 5.970 €.";
    }
  }
})();
