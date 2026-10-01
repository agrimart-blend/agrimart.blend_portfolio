import { useEffect } from "react";
import { asset } from "../lib/asset";
import ScrollCue from "./ScrollCue";

const SHOTS = ["wallfall/shot-1.webp", "wallfall/shot-3.webp", "wallfall/shot-4.webp"].map(asset);

export default function GameShowcase() {
  useEffect(() => {
    const elements = document.querySelectorAll("#games .reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    elements.forEach(element => io.observe(element));
    return () => io.disconnect();
  }, []);

  return (
    <section id="games" className="games-section">
      <div className="games-inner">
        <div className="section-label reveal">Playable worlds · made by Agrimart</div>
        <h2 className="section-title reveal">Games &amp;<br />Interactive</h2>
        <p className="games-intro reveal">Three projects, each with a different kind of play — online strategy, open-road driving, and a pixel-art adventure in development.</p>
        <ScrollCue href="#game-wallfall" current="Games portfolio" label="V · Scroll down for Wallfall Barricade" />

        <div id="game-wallfall" className="game-card reveal">
          <div className="game-card-media">
            <img src={asset("wallfall/hero.webp")} alt="Wallfall Barricade key art" loading="lazy" />
            <div className="game-card-media-fade" />
          </div>

          <div className="game-card-body">
            <span className="game-card-tag">1v1 Strategy &middot; Android &middot; Nakama Online</span>
            <h3 className="game-card-title">Wallfall Barricade</h3>
            <p className="game-card-desc">
              A live 1v1 strategy game where every barricade changes the route to victory.
              I built and run the full server on Nakama. Play people around the world, chat
              and react in real time, add friends, or practice against a bot.
            </p>

            <ul className="game-card-features" aria-label="Wallfall Barricade highlights">
              <li>Server built by me on Nakama</li>
              <li>Online play worldwide</li>
              <li>Live chat + emoji reactions</li>
              <li>Friends + bot practice</li>
            </ul>

            <div className="game-card-shots">
              {SHOTS.map(src => (
                <div key={src} className="game-card-shot">
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>

            <div className="game-card-ctas">
              <a href="#/wallfall-barricade" className="game-btn game-btn-primary">
                View Project &rarr;
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.agrimkaushal.wallfall"
                target="_blank" rel="noopener noreferrer"
                className="game-btn game-btn-outline"
              >
                Get it on Google Play &#8599;
              </a>
            </div>
          </div>
        </div>
        <ScrollCue href="#game-driving" current="Wallfall Barricade" label="V · Scroll down for Free Drive World" />

        <div id="game-driving" className="game-card game-card--racing reveal">
          <div className="game-card-media">
            <img src={asset("free-drive/promo-race-ui.webp")} alt="Race interface concept showing a race in progress and mobile driving controls" loading="lazy" />
            <div className="game-card-media-fade" />
            <span className="game-card-image-caption">Race interface concept</span>
          </div>

          <div className="game-card-body">
            <span className="game-card-tag">Mobile Racing &middot; Android &middot; Closed Testing</span>
            <h3 className="game-card-title">Free Drive World</h3>
            <p className="game-card-desc">
              A mobile racing world built around free-drive exploration, race events, a
              customization garage and boost-driven touch controls. Its routes span city
              circuits, forests and coastlines, with environments made in Blender and brought
              into Godot. Currently in closed testing.
            </p>
            <ul className="game-card-features" aria-label="Game highlights">
              <li>Free-drive exploration</li>
              <li>Race events</li>
              <li>Car customization</li>
              <li>Boost &amp; mobile controls</li>
            </ul>
            <div className="game-card-ctas">
              <a href="#/free-drive-world" className="game-btn game-btn-primary">
                View Project &rarr;
              </a>
              <span className="game-btn game-btn-status" role="status">Coming soon</span>
            </div>
          </div>
        </div>
        <ScrollCue href="#game-adventure" current="Free Drive World" label="V · Scroll down for my 2D adventure" />

        <div id="game-adventure" className="game-card game-card--adventure reveal">
          <div className="game-card-media adventure-screenshot-grid">
            <img className="adventure-screenshot-main" src={asset("games/pixel-adventure-bridge.png")} alt="Pixel-art adventure gameplay in a village beside a stone bridge" loading="lazy" />
            <img src={asset("games/pixel-adventure-platform.png")} alt="The player character on a platform in a bright pixel-art landscape" loading="lazy" />
            <img src={asset("games/pixel-adventure-castle.png")} alt="Pixel-art castle level with a fire hazard" loading="lazy" />
            <span className="game-card-image-caption">Real game captures · Godot development</span>
          </div>
          <div className="game-card-body">
            <span className="game-card-tag">2D Adventure &middot; Pixel Art &middot; In Development</span>
            <h3 className="game-card-title">Pixel Adventure<br />Prototype</h3>
            <p className="game-card-desc">An original 2D adventure taking shape in Godot. Explore hand-built pixel-art places, move through platforming routes and discover what is waiting beyond each level. The screenshots show the actual game and current development work.</p>
            <ul className="game-card-features" aria-label="2D adventure highlights">
              <li>Original pixel-art worlds</li>
              <li>2D platforming</li>
              <li>Built in Godot</li>
              <li>Currently in development</li>
            </ul>
            <div className="game-card-ctas">
              <a href="#/2d" className="game-btn game-btn-primary">See real captures &rarr;</a>
              <span className="game-btn game-btn-status" role="status">In development</span>
            </div>
          </div>
        </div>
        <ScrollCue href="#games-next" current="Pixel Adventure Prototype" label="V · Explore the 2D art page" />
        <div id="games-next" className="games-next-project reveal">
          <span className="section-label">Also in the portfolio</span>
          <a href="#/2d">Explore 2D art, game captures &amp; painted skies <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
