import "../styles/scroll-cue.css";

export default function ScrollCue({ href, current, eyebrow = "SCROLL NEXT", label }) {
  return (
    <a
      className="portfolio-scroll-cue"
      href={href}
      aria-label={`${current ? `Currently viewing ${current}. ` : ""}${label}`}
      onClick={(event) => {
        event.preventDefault();
        if (href.startsWith("#/")) {
          window.location.hash = href;
          return;
        }
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
      }}
    >
      <svg viewBox="0 0 42 46" aria-hidden="true" focusable="false">
        <path d="M21 2v32M9 23l12 12 12-12" />
      </svg>
      <span>
        <small>{current ? `NOW VIEWING · ${current}` : eyebrow}</small>
        <strong>{label}</strong>
      </span>
    </a>
  );
}
