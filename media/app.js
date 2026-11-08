const shelves = document.querySelector("[data-media-grid]");
const filters = [...document.querySelectorAll("[data-filter]")];
const status = document.querySelector("[data-result-status]");
const emptyState = document.querySelector("[data-empty-state]");
const dialog = document.querySelector("[data-media-dialog]");
const kinds = { audio: "Audio", video: "Video", image: "Image", poster: "Poster" };
const validKinds = new Set(Object.keys(kinds));
let items = [];
let collections = [];
let activeFilter = "all";
let activeItem = null;
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
const collectionForSlug = (slug) => collections.find((collection) => collection.slug === slug);

const makeCard = (item, index) => {
  const article = element("article", `media-card media-card-${item.kind}`);
  article.style.setProperty("--card-index", index);
  const button = element("button", "media-card-button");
  button.type = "button";
  button.dataset.open = item.slug;
  button.setAttribute("aria-label", `Open ${item.title}`);

  const art = element("span", "media-card-art");
  if (item.fit === "cover" || item.kind === "audio" || item.kind === "video") {
    art.classList.add("is-cover");
  }
  const image = new Image();
  image.src = item.thumbnail || item.poster || item.src;
  image.alt = item.alt || "";
  image.loading = "lazy";
  image.width = 384;
  image.height = 512;
  art.append(image);
  if (item.kind === "audio" || item.kind === "video") {
    art.append(element("span", "play-mark", "▶"));
  }

  const top = element("span", "media-card-top");
  top.append(element("small", "", kinds[item.kind]));
  top.append(element("b", "", "OPEN ↗"));

  const copy = element("span", "media-card-copy");
  copy.append(element("strong", "", item.title));
  const collection = collectionForSlug(item.collection);
  copy.append(element("span", "", collection?.title || "Stand-alone asset"));

  button.append(art, top, copy);
  article.append(button);
  return article;
};

