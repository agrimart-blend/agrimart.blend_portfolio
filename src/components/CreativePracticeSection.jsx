export default function CreativePracticeSection() {
  return (
    <section id="creative-practice" className="practice-section" aria-labelledby="practice-title">
      <div className="practice-inner">
        <header className="practice-heading">
          <div className="section-label">Creative practice</div>
          <h2 id="practice-title" className="section-title">What I make<br />with each tool.</h2>
          <p>
            A mix of world-building, shader work and game development, shown through finished pieces and projects in progress.
          </p>
        </header>

        <ol className="practice-list">
          <li>
            <a className="practice-row" href="#/3d">
              <span className="practice-number">01</span>
              <span className="practice-copy">
                <span className="practice-kicker">Blender · Unreal Engine 5</span>
                <strong>Stylised environments and painted skies</strong>
                <span>Anime-inspired 3D worlds, hand-painted HDRIs and real-time scenes.</span>
              </span>
              <span className="practice-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a className="practice-row" href="#shaders">
              <span className="practice-number">02</span>
              <span className="practice-copy">
                <span className="practice-kicker">Blender shader tools</span>
                <strong>Materials made to shape a look</strong>
                <span>Arcane Shader and Edge Glow, with an interactive preview of each finish.</span>
              </span>
              <span className="practice-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a className="practice-row" href="#/games">
              <span className="practice-number">03</span>
              <span className="practice-copy">
                <span className="practice-kicker">Godot · Nakama</span>
                <strong>Games built around their own worlds</strong>
                <span>Online strategy, open-road driving and an original pixel-art adventure in development.</span>
              </span>
              <span className="practice-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ol>
      </div>
    </section>
  );
}
