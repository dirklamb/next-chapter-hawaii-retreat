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
    ".section__title, .heading--functional, .day-row, .price-card, .testimonial-block__grid, .reservation-box, .guest, .tile, .exp-tile"
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

  // ---- Exit-intent popup ----
  var popup = document.getElementById("exitPopup");
  if (popup) {
    var SESSION_KEY = "ncExitPopupShown";
    var popupBody = document.getElementById("exitPopupBody");
    var popupSuccess = document.getElementById("exitPopupSuccess");
    var popupForm = document.getElementById("exitPopupForm");
    var triggered = false;

    function alreadyShown() {
      try {
        return sessionStorage.getItem(SESSION_KEY) === "1";
      } catch (e) {
        return triggered;
      }
    }
    function markShown() {
      triggered = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch (e) {
        /* ignore */
      }
    }
    function openPopup() {
      if (alreadyShown()) return;
      markShown();
      popup.hidden = false;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(function () {
        popup.classList.add("is-visible");
      });
    }
    function closePopup() {
      popup.classList.remove("is-visible");
      document.body.style.overflow = "";
      setTimeout(function () {
        popup.hidden = true;
      }, 300);
    }

    popup.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closePopup();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !popup.hidden) closePopup();
    });
    if (popupForm) {
      popupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // NOTE: no backend is wired up yet — this only shows a client-side
        // confirmation. Connect this form to a real email/CRM endpoint
        // (e.g. the newsletter tool used for THE NEXT CHAPTER) before launch.
        popupBody.hidden = true;
        popupSuccess.hidden = false;
      });
    }

    if (window.matchMedia("(min-width: 900px)").matches) {
      // Desktop: classic exit-intent — mouse leaves toward the browser chrome.
      document.addEventListener("mouseout", function (e) {
        if (!e.relatedTarget && e.clientY <= 0) {
          openPopup();
        }
      });
    } else {
      // Mobile/tablet: no real exit-intent — trigger after meaningful scroll
      // depth or, failing that, after a while on the page. Once per session.
      var scrollTriggered = false;
      function maybeTriggerOnScroll() {
        if (scrollTriggered || alreadyShown()) return;
        var scrolledPast = window.scrollY + window.innerHeight;
        var pageHeight = document.body.scrollHeight;
        if (pageHeight > 0 && scrolledPast / pageHeight > 0.55) {
          scrollTriggered = true;
          openPopup();
        }
      }
      window.addEventListener("scroll", maybeTriggerOnScroll, { passive: true });
      setTimeout(function () {
        if (!scrollTriggered) openPopup();
      }, 45000);
    }
  }
})();
