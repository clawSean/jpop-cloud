const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const navLinks = document.querySelector("[data-nav-links]");

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const closeMenu = () => {
  navLinks?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

menuButton?.addEventListener("click", () => {
  const open = !navLinks?.classList.contains("is-open");
  navLinks?.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const stage = document.querySelector(".portal-stage");
const portalButton = document.querySelector("[data-portal-switch]");
const portalLabel = document.querySelector("[data-portal-label]");
const portalStatus = document.querySelector("[data-portal-status]");
const portalMessages = [
  "Universe N&M-02: Jerry broke the sandbox. Working as designed.",
  "Universe N&M-03: Meeseeks completed the task and vanished cleanly.",
  "Universe N&M-04: Beth is standing by. Morty is pretending that is unnecessary.",
  "Universe N&M-05: Citadel review returned three opinions and one decision."
];
let portalIndex = 0;

portalButton?.addEventListener("click", () => {
  stage?.classList.remove("is-spinning");
  void stage?.offsetWidth;
  stage?.classList.add("is-spinning");
  portalIndex = (portalIndex + 1) % portalMessages.length;
  portalStatus.textContent = portalMessages[portalIndex];
  portalLabel.textContent = "Spin it again";
  portalButton.setAttribute("aria-pressed", "true");
  window.setTimeout(() => stage?.classList.remove("is-spinning"), 900);
});

const revealItems = [...document.querySelectorAll(".reveal")];
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5%" });
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});
