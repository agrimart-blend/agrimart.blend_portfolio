const WORKS = [
  {
    type: "video",
    embed: "https://www.youtube.com/embed/L6jrqEbGRmg",
    tag: "Animation",
    title: "HDRI Animation",
    desc: "Cinematic anime lighting in motion — rendered with my handpainted HDRI pack.",
  },
  {
    type: "video",
    embed: "https://www.youtube.com/embed/ixYLEZ1FNjM",
    tag: "HDRI Showcase",
    title: "Meteor Sky",
    desc: "Anime meteor sky — handpainted HDRI deployed in a full 3D world scene.",
  },
  {
    type: "video",
    embed: "https://www.youtube.com/embed/fJyu7OxRP5g",
    tag: "Parallax",
    title: "Parallax Animation",
    desc: "High quality background with parallax effect — depth illusion in 2D compositing.",
  },
  {
    type: "image",
    src: "https://public-files.gumroad.com/so1e0yc8zewomv4iey3pp91f73dd",
    tag: "HDRI Pack",
    title: "Vibrant HDRI Pack",
    desc: "Pack of 3 handpainted HDRIs for stunning anime-style lighting in Blender.",
  },
  {
    type: "image",
    src: "https://public-files.gumroad.com/rpvyhokkil24kmr1rwjgo7fy1df2",
    tag: "Emission",
    title: "Glowing Emission",
    desc: "Bloom & light synergy — great vibrant colors with custom emission shaders.",
  },
  {
    type: "image",
    src: "https://public-files.gumroad.com/7l26a9autehk7o69n9v9rcdjcmvj",
    tag: "Scene",
    title: "Anime Train Scene",
    desc: "Train crossing scene with my HDRI — texture meets geometry in a cinematic frame.",
  },
  {
    type: "image",
    src: "https://cdna.artstation.com/p/assets/images/images/088/224/146/smaller_square/agrimart-photo-2025-05-18-19-34-39.jpg?1747750289",
    tag: "Render",
    title: "Anime Style Render",
    desc: "Anime-style HDRI and lighting composition — Blender 3D with custom shaders.",
  },
  {
    type: "image",
    src: "https://public-files.gumroad.com/p5528t9gyug7xr2uwmhb7otlv5di",
    tag: "Studio Ghibli",
    title: "Spirited Away Style",
    desc: "Spirited Away inspired anime style 3D render — Blender Cycles.",
  },
  {
    type: "image",
    src: "/ue5-render.jpg",   // local file we'll add
    tag: "UE5",
    title: "UE5 Environment",
    desc: "Lush stylized landscape rendered in Unreal Engine 5 — real-time foliage & lighting.",
    fallback: "https://public-files.gumroad.com/ogz7z3yv44usot34y1aef21tc7kq",
  },
];

export default function WorkGrid() {
  return (
    <section id="work" className="work-section">
      <div className="work-inner">
        <div className="section-label reveal">Selected Work</div>
        <h2 className="section-title reveal">Renders &amp;<br />Videos</h2>

        <div className="work-grid">
          {WORKS.map((w, i) => (
            <WorkCard key={i} work={w} delay={i % 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ work, delay }) {
  const handleImgErr = (e) => {
    if (work.fallback) e.target.src = work.fallback;
  };

  return (
    <article className={`work-card reveal reveal-d${delay}`}>
      <div className="work-card-media">
        {work.type === "video" ? (
          <iframe
            src={work.embed}
            title={work.title}
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <img src={work.src} alt={work.title} loading="lazy" onError={handleImgErr} />
        )}
        <div className="work-card-overlay">
          <span className="work-card-tag">{work.tag}</span>
        </div>
      </div>
      <div className="work-card-info">
        <h3 className="work-card-title">{work.title}</h3>
        <p className="work-card-desc">{work.desc}</p>
      </div>
    </article>
  );
}
