let frame = 0;
const cancelScroll = () => cancelAnimationFrame(frame);
window.addEventListener("wheel", cancelScroll, { passive: true });
window.addEventListener("touchstart", cancelScroll, { passive: true });
window.addEventListener("keydown", cancelScroll);
document.querySelector("[data-top]")?.addEventListener("click", () => {
  cancelScroll();
  document
    .querySelector<HTMLAnchorElement>(".brand")
    ?.focus({ preventScroll: true });
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }
  const from = window.scrollY;
  const started = performance.now();
  function step(now: number) {
    const progress = Math.min((now - started) / 650, 1);
    const eased =
      progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
    window.scrollTo({ top: from * (1 - eased), behavior: "instant" });
    if (progress < 1) frame = requestAnimationFrame(step);
  }
  frame = requestAnimationFrame(step);
});

export {};
