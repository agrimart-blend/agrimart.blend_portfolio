import { useEffect } from "react";

const FEATURES = [
  { t: "Build Barricades", d: "Place walls in real time to block your opponent's path." },
  { t: "Outsmart Rivals",  d: "Strategy is the key — think several moves ahead of the bot or a real player." },
  { t: "Compete & Rise",   d: "Ranked matchmaking with a live ladder to climb." },
  { t: "Multiple Modes",   d: "Ranked, casual, private party matches, and practice vs. bot." },
  { t: "Customize",        d: "Unlock dots, ID bars and barricade skins from the in-game shop." },
  { t: "Social & Fair Play", d: "Friends, live chat, and a full report/block system to keep matches clean." },
];

const SHOTS = [
  { src: "/wallfall/shot-1.webp", alt: "Wallfall Barricade gameplay — building a wall in a 1v1 match" },
  { src: "/wallfall/shot-2.webp", alt: "Wallfall Barricade gameplay — two players closing in on each other" },
  { src: "/wallfall/shot-3.webp", alt: "Wallfall Barricade main menu — ranked, casual, party and practice modes" },
  { src: "/wallfall/shot-4.webp", alt: "Wallfall Barricade party screen — friends list and live chat" },
  { src: "/wallfall/shot-5.webp", alt: "Wallfall Barricade win screen with match rewards" },
];

export default function WallfallProject() {
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".wf-reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main id="wallfall-main" className="wallfall-page">
      <a href="#hero" className="wf-back">&larr; Back to Portfolio</a>

      <section className="wf-hero">
        <img src="/wallfall/hero.webp" alt="" className="wf-hero-bg" />
        <div className="wf-hero-gradient" />
        <div className="wf-hero-content">
          <span className="wf-hero-badge">DOE Studio &middot; Android &middot; Free to Play</span>
          <h1 className="wf-hero-title">Wallfall<br />Barricade</h1>
          <p className="wf-hero-tagline">Build &middot; Block &middot; Outsmart &middot; Win</p>
          <div className="wf-hero-ctas">
            <a
              href="https://play.google.com/store/apps/details?id=com.agrimkaushal.wallfall"
              target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-primary"
            >
              Get it on Google Play &#8599;
            </a>
            <a
              href="https://agrimart-blend.github.io/kamrion-website/"
              target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-outline"
            >
              Visit DOE Studio &#8599;
            </a>
          </div>
        </div>
      </section>

      <section className="wf-meta wf-reveal">
        {[
          ["Role", "Artist & Developer"],
          ["Studio", "DOE Studio"],
          ["Platform", "Android"],
          ["Genre", "1v1 Tactical Strategy"],
        ].map(([k, v]) => (
          <div key={k} className="wf-meta-item">
            <span className="wf-meta-k">{k}</span>
            <span className="wf-meta-v">{v}</span>
          </div>
        ))}
      </section>

      <section className="wf-section">
        <div className="section-label wf-reveal">Overview</div>
        <p className="wf-overview wf-reveal">
          Wallfall Barricade is a fast, tactical 1v1 board game: two players race across a
          shared grid, dropping barricades to wall off the opponent while pushing toward the
          opposite edge first. Every round comes down to reading your rival's path and cutting
          it off before they cut off yours. It ships with ranked and casual matchmaking, private
          party matches with in-app chat, a practice mode against an AI opponent, and a
          full customization shop for dots, ID bars and barricade styles &mdash; alongside
          friend lists, reporting and blocking to keep matches fair.
        </p>
      </section>

      <section className="wf-section">
        <div className="section-label wf-reveal">Features</div>
        <div className="wf-features">
          {FEATURES.map((f, i) => (
            <div key={f.t} className={`wf-feature wf-reveal wf-reveal-d${i % 3}`}>
              <span className="wf-feature-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="wf-feature-t">{f.t}</h3>
              <p className="wf-feature-d">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wf-section">
        <div className="section-label wf-reveal">Screenshots</div>
        <div className="wf-gallery">
          {SHOTS.map((s, i) => (
            <div key={s.src} className={`wf-shot wf-reveal wf-reveal-d${i % 3}`}>
              <img src={s.src} alt={s.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <section className="wf-studio wf-reveal">
        <img src="/wallfall/doe-logo.webp" alt="DOE Studio logo" className="wf-studio-logo" />
        <div className="wf-studio-body">
          <h3 className="wf-studio-title">Made at DOE Studio</h3>
          <p className="wf-studio-desc">
            DOE Studio is the independent game studio behind Wallfall &mdash; built with a
            focus on tight competitive gameplay and a polished player experience.
          </p>
          <a
            href="https://agrimart-blend.github.io/kamrion-website/"
            target="_blank" rel="noopener noreferrer" className="wf-studio-link"
          >
            agrimart-blend.github.io/kamrion-website &#8599;
          </a>
        </div>
      </section>

      <div className="wf-footer-nav">
        <a href="#hero" className="wf-btn wf-btn-outline">&larr; Back to Portfolio</a>
      </div>
    </main>
  );
}
