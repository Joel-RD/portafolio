(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Theme ---------- */
  var themeToggle = document.getElementById("theme-toggle");
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  function syncThemeButton() {
    if (!themeToggle) return;
    var isDark = currentTheme() === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
    if (themeColor) themeColor.setAttribute("content", isDark ? "#0C0E0B" : "#F4F1E8");
  }

  syncThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      syncThemeButton();
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var pageMain = document.getElementById("main");
  var pageFooter = document.querySelector(".site-footer");
  var lastFocused = null;

  function setBackgroundInert(isInert) {
    [pageMain, pageFooter].forEach(function (el) {
      if (!el) return;
      if (isInert) {
        el.setAttribute("inert", "");
      } else {
        el.removeAttribute("inert");
      }
    });
  }

  function closeMenu(returnFocus) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    mobileMenu.hidden = true;
    document.body.classList.remove("menu-open");
    setBackgroundInert(false);
    if (returnFocus && lastFocused) lastFocused.focus();
  }

  function openMenu() {
    if (!menuToggle || !mobileMenu) return;
    lastFocused = document.activeElement;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar menú");
    mobileMenu.hidden = false;
    document.body.classList.add("menu-open");
    setBackgroundInert(true);
    var first = mobileMenu.querySelector("a");
    if (first) first.focus();
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu(true);
      } else {
        openMenu();
      }
    });

    mobileMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960 && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu(false);
      }
    });
  }

  /* ---------- Header + scroll progress ---------- */
  var header = document.getElementById("site-header");
  var progressBar = document.getElementById("scroll-progress-bar");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;

    if (header) {
      header.classList.toggle("is-scrolled", y > 8);
    }

    if (progressBar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var progress = max > 0 ? Math.min(y / max, 1) : 0;
      progressBar.style.transform = "scaleX(" + progress.toFixed(4) + ")";
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );

  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  revealItems.forEach(function (el) {
    var delay = Number(el.getAttribute("data-delay") || 0);
    if (delay > 0) el.style.setProperty("--delay", String(delay));
  });

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            var isActive = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("is-active", isActive);
            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
