import { useEffect } from "react";
import { asset } from "../lib/asset";

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
        <div className="section-label reveal">Featured Project</div>
        <h2 className="section-title reveal">Games &amp;<br />Interactive</h2>

        <div className="game-card reveal">
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

        <div className="game-card game-card--racing reveal">
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
      </div>
    </section>
  );
}
