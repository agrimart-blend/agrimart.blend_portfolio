import { useCallback, useEffect, useRef, useState } from "react";

export default function RenderGallery({ chapters }) {
  const all = chapters.flatMap(c => c.items.map(it => ({ ...it, tool: c.tool })));
  const [open, setOpen] = useState(-1);
  const rootRef = useRef(null);

  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback(d => setOpen(i => (i + d + all.length) % all.length), [all.length]);

  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    rootRef.current?.querySelectorAll(".r3d-item").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open < 0) return;
    const onKey = e => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  let n = 0;
  const cur = all[open];

  return (
    <div ref={rootRef} className="r3d">
      {chapters.map((c, ci) => (
        <section key={c.tool} className="r3d-chapter">
          <header className="r3d-chapter-head">
            <span className="r3d-chapter-num">{String(ci + 1).padStart(2, "0")}</span>
            <h2 className="r3d-chapter-title">{c.tool}</h2>
            <span className="r3d-chapter-meta">{c.meta}</span>
          </header>

          <div className={c.layout === "solo" ? "r3d-solo" : "r3d-grid"}>
            {c.items.map(it => {
              const idx = n++;
              return (
                <button
                  key={it.src}
                  type="button"
                  className={`r3d-item ${it.size || ""}`}
                  style={{ transitionDelay: `${(idx % 4) * 70}ms`, "--zoom": it.zoom || 1 }}
                  onClick={() => setOpen(idx)}
                  aria-label={`Open ${it.title}`}
                >
                  <img src={it.src} alt={it.title} loading="lazy" />
                  <span className="r3d-idx">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="r3d-cap">
                    <span className="r3d-cap-tag">{it.tag}</span>
                    <span className="r3d-cap-title">{it.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      {cur && (
        <div className="r3d-lightbox" role="dialog" aria-modal="true" aria-label={cur.title} onClick={close}>
          <figure className="r3d-lb-fig" onClick={e => e.stopPropagation()}>
            <img src={cur.src} alt={cur.title} />
            <figcaption className="r3d-lb-cap">
              <span className="r3d-cap-tag">{cur.tool} · {cur.tag}</span>
              <span className="r3d-lb-title">{cur.title}</span>
              <span className="r3d-lb-count">{String(open + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}</span>
            </figcaption>
          </figure>
          <button type="button" className="r3d-lb-btn r3d-lb-prev" onClick={e => { e.stopPropagation(); step(-1); }} aria-label="Previous">&larr;</button>
          <button type="button" className="r3d-lb-btn r3d-lb-next" onClick={e => { e.stopPropagation(); step(1); }} aria-label="Next">&rarr;</button>
          <button type="button" className="r3d-lb-btn r3d-lb-close" onClick={close} aria-label="Close">&times;</button>
        </div>
      )}
    </div>
  );
}
