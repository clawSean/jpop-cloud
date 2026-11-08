const grid = document.querySelector("[data-media-grid]");
const filters = [...document.querySelectorAll("[data-filter]")];
const status = document.querySelector("[data-result-status]");
const emptyState = document.querySelector("[data-empty-state]");
const dialog = document.querySelector("[data-media-dialog]");
const kinds = { audio: "Music", video: "Video", image: "Image", poster: "Poster" };
const validKinds = new Set(Object.keys(kinds));
let items = [];
let activeFilter = "all";
let activeTrigger = null;

const formatDate = (value) => new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
}).format(new Date(`${value}T12:00:00`));

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const itemForSlug = (slug) => items.find((item) => item.slug === slug);

const makeCard = (item, index) => {
  const article = element("article", `media-card media-card-${item.kind}`);
  article.style.setProperty("--card-index", index);
  const button = element("button", "media-card-button");
  button.type = "button";
  button.dataset.open = item.slug;
  button.setAttribute("aria-label", `Open ${item.title}`);

  const art = element("span", "media-card-art");
  const image = new Image();
  image.src = item.thumbnail || item.poster || item.src;
  image.alt = item.alt || "";
  image.loading = "lazy";
  image.width = 900;
  image.height = 560;
  art.append(image);
  if (item.kind === "audio" || item.kind === "video") {
    art.append(element("span", "play-mark", item.kind === "audio" ? "▶" : "▶"));
  }

  const top = element("span", "media-card-top");
  top.append(element("small", "", `${kinds[item.kind]} / ${item.date.slice(0, 4)}`));
  top.append(element("b", "", "OPEN ↗"));

  const copy = element("span", "media-card-copy");
  copy.append(element("strong", "", item.title));
  copy.append(element("span", "", item.description));

  button.append(art, top, copy);
  article.append(button);
  return article;
};

const updateCounts = () => {
  document.querySelectorAll("[data-count]").forEach((node) => {
    const kind = node.dataset.count;
    node.textContent = kind === "all" ? items.length : items.filter((item) => item.kind === kind).length;
  });
  document.querySelectorAll("[data-library-count]").forEach((node) => { node.textContent = items.length; });
};

const render = () => {
  const visible = activeFilter === "all" ? items : items.filter((item) => item.kind === activeFilter);
  grid.replaceChildren(...visible.map(makeCard));
  emptyState.hidden = visible.length !== 0;
  grid.hidden = visible.length === 0;
  const label = activeFilter === "all" ? "all" : kinds[activeFilter].toLowerCase();
  status.textContent = `Showing ${label} ${visible.length} piece${visible.length === 1 ? "" : "s"}.`;
};

const mediaNode = (item) => {
  if (item.kind === "audio") {
    const wrap = element("div", "audio-player");
    const cover = new Image();
    cover.src = item.poster || item.thumbnail;
    cover.alt = item.alt || "";
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "metadata";
    audio.src = item.src;
    wrap.append(cover, audio);
    return wrap;
  }
  if (item.kind === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    if (item.poster || item.thumbnail) video.poster = item.poster || item.thumbnail;
    video.src = item.src;
    return video;
  }
  const image = new Image();
  image.src = item.src;
  image.alt = item.alt || "";
  return image;
};

const setDialogField = (selector, value) => {
  const node = dialog?.querySelector(selector);
  if (node) node.textContent = value;
};

const openItem = (item, trigger, { updateHash = true } = {}) => {
  if (!dialog || !item) return;
  activeTrigger = trigger || document.querySelector(`[data-open="${CSS.escape(item.slug)}"]`);
  dialog.querySelector("[data-dialog-player]").replaceChildren(mediaNode(item));
  setDialogField("[data-dialog-kind]", `${kinds[item.kind]} / ${item.date.slice(0, 4)}`);
  setDialogField("[data-dialog-title]", item.title);
  setDialogField("[data-dialog-description]", item.description);
  setDialogField("[data-dialog-date]", formatDate(item.date));
  setDialogField("[data-dialog-credit]", item.credit || "JPop Media Room");
  const source = dialog.querySelector("[data-dialog-source]");
  source.href = item.src;
  source.firstChild.textContent = item.kind === "audio" || item.kind === "video" ? "Open the media file " : "Open full size ";
  dialog.showModal();
  if (updateHash) history.replaceState(null, "", `#${item.slug}`);
};

const closeDialog = () => {
  if (!dialog?.open) return;
  dialog.querySelectorAll("audio, video").forEach((media) => media.pause());
  dialog.close();
};

const setFilter = (filter) => {
  activeFilter = filter;
  filters.forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  render();
};

const setFeatured = (item) => {
  if (!item) return;
  const art = document.querySelector("[data-featured-art]");
  art.style.backgroundImage = `url("${item.thumbnail || item.poster || item.src}")`;
  document.querySelector("[data-featured-title]").textContent = item.title;
  document.querySelector("[data-featured-kind]").textContent = `${kinds[item.kind]} / ${item.date.slice(0, 4)}`;
  const button = document.querySelector("[data-featured-open]");
  button.dataset.open = item.slug;
  button.setAttribute("aria-label", `Open featured media: ${item.title}`);
};

document.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-open]");
  if (opener) openItem(itemForSlug(opener.dataset.open), opener);
});

filters.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));
document.querySelector("[data-show-all]")?.addEventListener("click", () => setFilter("all"));
document.querySelector("[data-dialog-close]")?.addEventListener("click", closeDialog);
dialog?.addEventListener("click", (event) => { if (event.target === dialog) closeDialog(); });
dialog?.addEventListener("close", () => {
  history.replaceState(null, "", `${location.pathname}${location.search}`);
  activeTrigger?.focus();
  activeTrigger = null;
});
document.querySelector("[data-year]").textContent = new Date().getFullYear();

try {
  const response = await fetch("library.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Library request failed: ${response.status}`);
  const payload = await response.json();
  if (!Array.isArray(payload.items)) throw new Error("Library items are missing");
  items = payload.items
    .filter((item) => item.slug && item.title && validKinds.has(item.kind) && item.date && item.src)
    .sort((a, b) => b.date.localeCompare(a.date));
  updateCounts();
  render();
  setFeatured(items.find((item) => item.featured) || items[0]);
  const hashItem = itemForSlug(location.hash.slice(1));
  if (hashItem) requestAnimationFrame(() => openItem(hashItem, null, { updateHash: false }));
} catch (error) {
  console.error(error);
  grid.hidden = true;
  emptyState.hidden = false;
  emptyState.querySelector("h3").textContent = "The signal dropped.";
  emptyState.querySelector("p").textContent = "The library could not load. Try again in a moment.";
  emptyState.querySelector("button").hidden = true;
  status.textContent = "The media library is temporarily unavailable.";
}
