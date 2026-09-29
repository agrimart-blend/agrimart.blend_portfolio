import RenderGallery from "../components/RenderGallery";
import { asset } from "../lib/asset";

const CHAPTERS = [
  {
    tool: "Blender",
    meta: "Cycles · Eevee · Custom shaders",
    items: [
      { src: asset("art/meteor.webp"),       title: "Meteor Night",    tag: "Anime sky · Emission",      size: "big"  },
      { src: asset("art/santorini.webp"),    title: "Santorini Café",  tag: "Stylised environment",      size: "tall" },
      { src: asset("room.jpg"),              title: "Tatami Room",     tag: "Anime interior"                          },
      { src: asset("metro.jpg"),             title: "River Crossing",  tag: "Train scene · HDRI"                      },
      { src: asset("art/donut-render.webp"), title: "Sweet Stack",     tag: "Product · Food render",     size: "wide" },
      { src: asset("art/beach.webp"),        title: "Painted Coast",   tag: "Painterly shader",          size: "tall" },
      { src: asset("sky.jpg"),               title: "Power Line Sky",  tag: "Handpainted HDRI",          size: "tall" },
      { src: asset("art/gun.webp"),          title: "Plasma Blaster",  tag: "Hard-surface · Emission",   size: "wide" },
    ],
  },
  {
    tool: "Unreal Engine 5",
    meta: "Real-time · Lumen · Foliage",
    layout: "solo",
    items: [
      { src: asset("ue5.jpg"), title: "Stylised Landscape", tag: "Real-time environment", zoom: 1.08 },
    ],
  },
];

const STATS = [
  { n: "600+", l: "Sales on Gumroad & CGTrader" },
  { n: "50+",  l: "Assets released" },
  { n: "8K",   l: "Handpainted HDRIs" },
  { n: "★5.0", l: "Average review" },
];

const SERVICES = [
  { img: asset("art/santorini.webp"),    t: "Stylised Environments", d: "Anime and Ghibli-style scenes, taken from blockout to final render." },
  { img: asset("art/gun.webp"),          t: "Props & Hard-Surface",  d: "Hero props and game assets with clean topology and emissive detail." },
  { img: asset("art/donut-render.webp"), t: "Product Renders",       d: "Studio-lit shots that make a product look good enough to buy." },
  { img: asset("sky.jpg"),               t: "Handpainted HDRIs",     d: "Painted skies up to 8K that light and set the mood of a whole scene." },
  { img: asset("art/beach.webp"),        t: "Custom Shaders",        d: "Painterly, toon and water shaders built as reusable node groups." },
  { img: asset("ue5.jpg"),               t: "Real-time in UE5",      d: "Environments lit with Lumen, ready for games and cinematics." },
];

const PIPELINE = ["Concept", "Blockout", "Model", "Shade & Texture", "Light", "Render & Comp"];

const GAME_ENVIRONMENTS = [
  { src: "free-drive/coastal-sunset.webp", title: "Coastal sunset", alt: "Sunset over the ocean in a coastal racing environment", size: "feature" },
  { src: "free-drive/city-loop-dusk.webp", title: "City circuit", alt: "Elevated view of roads and buildings in a racing-game city" },
  { src: "free-drive/river-bridge.webp", title: "River crossing", alt: "Road bridge crossing a river in a forested landscape" },
  { src: "free-drive/green-hills-road.webp", title: "Green hills", alt: "Winding road through a green, tree-covered racing environment" },
  { src: "free-drive/alpine-road.webp", title: "Alpine pass", alt: "Mountain road through a snowy alpine environment" },
];

export default function ThreeDPage() {
  const toGallery = () => document.getElementById("renders")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="category-page">
      <section className="category-hero category-hero--art">
        <img className="category-hero-art" src={asset("art/meteor.webp")} alt="" />
        <div className="category-hero-inner">
          <a href="#hero" className="category-back">&larr; Back to Portfolio</a>
          <span className="t3d-badge"><span className="t3d-badge-dot" />Open to freelance &amp; studio work</span>
          <h1 className="category-title">3D</h1>
          <p className="t3d-pitch">
            I build stylised 3D worlds: anime environments, hero props, product shots and
            handpainted HDRIs, lit like paintings and delivered production-ready.
          </p>
          <div className="t3d-ctas">
            <a href="#contact" className="t3d-btn t3d-btn-primary">Hire me &rarr;</a>
            <button type="button" className="t3d-btn t3d-btn-outline" onClick={toGallery}>See the work &darr;</button>
          </div>
        </div>
      </section>

      <section className="t3d-stats">
        {STATS.map(s => (
          <div key={s.n} className="t3d-stat">
            <span className="t3d-stat-n">{s.n}</span>
            <span className="t3d-stat-l">{s.l}</span>
          </div>
        ))}
      </section>

      <div id="renders">
        <RenderGallery chapters={CHAPTERS} />
      </div>

      <section className="t3d-block t3d-game-worlds" aria-labelledby="t3d-game-worlds-title">
        <div className="t3d-block-head">
          <span className="section-label">Blender &rarr; Godot &middot; Mobile game</span>
          <h2 id="t3d-game-worlds-title" className="t3d-h2">Worlds built<br />for the drive</h2>
          <p className="t3d-worlds-intro">
            I made these environments in Blender and used them in Free Drive World, a mobile
            racing game in closed testing with Godot.
          </p>
          <a href="#/free-drive-world" className="t3d-worlds-link">Explore the game project &rarr;</a>
        </div>
        <div className="t3d-worlds-grid">
          {GAME_ENVIRONMENTS.map((world) => (
            <figure key={world.src} className={`t3d-world-card ${world.size || ""}`}>
              <img src={asset(world.src)} alt={world.alt} loading="lazy" />
              <figcaption>
                <span>Blender environment &middot; used in Godot</span>
                <strong>{world.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="t3d-block">
        <div className="t3d-block-head">
          <span className="section-label">Services</span>
          <h2 className="t3d-h2">What I can<br />build for you</h2>
        </div>
        <div className="t3d-services">
          {SERVICES.map((s, i) => (
            <article key={s.t} className="t3d-service">
              <div className="t3d-service-img"><img src={s.img} alt="" loading="lazy" /></div>
              <span className="t3d-service-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t3d-service-t">{s.t}</h3>
              <p className="t3d-service-d">{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="t3d-block">
        <div className="t3d-block-head">
          <span className="section-label">Workflow</span>
          <h2 className="t3d-h2">From idea<br />to final frame</h2>
        </div>
        <ol className="t3d-pipeline">
          {PIPELINE.map((p, i) => (
            <li key={p}><span>{String(i + 1).padStart(2, "0")}</span>{p}</li>
          ))}
        </ol>
      </section>

      <section className="t3d-cta">
        <img className="t3d-cta-bg" src={asset("art/santorini.webp")} alt="" loading="lazy" />
        <div className="t3d-cta-inner">
          <span className="t3d-badge t3d-badge-light"><span className="t3d-badge-dot" />Taking new projects</span>
          <h2 className="t3d-cta-title">Have a world in mind?<br />Let&rsquo;s build it.</h2>
          <div className="t3d-ctas">
            <a href="#contact" className="t3d-btn t3d-btn-accent">Start a project &rarr;</a>
            <a href="https://www.artstation.com/agrimart" target="_blank" rel="noopener noreferrer" className="t3d-btn t3d-btn-ghost">ArtStation &#8599;</a>
            <a href="https://agrimart.gumroad.com/" target="_blank" rel="noopener noreferrer" className="t3d-btn t3d-btn-ghost">My assets &#8599;</a>
          </div>
        </div>
      </section>
    </main>
  );
}
