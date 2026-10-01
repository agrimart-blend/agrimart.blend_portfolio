import { useEffect, useState } from "react";
import "../styles/scroll-guide.css";

const clean = (value) => (value || "").replace(/\s+/g, " ").trim();
const visibleText = (element) => element?.innerText || element?.textContent || "";

function getLabel(element) {
  if (element.dataset.scrollGuide) return clean(element.dataset.scrollGuide);

  const labelledBy = element.getAttribute("aria-labelledby");
  if (labelledBy) {
    const label = labelledBy.split(/\s+/)
      .map((id) => visibleText(document.getElementById(id)))
      .filter(Boolean)
      .join(" ");
    if (label) return clean(label);
  }

  if (element.getAttribute("aria-label")) return clean(element.getAttribute("aria-label"));

  const heading = element.querySelector("h1, h2, h3");
  if (visibleText(heading)) return clean(visibleText(heading));

  const eyebrow = element.querySelector(".section-label, .wf-eyebrow, .fd-kicker");
  if (visibleText(eyebrow)) return clean(visibleText(eyebrow));

  return element.tagName === "FOOTER" ? "Portfolio footer" : "Next section";
}

export default function ScrollGuide({ route }) {
  const [steps, setSteps] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let observer;
    let frame = 0;
    const findSteps = () => {
      const page = document.querySelector("main") || document.querySelector(".games-section");
      if (!page) return;

      const elements = [
        ...(page.matches("section, footer, [data-scroll-guide]") ? [page] : []),
        ...page.querySelectorAll("section, footer, [data-scroll-guide]")
      ]
        .filter((element) => {
          if (element.matches("section, footer")) {
            return Boolean(element.dataset.scrollGuide || element.getAttribute("aria-label") || element.querySelector("h1, h2, h3, .section-label, .wf-eyebrow, .fd-kicker"));
          }
          return true;
        })
        .sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

      const unique = [...new Set(elements)];
      const nextSteps = unique.map((element) => ({ element, label: getLabel(element) }));
      setSteps(nextSteps);
      setActive(0);

      observer?.disconnect();
      const guideLine = Math.round(window.innerHeight * 0.44);
      const guideBand = Math.max(1, window.innerHeight - guideLine - 1);
      observer = new IntersectionObserver(() => {
        let current = 0;
        nextSteps.forEach((step, index) => {
          if (step.element.getBoundingClientRect().top <= guideLine) current = index;
        });
        setActive(current);
      }, { rootMargin: `-${guideLine}px 0px -${guideBand}px 0px`, threshold: 0 });
      nextSteps.forEach(({ element }) => observer.observe(element));

      let current = 0;
      nextSteps.forEach((step, index) => {
        if (step.element.getBoundingClientRect().top <= guideLine) current = index;
      });
      setActive(current);
    };

    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(findSteps);
    });
    window.addEventListener("resize", findSteps);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", findSteps);
      observer?.disconnect();
    };
  }, [route]);

  if (!steps.length) return null;

  const nextIndex = active + 1;
  const atEnd = nextIndex >= steps.length;
  const destination = atEnd ? null : steps[nextIndex];
  const label = destination?.label || "Back to top";

  const goToNext = () => {
    if (destination) {
      destination.element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      className="scroll-guide"
      type="button"
      onClick={goToNext}
      aria-label={atEnd ? "End of page. Scroll back to top" : `Scroll to next section: ${label}`}
      title={atEnd ? "Back to top" : `Next: ${label}`}
    >
      <svg className={atEnd ? "is-up" : ""} viewBox="0 0 12 9" aria-hidden="true">
        <path d="m1.5 1.5 4.5 5 4.5-5" />
      </svg>
      <span className="scroll-guide-copy">
        <small>{atEnd ? "PAGE START" : "WHAT'S BELOW"}</small>
        <strong>{atEnd ? "Back to top" : label}</strong>
      </span>
    </button>
  );
}
