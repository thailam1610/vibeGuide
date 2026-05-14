// Subtle reveal-on-scroll for sections, cards, and steps.
(() => {
  const targets = document.querySelectorAll(
    ".section h2, .lead, .hero-card, .feature, .stack-card, .step, .howto-step, .tips, .diagram, .two-col, .callout, .cao-item, .idea-card, .idea-recipe, .growth-tips, .share-card, .share-warning, .share-howshare"
  );

  targets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => io.observe(el));

  // Smooth-scroll already handled by CSS scroll-behavior; just close any
  // potential focus rings nicely when clicking nav links.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      link.blur();
    });
  });

  // Scroll progress bar
  const progressBar = document.querySelector(".scroll-progress");
  if (progressBar) {
    let ticking = false;
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      progressBar.style.width = pct + "%";
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateProgress);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateProgress();
  }

  // Parallax-ish drift on hero shapes when mouse moves over hero
  const hero = document.querySelector(".hero");
  const heroShapes = document.querySelectorAll(".hero-shapes .shape");
  if (hero && heroShapes.length && window.matchMedia("(min-width: 760px)").matches) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroShapes.forEach((shape, i) => {
        const depth = (i + 1) * 4;
        shape.style.translate = `${x * depth}px ${y * depth}px`;
      });
    });
    hero.addEventListener("mouseleave", () => {
      heroShapes.forEach((shape) => (shape.style.translate = ""));
    });
  }
})();
