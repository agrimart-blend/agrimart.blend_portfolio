import { asset } from "../lib/asset";

const SHOTS = ["wallfall/shot-1.webp", "wallfall/shot-3.webp", "wallfall/shot-4.webp"].map(asset);

export default function GameShowcase() {
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
            <span className="game-card-tag">1v1 Strategy &middot; Android &middot; Real-time Multiplayer</span>
            <h3 className="game-card-title">Wallfall Barricade</h3>
            <p className="game-card-desc">
              A tactical board game built at DOE Studio &mdash; place barricades to box in
              your opponent while racing to reach the opposite side first. Ranked ladders,
              party play, a bot to practice against, and a full customization shop.
            </p>

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
      </div>
    </section>
  );
}
