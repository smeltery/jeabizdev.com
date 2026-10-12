import { closeDialog } from "./dialog";
const menu = document.querySelector<HTMLDialogElement>("#mobile-menu")!;
const trigger = document.querySelector<HTMLButtonElement>(".menu-trigger")!;
trigger.addEventListener("click", () => {
  menu.showModal();
  trigger.setAttribute("aria-expanded", "true");
});
menu
  .querySelector("[data-menu-close]")!
  .addEventListener("click", () => void closeDialog(menu));
menu.addEventListener("close", () => {
  trigger.setAttribute("aria-expanded", "false");
  trigger.focus();
});
menu
  .querySelectorAll("a")
  .forEach((link) =>
    link.addEventListener("click", () => void closeDialog(menu)),
  );
matchMedia("(min-width: 1101px)").addEventListener("change", (event) => {
  if (event.matches && menu.open) void closeDialog(menu);
});
// Preserve inbound links from the previous single-page site.
const legacy: Record<string, string> = {
  services: "/services",
  "core-values": "/approach",
  results: "/transactions",
  "engagement-options": "/services#engagements",
  "available-assets": "/assets",
  "client-showcase": "/transactions",
  contact: "/contact",
};
if (location.pathname === "/" && legacy[location.hash.slice(1)])
  location.replace(legacy[location.hash.slice(1)]);
const resources = document.querySelector<HTMLDetailsElement>(".resource-menu");
document.addEventListener("click", (event) => {
  if (resources?.open && !resources.contains(event.target as Node))
    resources.open = false;
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resources?.open) {
    resources.open = false;
    resources.querySelector("summary")?.focus();
  }
});

resources?.querySelector("summary")?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    resources.open = true;
    resources.querySelector("a")?.focus();
  }
});
resources?.addEventListener("focusout", () => {
  requestAnimationFrame(() => {
    if (!resources.contains(document.activeElement)) resources.open = false;
  });
});
