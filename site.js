const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

const header = document.querySelector("[data-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuButton = document.querySelector("[data-menu-button]");
const navLinks = document.querySelector("[data-nav-links]");
const closeMenu = () => {
  navLinks?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};
menuButton?.addEventListener("click", () => {
  const open = navLinks?.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(Boolean(open)));
  document.body.classList.toggle("menu-open", Boolean(open));
});
navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

const filters = [...document.querySelectorAll("[data-filter]")];
const doors = [...document.querySelectorAll("[data-category]")];
filters.forEach((button) => button.addEventListener("click", () => {
  const chosen = button.dataset.filter;
  filters.forEach((item) => item.classList.toggle("is-active", item === button));
  filters.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
  doors.forEach((door) => { door.hidden = chosen !== "all" && door.dataset.category !== chosen; });
}));

const destinations = [
  { name: "Lobster Chat", detail: "Private family AI workspace", url: "https://chat.jpop.cloud", tags: "chat private voice files" },
  { name: "Sean", detail: "Personal agent & build partner", url: "https://sean.jpop.cloud", tags: "lobster agent coworker" },
  { name: "Claw Four", detail: "Multiplayer game room", url: "https://games.jpop.cloud", tags: "game play" },
  { name: "Euro Summer", detail: "Fari & Storm’s trip companion", url: "https://euro.jpop.cloud", tags: "travel europe" },
  { name: "Italy", detail: "Travel companion with chat", url: "https://italy.jpop.cloud", tags: "travel" },
  { name: "Edge Tools", detail: "Useful tools for recurring work", url: "https://edgetools.app", tags: "work utility" },
  { name: "FIO Resolver", detail: "Handles and crypto QR codes", url: "https://fio.jpop.cloud", tags: "utility crypto" },
  { name: "Token Icons", detail: "Token asset lookup", url: "https://icon.jpop.cloud", tags: "utility crypto" },
  { name: "Order Lookup", detail: "Quick order utility", url: "https://orders.jpop.cloud", tags: "utility" },
  { name: "The Lab", detail: "Experiments and prototypes", url: "https://lab.jpop.cloud", tags: "experiment weird" },
  { name: "JPop on GitHub", detail: "The human’s public code", url: "https://github.com/JP0P", tags: "github jared" },
  { name: "Sean on GitHub", detail: "Open-source work and products", url: "https://github.com/clawSean", tags: "github agent" },
  { name: "Clawdia on GitHub", detail: "Edge’s AI coworker", url: "https://github.com/EdgeClaws", tags: "github agent edge" }
];

const dialog = document.querySelector("[data-command-dialog]");
const input = document.querySelector("[data-command-input]");
const results = document.querySelector("[data-command-results]");
const renderResults = (query = "") => {
  if (!results) return;
  const normalized = query.trim().toLowerCase();
  const matches = destinations.filter((item) => `${item.name} ${item.detail} ${item.tags}`.toLowerCase().includes(normalized));
  results.innerHTML = matches.length
    ? matches.map((item, index) => `<a href="${item.url}" ${index === 0 ? "data-first-result" : ""}><span><strong>${item.name}</strong><small>${item.detail}</small></span><b>↗</b></a>`).join("")
    : '<p class="empty-result">Nothing by that name. Try “Sean” or “tools”.</p>';
};
const openCommand = () => {
  if (!dialog) return;
  renderResults();
  dialog.showModal();
  closeMenu();
  requestAnimationFrame(() => input?.focus());
};
document.querySelectorAll("[data-command-open]").forEach((button) => button.addEventListener("click", openCommand));
document.querySelector("[data-command-close]")?.addEventListener("click", () => dialog?.close());
input?.addEventListener("input", () => renderResults(input.value));
dialog?.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.addEventListener("click", (event) => {
  if (!navLinks?.classList.contains("is-open") || event.target.closest("[data-header]")) return;
  closeMenu();
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openCommand(); }
  if (event.key === "Escape" && !dialog?.open) { closeMenu(); menuButton?.focus(); }
  if (event.key === "Enter" && dialog?.open && document.activeElement === input) document.querySelector("[data-first-result]")?.click();
});
