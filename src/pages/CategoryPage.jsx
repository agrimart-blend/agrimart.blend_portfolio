import { asset } from "../lib/asset";
import "../styles/two-d-showcase.css";

const IMAGE_STUDIES = [
  { src: "ps-valorant.jpg", title: "Windmill Landscape", detail: "Blender 3D · Photoshop-painted sky" },
  { src: "ps-windmill.jpg", title: "Valorant Weapon Study", detail: "Blender 3D · Photoshop composite" },
  { src: "sky.jpg", title: "Power Line Scene", detail: "Blender 3D · hand-painted Photoshop sky" },
];

const ADVENTURE = [
  { src: "games/pixel-adventure-village.png", title: "Village at dusk", detail: "In-game screenshot · Godot", fit: "cover" },
  { src: "games/pixel-adventure-platform.png", title: "First playable route", detail: "In-game screenshot · Godot", fit: "cover" },
  { src: "games/pixel-adventure-castle.png", title: "Castle encounter", detail: "In-game screenshot · Godot", fit: "cover" },
  { src: "games/pixel-adventure-bridge.png", title: "Bridge and village", detail: "In-game screenshot · Godot", fit: "cover" },
  { src: "games/pixel-adventure-editor.png", title: "Building the level", detail: "Godot editor · development capture", fit: "contain" },
];

const WALLFALL = [
  { src: "wallfall/shot-1.webp", title: "Plan the route", detail: "Live match · Wallfall Barricade" },
  { src: "wallfall/shot-3.webp", title: "Outthink a friend", detail: "Online play · Wallfall Barricade" },
  { src: "wallfall/shot-4.webp", title: "Play it your way", detail: "Real game screenshot · Wallfall Barricade" },
];

function ArtworkStrip({ items, className = "" }) {
  return (
    <div className={`two-d-art-grid ${className}`}>
      {items.map((item, index) => (
        <figure className="two-d-art" key={item.src}>
          <div className={`two-d-art-image${item.fit === "contain" ? " is-contained" : ""}`}>
            <img src={asset(item.src)} alt={`${item.title} — ${item.detail}`} loading="lazy" />
          </div>
          <figcaption>
            <span>{String(index + 1).padStart(2, "0")} · {item.detail}</span>
            <strong>{item.title}</strong>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <main className="two-d-page">
      <section className="two-d-hero category-hero" aria-labelledby="two-d-title" data-scroll-guide="3D art & games">
        <img className="category-hero-art" src={asset("games/pixel-adventure-village.png")} alt="" />
        <div className="category-hero-inner">
          <a href="#hero" className="category-back">&larr; Back to Portfolio</a>
          <span className="t3d-badge"><span className="t3d-badge-dot" />Blender 3D · Photoshop skies · Godot games</span>
          <h1 id="two-d-title" className="category-title">3D Art<br />&amp; Games</h1>
          <p className="t3d-pitch">Blender-made scenes with skies I painted in Photoshop, alongside real gameplay captures from my Godot games.</p>
        </div>
      </section>

      <section id="photoshop" className="two-d-section two-d-section--paper" aria-labelledby="photoshop-title" data-scroll-guide="Blender + Photoshop">
        <header className="two-d-heading">
          <span className="section-label">01 / Blender + Photoshop · selected pieces</span>
          <h2 id="photoshop-title">Built in 3D.<br />Finished by hand.</h2>
          <p>These scenes and props are made in Blender. Photoshop adds the hand-painted skies and final image treatment; the captions show which tool shaped each part.</p>
        </header>
        <ArtworkStrip items={IMAGE_STUDIES} className="two-d-photoshop-grid" />
      </section>

      <section id="pixel-adventure" className="two-d-section two-d-section--night" aria-labelledby="adventure-title" data-scroll-guide="Godot adventure">
        <header className="two-d-heading two-d-heading--light">
          <span className="section-label">02 / Godot · in development</span>
          <h2 id="adventure-title">A pixel-art<br />adventure taking shape.</h2>
          <p>An original 2D adventure prototype. These are real gameplay and editor captures from development; the level, movement and encounters are still being built.</p>
        </header>
        <ArtworkStrip items={ADVENTURE} className="two-d-adventure-grid" />
      </section>

      <section id="wallfall-art" className="two-d-section two-d-section--warm" aria-labelledby="wallfall-art-title" data-scroll-guide="Wallfall screenshots">
        <header className="two-d-heading">
          <span className="section-label">03 / Godot + Nakama · online multiplayer</span>
          <h2 id="wallfall-art-title">Wallfall Barricade</h2>
          <p>Real screenshots from my strategy game. I built and run its full game server on Nakama, with real-time chat, emoji reactions, friends, bot matches and online play around the world.</p>
        </header>
        <ArtworkStrip items={WALLFALL} className="two-d-wallfall-grid" />
        <a className="two-d-project-link" href="#/wallfall-barricade">Explore Wallfall Barricade <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
