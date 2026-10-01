import { useEffect } from "react";
import { asset } from "../lib/asset";
import ScrollCue from "../components/ScrollCue";

const FEATURES = [
  { t: "Play worldwide", d: "Meet opponents around the world in online matches and climb the ranked ladder." },
  { t: "Pick your match", d: "Choose ranked or casual play, invite friends to a private match, or practice against a bot." },
  { t: "Chat in real time", d: "Send live in-game messages and emoji reactions while the match unfolds." },
  { t: "Make friends", d: "Find and add people in game, then bring them into your next match." },
  { t: "Make it yours", d: "Unlock player markers, ID bars and barricade styles from the customization shop." },
  { t: "Play fair", d: "Report and block tools help players keep their matches comfortable and fair." },
];

const SHOTS = [
  { src: asset("wallfall/shot-1.webp"), alt: "Wallfall Barricade gameplay — building a wall in a 1v1 match" },
  { src: asset("wallfall/shot-2.webp"), alt: "Wallfall Barricade gameplay — two players closing in on each other" },
  { src: asset("wallfall/shot-3.webp"), alt: "Wallfall Barricade main menu — ranked, casual, party and practice modes" },
  { src: asset("wallfall/shot-4.webp"), alt: "Wallfall Barricade party screen — friends list and live chat" },
  { src: asset("wallfall/shot-5.webp"), alt: "Wallfall Barricade win screen with match rewards" },
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
        <img src={asset("wallfall/hero.webp")} alt="" className="wf-hero-bg" />
        <div className="wf-hero-gradient" />
        <div className="wf-hero-content">
          <span className="wf-hero-badge">DOE Studio &middot; Android &middot; Free to Play</span>
          <h1 className="wf-hero-title">Wallfall<br />Barricade</h1>
          <p className="wf-hero-tagline">Block routes. Outsmart a rival. Race to the far edge.</p>
          <div className="wf-hero-ctas">
            <a
              href="https://play.google.com/store/apps/details?id=com.agrimkaushal.wallfall"
              target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-primary"
            >
              Get it on Google Play <span className="wf-btn-icon" aria-hidden="true">&#8599;</span>
            </a>
            <a
              href="https://agrimart-blend.github.io/kamrion-website/"
              target="_blank" rel="noopener noreferrer" className="wf-btn wf-btn-outline"
            >
              Visit DOE Studio <span className="wf-btn-icon" aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </div>
        <ScrollCue href="#wallfall-meta" current="Wallfall Barricade" label="V · Scroll down to see how it plays" />
      </section>

      <section id="wallfall-meta" className="wf-meta wf-reveal">
        {[
          ["My role", "Game & Server Developer"],
          ["Online service", "Nakama · built by me"],
          ["Platform", "Android"],
          ["Play", "Online 1v1 · Bot practice"],
        ].map(([k, v]) => (
          <div key={k} className="wf-meta-item">
            <span className="wf-meta-k">{k}</span>
            <span className="wf-meta-v">{v}</span>
          </div>
        ))}
      </section>
      <ScrollCue href="#wallfall-how" current="Wallfall Barricade details" label="V · Scroll down to learn the rules" />

      <section id="wallfall-how" className="wf-section">
        <div className="wf-how wf-reveal">
          <div className="wf-how-copy">
            <span className="wf-eyebrow">The match · 1 minute to understand</span>
            <h2 className="wf-section-title">One board.<br />Two routes.</h2>
            <p className="wf-overview">
              Wallfall Barricade is a tactical 1v1 race across a shared grid. Move toward
              your opposite edge, or place a barricade to change your rival's path. Reach
              your goal first. Every move reshapes the board.
            </p>
          </div>
          <ol className="wf-match-steps" aria-label="How a match works">
            <li><div className="wf-step-core"><span>01</span><strong>Read the board</strong><p>Plan a route and watch for your rival's next move.</p></div></li>
            <li><div className="wf-step-core"><span>02</span><strong>Move or block</strong><p>Advance, or place a wall to force a new path.</p></div></li>
            <li><div className="wf-step-core"><span>03</span><strong>Reach the edge</strong><p>Outthink the other player and get across first.</p></div></li>
          </ol>
        </div>
        <ScrollCue href="#wallfall-online" current="How the match works" label="V · Scroll down for online features" />
      </section>

      <section id="wallfall-online" className="wf-section">
        <div className="wf-features-head wf-reveal">
          <div>
            <span className="wf-eyebrow">Made for live play</span>
            <h2 className="wf-section-title">The whole match,<br />connected.</h2>
          </div>
          <p>I built the full server side myself and run Wallfall on Nakama, connecting strategy, friends and real-time play.</p>
        </div>
        <div className="wf-server-card wf-reveal">
          <div className="wf-server-core">
            <span className="wf-feature-n">SERVER · NAKAMA</span>
            <h3>Built and run by me.</h3>
            <p>The complete game server is my work, running on Nakama to power Wallfall's online matches and social features.</p>
          </div>
          <span className="wf-server-mark" aria-hidden="true">N</span>
        </div>
        <div className="wf-features">
          {FEATURES.map((f, i) => (
            <div key={f.t} className={`wf-feature wf-reveal wf-reveal-d${i % 3}`}>
              <div className="wf-feature-core">
                <span className="wf-feature-n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="wf-feature-t">{f.t}</h3>
                <p className="wf-feature-d">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
        <ScrollCue href="#wallfall-screens" current="Nakama online play" label="V · Scroll down for real screenshots" />
      </section>

      <section id="wallfall-screens" className="wf-section">
        <div className="section-label wf-reveal">Screenshots</div>
        <div className="wf-gallery">
          {SHOTS.map((s, i) => (
            <div key={s.src} className={`wf-shot wf-reveal wf-reveal-d${i % 3}`}>
              <img src={s.src} alt={s.alt} loading="lazy" />
            </div>
          ))}
        </div>
        <ScrollCue href="#wallfall-studio" current="Wallfall screenshots" label="V · Scroll down for the studio behind it" />
      </section>

      <section id="wallfall-studio" className="wf-studio wf-reveal">
        <img src={asset("wallfall/doe-logo.webp")} alt="DOE Studio logo" className="wf-studio-logo" />
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
