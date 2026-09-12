import { useEffect, useRef } from "react";

const POOL = ".:!@#$%^&*+=-ABCDEFabcdef0123456789";

export default function ScrambledText({
  children,
  radius = 90,
  className = "",
  style = {},
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const p = el.querySelector("p");
    if (!p) return;

    const original = p.textContent;
    // Split into char spans
    p.innerHTML = original.split("").map((c, i) =>
      `<span data-c="${c}" style="display:inline-block">${c}</span>`
    ).join("");

    const spans = Array.from(p.querySelectorAll("span"));
    const active = new Map();

    const onMove = (e) => {
      spans.forEach(s => {
        if (s.dataset.c === " ") return;
        const rect = s.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const d  = Math.hypot(e.clientX - cx, e.clientY - cy);

        if (d < radius && !active.has(s)) {
          let n = 0;
          const id = setInterval(() => {
            s.textContent = POOL[Math.floor(Math.random() * POOL.length)];
            n++;
            if (n >= 8) {
              clearInterval(id);
              s.textContent = s.dataset.c;
              active.delete(s);
            }
          }, 45);
          active.set(s, id);
        }
      });
    };

    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      active.forEach(id => clearInterval(id));
    };
  }, [radius, children]);

  return (
    <div ref={rootRef} className={`scrambled-root ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
}
