import ShuffleText from "./ShuffleText";

export default function PatreonSection() {
  return (
    <section id="patreon" className="patreon-section">
      <div className="patreon-inner">

        {/* Geometric accent */}
        <div className="patreon-geo" aria-hidden="true">
          {[...Array(3)].map((_,i) => (
            <div key={i} className="patreon-geo-ring" style={{
              width: `${180 + i * 120}px`,
              height: `${180 + i * 120}px`,
              opacity: 0.06 - i * 0.015
            }} />
          ))}
          <div className="patreon-geo-diamond" />
        </div>

        <div className="patreon-content">
          <div className="section-label reveal" style={{ color: "#ff6b35" }}>
            <span style={{ background: "#ff6b35" }} />
            Membership
          </div>

          <ShuffleText
            tag="h2"
            text="JOIN THE STUDIO"
            className="patreon-title reveal"
            triggerOnHover={true}
          />

          <p className="patreon-body reveal reveal-d1">
            Get <strong>early access</strong> to assets, behind-the-scenes renders,
            tutorials and exclusive Blender files — directly supporting the work.
          </p>

          <div className="patreon-perks reveal reveal-d2">
            {[
              { icon: "◈", text: "Early asset access" },
              { icon: "◆", text: "WIP renders & breakdowns" },
              { icon: "◎", text: "Exclusive Blender files" },
              { icon: "✦", text: "Direct support" },
            ].map(p => (
              <div key={p.text} className="patreon-perk">
                <span className="perk-icon">{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>

          <a
            href="https://www.patreon.com/13836419/join"
            target="_blank"
            rel="noopener noreferrer"
            className="patreon-btn reveal reveal-d3"
          >
            <span className="patreon-btn-inner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613C20.15 17.777 24 13.9 24 9.164 24 4.4 20.15.524 15.386.524zM.003 23.476h4.504V.524H.003v22.952z"/>
              </svg>
              Become a Patron
            </span>
            <span className="patreon-btn-arrow">↗</span>
          </a>
        </div>

        {/* Right visual */}
        <div className="patreon-visual reveal reveal-d1">
          <div className="patreon-card">
            <img src="/sky.jpg" alt="Portfolio preview" />
            <div className="patreon-card-overlay">
              <span>AGRIMART.BLEND</span>
              <span>PATRON EXCLUSIVE</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