const makeShelf = (collection, shelfItems, indexOffset) => {
  const section = element("section", "collection-shelf");
  const slug = collection?.slug || "standalone";
  section.id = `collection-${slug}`;
  const header = element("header", "collection-head");
  const titleWrap = element("div");
  titleWrap.append(
    element("p", "eyebrow", collection ? "COLLECTION" : "STAND-ALONE ASSETS"),
    element("h3", "", collection?.title || "Loose pieces")
  );
  const description = element(
    "p",
    "",
    collection?.description || "Individual files that do not belong to a larger set."
  );
  const count = element("span", "collection-count", `${shelfItems.length} ASSET${shelfItems.length === 1 ? "" : "S"}`);
  header.append(titleWrap, description, count);

  const grid = element("div", "media-grid");
  grid.append(...shelfItems.map((item, index) => makeCard(item, index + indexOffset)));
  section.append(header, grid);
  return section;
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
  const groups = [];
  let indexOffset = 0;

  collections.forEach((collection) => {
    const collectionItems = visible.filter((item) => item.collection === collection.slug);
    if (!collectionItems.length) return;
    groups.push(makeShelf(collection, collectionItems, indexOffset));
    indexOffset += collectionItems.length;
  });

  const standalone = visible.filter((item) => !item.collection || !collectionForSlug(item.collection));
  if (standalone.length) groups.push(makeShelf(null, standalone, indexOffset));

  shelves.replaceChildren(...groups);
  emptyState.hidden = visible.length !== 0;
  shelves.hidden = visible.length === 0;
  const label = activeFilter === "all" ? "" : `${kinds[activeFilter].toLowerCase()} `;
  const visibleCollections = groups.length;
  status.textContent = visible.length
    ? `Showing ${visible.length} ${label}asset${visible.length === 1 ? "" : "s"} in ${visibleCollections} collection${visibleCollections === 1 ? "" : "s"}.`
    : `Showing ${label}0 assets.`;
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

const itemShareUrl = (item) => {
  const url = new URL(location.href);
  url.hash = item.slug;
  return url.href;
};

const openItem = (item, trigger, { updateHash = true } = {}) => {
  if (!dialog || !item) return;
  activeItem = item;
  activeTrigger = trigger || document.querySelector(`[data-open="${CSS.escape(item.slug)}"]`);
  dialog.querySelector("[data-dialog-player]").replaceChildren(mediaNode(item));
  setDialogField("[data-dialog-kind]", `${kinds[item.kind]} / ${item.date.slice(0, 4)}`);
  setDialogField("[data-dialog-title]", item.title);
  setDialogField("[data-dialog-description]", item.description);
  setDialogField("[data-dialog-date]", formatDate(item.date));
  setDialogField("[data-dialog-credit]", item.credit || "JPop Media Room");
  setDialogField("[data-dialog-collection]", collectionForSlug(item.collection)?.title || "Stand-alone");
  setDialogField("[data-share-status]", "");
  const source = dialog.querySelector("[data-dialog-source]");
  source.href = item.src;
  source.download = item.src.split("/").pop() || item.slug;
  source.firstChild.textContent = item.kind === "audio" || item.kind === "video" ? "Download media " : "Download file ";
  dialog.showModal();
  if (updateHash) history.replaceState(null, "", `#${item.slug}`);
};

const closeDialog = () => {
  if (!dialog?.open) return;
  dialog.querySelectorAll("audio, video").forEach((media) => media.pause());
  dialog.close();
};

const shareActiveItem = async () => {
  if (!activeItem) return;
  const url = itemShareUrl(activeItem);
  try {
    if (navigator.share) {
      await navigator.share({ title: `${activeItem.title} — JPop Media Room`, text: activeItem.description, url });
      setDialogField("[data-share-status]", "Shared.");
      return;
    }
    await navigator.clipboard.writeText(url);
    setDialogField("[data-share-status]", "Share link copied.");
  } catch (error) {
    if (error.name !== "AbortError") {
      setDialogField("[data-share-status]", "Could not share automatically. Copy the URL from the address bar.");
    }
  }
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

const setFeaturedCollection = (collection) => {
  if (!collection) return;
  const collectionItems = collection.itemSlugs
    .map(itemForSlug)
    .filter(Boolean);
  document.querySelector("[data-featured-title]").textContent = collection.title;
  document.querySelector("[data-featured-description]").textContent = collection.description;
  document.querySelector("[data-featured-count]").textContent = collectionItems.length;
  const preview = document.querySelector("[data-featured-assets]");
  const buttons = collectionItems.map((item) => {
    const button = element("button", "preview-asset");
    button.type = "button";
    button.dataset.open = item.slug;
    button.setAttribute("aria-label", `Open ${item.title}`);
    const image = new Image();
    image.src = item.thumbnail || item.src;
    image.alt = "";
    image.width = 384;
    image.height = 512;
    const name = element("span", "", item.title);
    button.append(image, name);
    return button;
  });
  preview.replaceChildren(...buttons);
};

document.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-open]");
  if (opener) openItem(itemForSlug(opener.dataset.open), opener);
});

filters.forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));
document.querySelector("[data-show-all]")?.addEventListener("click", () => setFilter("all"));
document.querySelector("[data-dialog-close]")?.addEventListener("click", closeDialog);
document.querySelector("[data-dialog-share]")?.addEventListener("click", shareActiveItem);
dialog?.addEventListener("click", (event) => { if (event.target === dialog) closeDialog(); });
dialog?.addEventListener("close", () => {
  history.replaceState(null, "", `${location.pathname}${location.search}`);
  activeTrigger?.focus();
  activeItem = null;
  activeTrigger = null;
});
document.querySelector("[data-year]").textContent = new Date().getFullYear();

try {
  const response = await fetch("library.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`Library request failed: ${response.status}`);
  const payload = await response.json();
  if (!Array.isArray(payload.items) || !Array.isArray(payload.collections)) {
    throw new Error("Library items or collections are missing");
  }
  collections = payload.collections.filter((collection) => (
    collection.slug && collection.title && Array.isArray(collection.itemSlugs)
  ));
  items = payload.items
    .filter((item) => item.slug && item.title && validKinds.has(item.kind) && item.date && item.src)
    .sort((a, b) => b.date.localeCompare(a.date));
  updateCounts();
  render();
  setFeaturedCollection(collections[0]);
  const hashItem = itemForSlug(location.hash.slice(1));
  if (hashItem) requestAnimationFrame(() => openItem(hashItem, null, { updateHash: false }));
} catch (error) {
  console.error(error);
  shelves.hidden = true;
  emptyState.hidden = false;
  emptyState.querySelector("h3").textContent = "The signal dropped.";
  emptyState.querySelector("p").textContent = "The library could not load. Try again in a moment.";
  emptyState.querySelector("button").hidden = true;
  status.textContent = "The media library is temporarily unavailable.";
}
