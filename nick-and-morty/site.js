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

const cable = document.querySelector("[data-cable]");
const channelNodes = [...document.querySelectorAll("[data-entity]")];
const channelCode = document.querySelector("[data-channel-code]");
const channelName = document.querySelector("[data-channel-name]");
const channelRole = document.querySelector("[data-channel-role]");
const channelCopy = document.querySelector("[data-channel-copy]");
const channelLink = document.querySelector("[data-channel-link]");
const flowButtons = [...document.querySelectorAll("[data-flow]")];
const flowStatus = document.querySelector("[data-flow-status]");
let discoveryTimer;

const finishDiscovery = () => {
  cable?.classList.add("is-discovered");
  cable?.classList.remove("is-inviting");
  if (discoveryTimer) window.clearTimeout(discoveryTimer);
};

if (cable && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  discoveryTimer = window.setTimeout(() => cable.classList.add("is-inviting"), 3000);
}

const channels = {
  nick: {
    code: "CH 01",
    name: "Nick",
    role: "HUMAN OPERATOR / SYSTEM BUILDER",
    copy: "The builder who sets direction, draws the boundaries, pressure-tests the strange parts, and decides what earns the right to ship.",
    href: "#nick"
  },
  morty: {
    code: "CH 02",
    name: "Morty",
    role: "PRIMARY AGENT / ORCHESTRATOR",
    copy: "The always-on collaborator at the center of the system: carrying context, routing work, and turning the cast into one operating model.",
    href: "#morty"
  },
  summer: {
    code: "CH 03",
    name: "Summer",
    role: "SCOPED SHARED ACCESS",
    copy: "A friendlier front door with less access and less trust: useful to family and friends without handing over Morty’s whole world.",
    href: "#summer"
  },
  beth: {
    code: "CH 04",
    name: "Beth",
    role: "INDEPENDENT RECOVERY / DOCTOR",
    copy: "The break-glass doctor kept separate enough to diagnose and recover the primary stack when Morty cannot rescue himself.",
    href: "#beth"
  },
  jerry: {
    code: "CH 05",
    name: "Jerry",
    role: "SANDBOX / TEST SUBJECT",
    copy: "The safe place for risky changes to face-plant before they reach the real operation. The joke is mean; the blast-radius control is sound.",
    href: "#jerry"
  },
  meeseeks: {
    code: "CH 06",
    name: "Mr. Meeseeks",
    role: "EPHEMERAL WORKER / SUBAGENT",
    copy: "Spawned for one bounded job, expected to return a result, and designed to disappear instead of becoming permanent infrastructure.",
    href: "#meeseeks"
  },
  birdperson: {
    code: "CH 07",
    name: "Birdperson",
    role: "SECURITY / THREAT RESPONSE",
    copy: "The independent sentinel: deterministic checks and response paths that protect Morty without letting model confidence become authority.",
    href: "#birdperson"
  },
  citadel: {
    code: "CH 08",
    name: "The Citadel",
    role: "MULTIVERSE REVIEW / SYNTHESIS",
    copy: "A task-shaped council of competing perspectives. The panel can argue; Morty still has to synthesize one decision that survives the portal.",
    href: "#citadel"
  }
};

const flows = {
  build: ["BUILD", "Nick directs Morty, Morty spawns Meeseeks, and the result returns before the worker disappears."],
  test: ["TEST", "Morty sends the risky change through Jerry’s sandbox before anything reaches the real operation."],
  guard: ["GUARD", "Birdperson inspects the threat surface and returns bounded security judgment to Morty."],
  recover: ["RECOVER", "When Morty cannot rescue himself, Beth stays independent enough to diagnose and restore the stack."],
  review: ["REVIEW", "Morty convenes the Citadel, gathers competing views, and carries one synthesized decision back out."]
};

const tuneChannel = (entity) => {
  const channel = channels[entity];
  if (!cable || !channel) return;
  cable.dataset.activeEntity = entity;
  channelNodes.forEach((node) => {
    const selected = node.dataset.entity === entity;
    node.classList.toggle("is-selected", selected);
    if (selected) node.setAttribute("aria-current", "true");
    else node.removeAttribute("aria-current");
  });
  channelCode.textContent = channel.code;
  channelName.textContent = channel.name;
  channelRole.textContent = channel.role;
  channelCopy.textContent = channel.copy;
  channelLink.href = channel.href;
  channelLink.replaceChildren(document.createTextNode(`Open ${channel.name}’s casefile `));
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↓";
  channelLink.append(arrow);
};

channelNodes.forEach((node) => {
  node.addEventListener("focus", () => {
    finishDiscovery();
    tuneChannel(node.dataset.entity);
  });
  node.addEventListener("mouseenter", () => {
    finishDiscovery();
    tuneChannel(node.dataset.entity);
  });
  node.addEventListener("click", (event) => {
    event.preventDefault();
    finishDiscovery();
    tuneChannel(node.dataset.entity);
  });
});

flowButtons.forEach((button) => button.addEventListener("click", () => {
  const flow = button.dataset.flow;
  const message = flows[flow];
  if (!cable || !message) return;
  cable.dataset.activeFlow = flow;
  flowButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  const label = document.createElement("b");
  label.textContent = message[0];
  flowStatus.replaceChildren(label, document.createTextNode(` ${message[1]}`));
}));

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
