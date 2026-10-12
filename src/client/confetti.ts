export function celebrate() {
  if (
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !Element.prototype.animate
  )
    return;
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.className = "celebration";
  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "100",
    overflow: "hidden",
  });
  document.body.append(layer);
  const colors = ["#2563eb", "#93c5fd", "#172b50", "#dbeafe"];
  for (let i = 0; i < 48; i++) {
    const piece = document.createElement("span");
    Object.assign(piece.style, {
      position: "absolute",
      left: "50%",
      top: "38%",
      width: "7px",
      height: "12px",
      background: colors[i % colors.length],
      borderRadius: "2px",
    });
    layer.append(piece);
    const x = (Math.random() - 0.5) * Math.min(innerWidth, 850);
    piece.animate(
      [
        { transform: "translate(0,0) rotate(0)", opacity: 0 },
        {
          transform: `translate(${x * 0.5}px,-100px) rotate(160deg)`,
          opacity: 1,
          offset: 0.25,
        },
        {
          transform: `translate(${x}px,${innerHeight * 0.65}px) rotate(640deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1500 + Math.random() * 600,
        delay: Math.random() * 100,
        easing: "ease-out",
        fill: "both",
      },
    );
  }
  setTimeout(() => layer.remove(), 2300);
}
