import ScrollCue from "../components/ScrollCue";
import { asset } from "../lib/asset";
import "../styles/two-d-showcase.css";

const PHOTOSHOP = [
  { src: "ps-valorant.jpg", title: "Valorant study", detail: "Digital painting · Photoshop" },
  { src: "ps-windmill.jpg", title: "Windmill landscape", detail: "Environment painting · Photoshop" },
  { src: "ps-canvas.png", title: "Canvas study", detail: "Painterly experiment · Photoshop" },
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
      <section className="two-d-hero category-hero" aria-labelledby="two-d-title">
        <img className="category-hero-art" src={asset("games/pixel-adventure-village.png")} alt="" />
        <div className="category-hero-inner">
          <a href="#hero" className="category-back">&larr; Back to Portfolio</a>
          <span className="t3d-badge"><span className="t3d-badge-dot" />2D art · game worlds · visual experiments</span>
          <h1 id="two-d-title" className="category-title">2D /<br />Image making</h1>
          <p className="t3d-pitch">Digital paintings, hand-built game art and visual ideas in progress — shown with the real work behind them.</p>
        </div>
        <ScrollCue href="#photoshop" current="2D & visual art" label="V · Scroll down for Photoshop work" />
      </section>

      <section id="photoshop" className="two-d-section two-d-section--paper" aria-labelledby="photoshop-title">
        <header className="two-d-heading">
          <span className="section-label">01 / Photoshop · selected pieces</span>
          <h2 id="photoshop-title">Painted, composed,<br />made by hand.</h2>
          <p>Digital painting and image work made in Photoshop, shown alongside the rest of my 2D practice.</p>
        </header>
        <ArtworkStrip items={PHOTOSHOP} className="two-d-photoshop-grid" />
        <ScrollCue href="#pixel-adventure" current="Photoshop studies" label="V · Scroll down for the Godot adventure" />
      </section>

      <section id="pixel-adventure" className="two-d-section two-d-section--night" aria-labelledby="adventure-title">
        <header className="two-d-heading two-d-heading--light">
          <span className="section-label">02 / Godot · in development</span>
          <h2 id="adventure-title">A pixel-art<br />adventure taking shape.</h2>
          <p>An original 2D adventure prototype. These are real gameplay and editor captures from development; the level, movement and encounters are still being built.</p>
        </header>
        <ArtworkStrip items={ADVENTURE} className="two-d-adventure-grid" />
        <ScrollCue href="#wallfall-art" current="2D adventure prototype" label="V · Scroll down for Wallfall Barricade" />
      </section>

      <section id="wallfall-art" className="two-d-section two-d-section--warm" aria-labelledby="wallfall-art-title">
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
