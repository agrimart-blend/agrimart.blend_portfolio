// Local images from public folder (uploaded by user)
const HP_IMAGES = [
  { src: "/sky.jpg",   alt: "Anime sky – power tower render"  },
  { src: "/metro.jpg", alt: "Anime metro – train bridge scene" },
  { src: "/room.jpg",  alt: "Anime room – traditional interior" },
  { src: "/ue5.jpg",   alt: "UE5 stylised landscape render"    },
];

export default function HandpaintedSection() {
  return (
    <section id="handpainted" className="hp-section">
      <div className="hp-inner">

        {/* Text column */}
        <div className="hp-text">
          <div className="section-label reveal">Artistic Process</div>
          <h2 className="section-title reveal">
            Anime Style<br />in Blender 3D
          </h2>
          <p className="hp-body reveal reveal-d1">
            Every piece begins with a <strong>hand-drawn concept</strong> — translating
            the painterly quality of classic anime backgrounds into fully realised 3D
            environments, capturing that ineffable warmth and nostalgia.
          </p>
          <p className="hp-body reveal reveal-d2">
            Using custom <strong>Blender shaders, handpainted textures</strong> and
            carefully crafted lighting rigs, I push Blender's capabilities to achieve
            the hand-crafted look of Studio Ghibli and Makoto Shinkai.
          </p>
          <p className="hp-body reveal reveal-d3">
            The results power <strong>animations, game environments, YouTube
            productions</strong> and are sold as assets to fellow artists worldwide.
            Now extended with <strong>UE5</strong> for real-time rendering.
          </p>

          {/* Stat row */}
          <div className="hp-stats reveal reveal-d3">
            {[
              { n: "8K",  label: "HDRI Resolution" },
              { n: "50+", label: "Assets Released"  },
              { n: "★5",  label: "Avg. Review"      },
            ].map(s => (
              <div key={s.n} className="hp-stat">
                <span className="hp-stat-num">{s.n}</span>
                <span className="hp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image mosaic */}
        <div className="hp-mosaic reveal reveal-d1">
          {HP_IMAGES.map((img, i) => (
            <div key={i} className={`hp-img hp-img-${i}`}>
              <img src={img.src} alt={img.alt} loading="lazy"
                   onError={e => { e.target.src = "https://public-files.gumroad.com/7l26a9autehk7o69n9v9rcdjcmvj"; }} />
              <div className="hp-img-overlay" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
