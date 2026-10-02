import { useEffect } from "react";
import { asset } from "../lib/asset";

const PROMO_ART = [
  { src: "free-drive/promo-banner.webp", alt: "Drive Faster campaign artwork for Free Drive World", note: "Campaign key art" },
  { src: "free-drive/promo-race-ui.webp", alt: "Promotional concept of the race view and mobile controls", note: "Race interface concept" },
  { src: "free-drive/promo-garage.webp", alt: "Promotional concept of the car selection garage and menu", note: "Garage interface concept" },
];

const ENVIRONMENTS = [
  { src: "free-drive/city-loop-dusk.webp", title: "City loop", alt: "Dusk view of a city circuit surrounded by trees" },
  { src: "free-drive/city-loop-night.webp", title: "City after dark", alt: "Night-time city circuit with illuminated roads and buildings" },
  { src: "free-drive/coastal-sunset.webp", title: "Coastal sunset", alt: "Sunset over a coastal racing environment" },
  { src: "free-drive/lighthouse-island.webp", title: "Island coast", alt: "Lighthouse and wind turbine above a forested coast at sunset" },
  { src: "free-drive/forest-lake.webp", title: "Forest lake", alt: "A forest surrounding a large lake, viewed from above" },
  { src: "free-drive/river-bridge.webp", title: "River crossing", alt: "Road bridge crossing a river through a forest" },
  { src: "free-drive/green-hills-road.webp", title: "Green hills", alt: "Long road through rolling green hills and forest" },
  { src: "free-drive/alpine-road.webp", title: "Alpine pass", alt: "Winding road through a snowy mountain pass" },
  { src: "free-drive/city-coast-road.webp", title: "Coastal city road", alt: "Road through a coastal city beside a beach" },
  { src: "free-drive/waterfall-bay.webp", title: "Waterfall bay", alt: "Waterfall flowing into a blue pool within a green landscape" },
];

export default function FreeDriveProject() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".fd-reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="free-drive-page">
      <a href="#/games" className="wf-back">&larr; Back to Games</a>

      <section className="fd-hero" data-scroll-guide="Free Drive World">
        <img className="fd-hero-image" src={asset("free-drive/lighthouse-island.webp")} alt="" />
        <div className="fd-hero-shade" />
        <div className="fd-hero-content">
          <span className="fd-kicker">Mobile racing &middot; Blender environments &middot; Godot</span>
          <h1 className="fd-title">Free Drive<br />World</h1>
          <p className="fd-subtitle">Car Racing 3D</p>
          <p className="fd-status" role="status"><span />Currently in closed testing <b>&middot;</b> Public release coming soon</p>
        </div>
      </section>

      <section id="fd-meta" className="fd-meta" aria-label="Project details" data-scroll-guide="Game details">
        {[
          ["Platform", "Mobile · Android"],
          ["Engine", "Godot"],
          ["Environment art", "Blender"],
          ["Release", "Closed testing"],
        ].map(([label, value]) => (
          <div key={label} className="fd-meta-item">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section id="fd-intro" className="fd-intro fd-reveal" data-scroll-guide="Project overview">
        <div className="section-label">Project note</div>
        <div>
          <h2>Built as a world to drive through.</h2>
          <p>
            Free Drive World is a mobile racing game currently in closed testing. I created
            its varied environments in Blender and brought them into Godot, shaping a driving
            world that moves from city circuits to coasts, forests and mountain roads.
          </p>
        </div>
      </section>

      <section id="fd-game-art" className="fd-section" data-scroll-guide="Campaign art">
        <div className="fd-section-head fd-reveal">
          <span className="section-label">Game art &amp; interface</span>
          <h2>From the campaign<br />to the cockpit</h2>
          <p>Campaign artwork and interface concepts are shown here; the environment captures below are from the game.</p>
        </div>
        <div className="fd-promo-grid">
          {PROMO_ART.map((item, index) => (
            <figure key={item.src} className={`fd-promo-card fd-reveal fd-promo-${index + 1}`}>
              <img src={asset(item.src)} alt={item.alt} loading="lazy" />
              <figcaption><span>{item.note}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="fd-worlds" className="fd-section fd-world-section" data-scroll-guide="World environments">
        <div className="fd-section-head fd-reveal">
          <span className="section-label">Environment art &middot; Blender to Godot</span>
          <h2>Ten views.<br />One open road.</h2>
          <p>Environment captures from the mobile game, built in Blender and used in Godot.</p>
        </div>
        <div className="fd-env-grid">
          {ENVIRONMENTS.map((item, index) => (
            <figure key={item.src} className={`fd-env-card fd-reveal ${index === 0 ? "fd-env-feature" : ""}`}>
              <img src={asset(item.src)} alt={item.alt} loading="lazy" />
              <figcaption><span>{String(index + 1).padStart(2, "0")} / 10</span><strong>{item.title}</strong></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="fd-release" className="fd-release fd-reveal" data-scroll-guide="Release status">
        <span className="section-label">Release status</span>
        <h2>In closed testing.<br />Coming soon.</h2>
        <p>Public release follows closed testing.</p>
        <a href="#/games" className="wf-btn wf-btn-outline">Back to game projects &larr;</a>
      </section>
    </main>
  );
}
