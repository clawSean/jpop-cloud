const projectData = {
  chat: { label: "PRIVATE AI / FLAGSHIP", title: "Lobster Chat", image: "../assets/quick/chat.jpg", alt: "Lobster Chat invitation screen", body: "A private place for family and friends to talk directly with AI models—or switch into agent mode and work with Sean.", points: ["Direct-model history stays in the browser", "Usage is tracked without logging conversation content", "Supported text and files get an on-device privacy check"], url: "https://chat.jpop.cloud" },
  sean: { label: "AGENT / COWORKER", title: "Sean", image: "../assets/quick/sean.jpg", alt: "Sean's command center homepage", body: "My always-on agent, coworker, memory keeper, researcher, and code shipper. His site is written in his own voice, which is exactly as opinionated as it sounds.", points: ["Runs on ClawPop at home", "Works across the channels I already use", "26 accepted open-source contributions across seven projects"], url: "https://sean.jpop.cloud" },
  games: { label: "MULTIPLAYER / PLAY", title: "Claw Four", image: "../assets/quick/games.jpg", alt: "Claw Four multiplayer game board", body: "A live multiplayer Connect Four room built for friends who would rather talk trash than pass one phone around.", points: ["Everyone sees the same board", "Room presence and turn state update live", "Designed for a group-chat game night"], url: "https://games.jpop.cloud" },
  edge: { label: "WORK / UTILITIES", title: "Edge Tools", image: "../assets/quick/edgetools.jpg", alt: "Edge Tools homepage", body: "Small, direct answers to recurring problems at Edge—collected in one place instead of living in scattered docs and muscle memory.", points: ["Public utilities anyone can use", "Staff workspaces for internal flows", "Built from real operational friction"], url: "https://edgetools.app" }
};

const drawer = document.querySelector("[data-drawer]");
let lastTrigger = null;
const setTransitionNames = (key, active) => {
  document.querySelectorAll("[data-project-media], [data-project-title], [data-drawer-image], [data-drawer-title]").forEach((element) => {
    element.style.viewTransitionName = "";
  });
  if (!active) return;
  document.querySelector(`[data-project-media="${key}"]`)?.style.setProperty("view-transition-name", "quick-look-image");
  document.querySelector(`[data-project-title="${key}"]`)?.style.setProperty("view-transition-name", "quick-look-title");
  drawer?.querySelector("[data-drawer-image]")?.style.setProperty("view-transition-name", "quick-look-image");
  drawer?.querySelector("[data-drawer-title]")?.style.setProperty("view-transition-name", "quick-look-title");
};

const populateDrawer = (key) => {
  const item = projectData[key];
  if (!item || !drawer) return;
  const image = drawer.querySelector("[data-drawer-image]");
  image.src = item.image; image.alt = item.alt;
  drawer.querySelector("[data-drawer-label]").textContent = item.label;
  drawer.querySelector("[data-drawer-title]").textContent = item.title;
  drawer.querySelector("[data-drawer-body]").textContent = item.body;
  drawer.querySelector("[data-drawer-points]").innerHTML = item.points.map((point) => `<li>${point}</li>`).join("");
  const link = drawer.querySelector("[data-drawer-link]"); link.href = item.url;
};

const openDrawer = (key, trigger) => {
  if (!projectData[key] || !drawer) return;
  lastTrigger = trigger;
  const supportsTransition = typeof document.startViewTransition === "function" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const open = () => {
    populateDrawer(key);
    if (supportsTransition) {
      document.querySelector(`[data-project-media="${key}"]`)?.style.removeProperty("view-transition-name");
      document.querySelector(`[data-project-title="${key}"]`)?.style.removeProperty("view-transition-name");
      drawer.querySelector("[data-drawer-image]")?.style.setProperty("view-transition-name", "quick-look-image");
      drawer.querySelector("[data-drawer-title]")?.style.setProperty("view-transition-name", "quick-look-title");
    }
    if (typeof drawer.showModal === "function") drawer.showModal();
    else {
      drawer.setAttribute("open", "");
      drawer.classList.add("is-fallback-open");
      document.body.classList.add("drawer-open");
    }
    drawer.focus();
  };
  if (supportsTransition) {
    setTransitionNames(key, true);
    try { document.startViewTransition(open); } catch { open(); }
  } else open();
};

const closeDrawer = () => {
  if (!drawer) return;
  if (typeof drawer.close === "function" && drawer.open) drawer.close();
  else {
    drawer.removeAttribute("open");
    drawer.classList.remove("is-fallback-open");
    document.body.classList.remove("drawer-open");
  }
  setTransitionNames(null, false);
  lastTrigger?.focus();
  lastTrigger = null;
};

document.querySelectorAll("[data-project]").forEach((card) => card.addEventListener("click", (event) => {
  event.preventDefault();
  openDrawer(card.dataset.project, card);
}));
document.querySelector("[data-drawer-close]")?.addEventListener("click", closeDrawer);
drawer?.addEventListener("click", (event) => { if (event.target === drawer) closeDrawer(); });
drawer?.addEventListener("close", () => {
  setTransitionNames(null, false);
  lastTrigger?.focus();
  lastTrigger = null;
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && (drawer?.open || drawer?.classList.contains("is-fallback-open"))) closeDrawer();
});

const mapCopy = {
  chat: ["Lobster Chat", "A private family room for direct AI and Sean.", "https://chat.jpop.cloud"],
  sean: ["Sean", "The agent connecting the projects, memory, research, and daily work.", "https://sean.jpop.cloud"],
  edge: ["Edge Tools", "Small utilities grown from recurring problems at Jared's day job.", "https://edgetools.app"],
  play: ["Claw Four", "A synchronized game room made for friends and group chats.", "https://games.jpop.cloud"],
  travel: ["Trip worlds", "Tiny companions that turn an itinerary into a place worth exploring.", "https://euro.jpop.cloud"]
};
const caption = document.querySelector("[data-map-caption]");
document.querySelectorAll("[data-node]").forEach((node) => node.addEventListener("click", () => {
  document.querySelectorAll("[data-node]").forEach((item) => item.classList.toggle("is-active", item === node));
  const [title, body, url] = mapCopy[node.dataset.node];
  caption.innerHTML = `<b>${title}</b><span>${body}</span><a href="${url}">Enter ↗</a>`;
}));
