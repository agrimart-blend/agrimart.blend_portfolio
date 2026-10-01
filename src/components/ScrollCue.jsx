export default function ScrollCue({ href, eyebrow = "NEXT", label }) {
  return (
    <a
      className="portfolio-scroll-cue"
      href={href}
      onClick={(event) => {
        event.preventDefault();
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }}
    >
      <svg viewBox="0 0 32 40" aria-hidden="true" focusable="false">
        <path d="M16 2v27M6 20l10 10 10-10" />
      </svg>
      <span><small>{eyebrow}</small><strong>{label}</strong></span>
    </a>
  );
}
