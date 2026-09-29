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

        <div className="game-card game-card--racing reveal">
          <div className="game-card-media">
            <img src={asset("free-drive/coastal-sunset.webp")} alt="Sunset coastline environment from Free Drive World" loading="lazy" />
            <div className="game-card-media-fade" />
          </div>

          <div className="game-card-body">
            <span className="game-card-tag">Mobile Racing &middot; Godot &middot; Closed Testing</span>
            <h3 className="game-card-title">Free Drive World</h3>
            <p className="game-card-desc">
              A mobile racing game in closed testing. I built its varied driving environments
              in Blender and brought them into Godot. Public release coming soon.
            </p>
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
