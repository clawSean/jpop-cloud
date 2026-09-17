const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuButton = document.querySelector("[data-menu-button]");
const navLinks = document.querySelector("[data-nav-links]");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}
