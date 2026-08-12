/* Le Cappadoce — Interactions */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox__close");
  const menuDisplay = document.getElementById("menu-display");
  const menuViewerDisplay = document.querySelector(".menu-viewer__display");

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 60);
    });
  }

  burger?.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav?.classList.toggle("open");
  });

  nav?.querySelectorAll(".nav__link, .nav__cta").forEach((link) => {
    link.addEventListener("click", () => {
      burger?.classList.remove("active");
      nav?.classList.remove("open");
    });
  });

  const switchMenu = (src, label) => {
    if (!menuDisplay) return;
    menuDisplay.src = src;
    menuDisplay.alt = label || "Carte menu Le Cappadoce";
    menuViewerDisplay?.setAttribute("data-lightbox", src);

    document.querySelectorAll(".menu-viewer__tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.menu === src);
    });
    document.querySelectorAll(".menu-viewer__thumb").forEach((thumb) => {
      thumb.classList.toggle("active", thumb.dataset.menu === src);
    });
  };

  document.querySelectorAll(".menu-viewer__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      switchMenu(tab.dataset.menu, tab.textContent.trim());
    });
  });

  document.querySelectorAll(".menu-viewer__thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      switchMenu(thumb.dataset.menu);
    });
  });

  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", () => {
      const src = el.dataset.lightbox || el.querySelector("img")?.src;
      if (!lightbox || !lightboxImg || !src) return;
      lightboxImg.src = src;
      lightboxImg.alt = el.querySelector("img")?.alt || "Image agrandie";
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox?.classList.remove("active");
    document.body.style.overflow = "";
  };

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".highlight, .review, .special-card, .gallery__item").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
});
