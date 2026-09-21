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

const quickLooks = {
  sean: { label: "AGENT / COWORKER", title: "Sean", image: "/assets/quick/sean.jpg", alt: "Sean's command center homepage", body: "My always-on agent, coworker, researcher, code shipper, and sharply dressed lobster. His own site shows the custom systems and public work behind the personality.", points: ["Runs on ClawPop at home", "Works across the channels I already use", "26 accepted open-source contributions across seven projects"], url: "https://sean.jpop.cloud" },
  chat: { label: "PRIVATE AI / FAMILY ROOM", title: "Lobster Chat", image: "/assets/quick/chat.jpg", alt: "Lobster Chat invitation screen", body: "A private place for family and friends to talk directly with AI models—or switch into agent mode and work with Sean.", points: ["Direct-model history stays in the browser", "Usage is tracked without logging conversation content", "Supported text and files get an on-device privacy check"], url: "https://chat.jpop.cloud" },
  games: { label: "MULTIPLAYER / PLAY", title: "Claw Four", image: "/assets/quick/games.jpg", alt: "Claw Four multiplayer game board", body: "A live multiplayer Connect Four room built for friends who would rather talk trash than pass one phone around.", points: ["Everyone sees the same board", "Room presence and turn state update live", "Designed for a group-chat game night"], url: "https://games.jpop.cloud" },
  edge: { label: "WORK / UTILITIES", title: "Edge Tools", image: "/assets/quick/edgetools.jpg", alt: "Edge Tools homepage", body: "Small, direct answers to recurring problems at Edge—collected in one place instead of living in scattered docs and muscle memory.", points: ["Public utilities anyone can use", "Staff workspaces for internal flows", "Built from real operational friction"], url: "https://edgetools.app" }
};

const quickDialog = document.querySelector("[data-quick-dialog]");
let quickTrigger = null;
const setQuickTransitionNames = (key, active) => {
  document.querySelectorAll("[data-project-media], [data-project-title], [data-quick-image], [data-quick-title]").forEach((element) => { element.style.viewTransitionName = ""; });
  if (!active) return;
  document.querySelector(`[data-project-media="${key}"]`)?.style.setProperty("view-transition-name", "quick-look-image");
  document.querySelector(`[data-project-title="${key}"]`)?.style.setProperty("view-transition-name", "quick-look-title");
  quickDialog?.querySelector("[data-quick-image]")?.style.setProperty("view-transition-name", "quick-look-image");
  quickDialog?.querySelector("[data-quick-title]")?.style.setProperty("view-transition-name", "quick-look-title");
};
const populateQuickDialog = (key) => {
  const item = quickLooks[key];
  if (!item || !quickDialog) return;
  const image = quickDialog.querySelector("[data-quick-image]");
  image.src = item.image;
  image.alt = item.alt;
  quickDialog.querySelector("[data-quick-label]").textContent = item.label;
  quickDialog.querySelector("[data-quick-title]").textContent = item.title;
  quickDialog.querySelector("[data-quick-body]").textContent = item.body;
  quickDialog.querySelector("[data-quick-points]").innerHTML = item.points.map((point) => `<li>${point}</li>`).join("");
  quickDialog.querySelector("[data-quick-link]").href = item.url;
};
const openQuickDialog = (key, trigger) => {
  if (!quickLooks[key] || !quickDialog) return;
  quickTrigger = trigger;
  const transitionOkay = typeof document.startViewTransition === "function" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const open = () => {
    populateQuickDialog(key);
    if (transitionOkay) {
      document.querySelector(`[data-project-media="${key}"]`)?.style.removeProperty("view-transition-name");
      document.querySelector(`[data-project-title="${key}"]`)?.style.removeProperty("view-transition-name");
      quickDialog.querySelector("[data-quick-image]")?.style.setProperty("view-transition-name", "quick-look-image");
      quickDialog.querySelector("[data-quick-title]")?.style.setProperty("view-transition-name", "quick-look-title");
    }
    quickDialog.showModal();
    quickDialog.focus();
  };
  if (transitionOkay) {
    setQuickTransitionNames(key, true);
    try { document.startViewTransition(open); } catch { open(); }
  } else open();
};
const closeQuickDialog = () => {
  if (!quickDialog?.open) return;
  quickDialog.close();
};
document.querySelectorAll("[data-project]").forEach((trigger) => trigger.addEventListener("click", (event) => {
  event.preventDefault();
  openQuickDialog(trigger.dataset.project, trigger);
}));
document.querySelector("[data-quick-close]")?.addEventListener("click", closeQuickDialog);
quickDialog?.addEventListener("click", (event) => { if (event.target === quickDialog) closeQuickDialog(); });
quickDialog?.addEventListener("close", () => {
  setQuickTransitionNames(null, false);
  quickTrigger?.focus();
  quickTrigger = null;
});

const destinations = [
  { name: "Lobster Chat", detail: "Private family AI workspace", url: "https://chat.jpop.cloud", tags: "chat private voice files" },
  { name: "Sean", detail: "Personal agent & build partner", url: "https://sean.jpop.cloud", tags: "lobster agent coworker" },
  { name: "Claw Four", detail: "Multiplayer game room", url: "https://games.jpop.cloud", tags: "game play" },
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
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    requestAnimationFrame(() => input?.focus());
  }
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
