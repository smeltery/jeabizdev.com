const dialog = document.querySelector<HTMLDialogElement>("#site-search")!;
const input = dialog.querySelector<HTMLInputElement>("#site-query")!;
const entries = [
  ...dialog.querySelectorAll<HTMLAnchorElement>("[data-search-entry]"),
];
const groups = [
  ...dialog.querySelectorAll<HTMLButtonElement>("[data-search-group]"),
];
const empty = dialog.querySelector<HTMLElement>("[data-search-empty]")!;
const count = dialog.querySelector<HTMLElement>("[data-search-count]")!;
let group = "All";
let returnFocus: HTMLElement | null = null;
function filter() {
  const words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  for (const entry of entries)
    entry.hidden =
      (group !== "All" && entry.dataset.group !== group) ||
      !words.every((word) => entry.dataset.text!.includes(word));
  const total = entries.filter((entry) => !entry.hidden).length;
  count.textContent = `${total} results`;
  empty.hidden = total > 0;
  groups.forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.searchGroup === group),
    ),
  );
}
function open() {
  if (dialog.open) return;
  returnFocus = document.activeElement as HTMLElement;
  const menu = document.querySelector<HTMLDialogElement>("#mobile-menu");
  if (menu?.open) {
    menu.close();
    returnFocus = document.querySelector(".menu-trigger");
  }
  dialog.showModal();
  input.focus();
  filter();
}
document
  .querySelectorAll("[data-search-open]")
  .forEach((button) => button.addEventListener("click", open));
dialog
  .querySelector("[data-search-close]")!
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => returnFocus?.focus());
input.addEventListener("input", filter);
groups.forEach((button) =>
  button.addEventListener("click", () => {
    group = button.dataset.searchGroup!;
    filter();
  }),
);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    dialog.open ? dialog.close() : open();
  }
});
dialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    dialog.close();
    return;
  }
  const visible = entries.filter((entry) => !entry.hidden);
  if (!visible.length) return;
  const active = visible.indexOf(document.activeElement as HTMLAnchorElement);
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const next =
      event.key === "ArrowDown"
        ? (active + 1) % visible.length
        : active < 0
          ? visible.length - 1
          : (active - 1 + visible.length) % visible.length;
    visible[next].focus();
  }
  if (event.key === "Enter" && document.activeElement === input) {
    event.preventDefault();
    visible[0].click();
  }
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    )
      dialog.close();
  }
});
