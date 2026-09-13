import { useEffect, useState } from "react";
import "./PageReveal.css";

/**
 * Simple iris-wipe intro: logo fades in, holds briefly, then the whole
 * overlay closes inward via a single clip-path transition. Pure CSS
 * transitions on transform/opacity/clip-path only — no per-frame JS,
 * no timeline library — so it stays smooth even on low-end devices.
 */
export default function PageReveal({ onComplete }) {
  const [stage, setStage] = useState("mount"); // mount -> shown -> exit

  useEffect(() => {
    const raf = requestAnimationFrame(() => setStage("shown"));
    const exitTimer = setTimeout(() => setStage("exit"), 750);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <div
      className={`pr-overlay${stage === "exit" ? " pr-exit" : ""}`}
      onTransitionEnd={e => {
        if (e.propertyName === "clip-path") onComplete?.();
      }}
    >
      <div className={`pr-logo${stage !== "mount" ? " pr-visible" : ""}${stage === "exit" ? " pr-exit" : ""}`}>
        <span className="pr-ring" />
        <div className="pr-logo-name">
          <span className="pr-logo-main">AGRIMART</span>
          <span className="pr-logo-accent">.BLEND</span>
        </div>
        <div className="pr-tag">3D · UE5 · PHOTOSHOP</div>
      </div>
    </div>
  );
}
