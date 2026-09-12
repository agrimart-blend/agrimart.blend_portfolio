const ASSETS = [
  {
    name: "Anime Fountain Shader",
    desc: "Smooth waves & particle flows — instant stylised water for Blender.",
    img:  "https://public-files.gumroad.com/d34rqd01nd7lrbb2mvuk23p33s83",
    link: "https://agrimart.gumroad.com/l/animefountain",
    tag:  "Shader · FREE",
  },
  {
    name: "Waterfall Shader",
    desc: "Painterly cascades with custom colour & speed controls for anime scenes.",
    img:  "https://public-files.gumroad.com/t1elcqn3ws9ca5iqv2n7cdqhek3b",
    link: "https://agrimart.gumroad.com/l/waterfall",
    tag:  "Shader",
  },
  {
    name: "River Crossing Train Scene",
    desc: "Full environment pack — ready to render. Saves hours of modelling.",
    img:  "https://public-files.gumroad.com/weehzc6knl1rs5z1fgr6v9gxh1kd",
    link: "https://agrimart.gumroad.com/l/xdglk",
    tag:  "Scene Pack",
  },
  {
    name: "Anime HDRI — Meteor Sky",
    desc: "Your-Name meteor sky in 8 K HDRI, handpainted for cinematic anime lighting.",
    img:  "https://public-files.gumroad.com/7l26a9autehk7o69n9v9rcdjcmvj",
    link: "https://agrimart.gumroad.com/l/pwoyw",
    tag:  "HDRI · 8K",
  },
  {
    name: "Vibrant HDRIs Pack × 3",
    desc: "Three handpainted HDRIs with warm, cool and neutral tones.",
    img:  "https://public-files.gumroad.com/so1e0yc8zewomv4iey3pp91f73dd",
    link: "https://agrimart.gumroad.com/",
    tag:  "HDRI Pack",
  },
  {
    name: "Anime Sky HDRI — Warm",
    desc: "Second in the handpainted HDRI series. Warm atmospheric sunset tones.",
    img:  "https://public-files.gumroad.com/l1qqb7oy602v3elt36k5w3sfkpx3",
    link: "https://agrimart.gumroad.com/",
    tag:  "HDRI",
  },
  {
    name: "Wood Shader Pack",
    desc: "Stylised wood grain procedural shader — highly customisable node group.",
    img:  "https://public-files.gumroad.com/ogz7z3yv44usot34y1aef21tc7kq",
    link: "https://agrimart.gumroad.com/",
    tag:  "Shader · FREE",
  },
  {
    name: "Spirited Away Style Render",
    desc: "Full scene breakdown + Blender file for a Ghibli-style environment.",
    img:  "https://public-files.gumroad.com/p5528t9gyug7xr2uwmhb7otlv5di",
    link: "https://agrimart.gumroad.com/",
    tag:  "Scene File",
  },
];

export default function AssetsSection() {
  return (
    <section id="assets" className="assets-section">
      <div className="assets-inner">
        <div className="section-label reveal">Digital Products</div>
        <h2 className="section-title reveal">Asset<br />Library</h2>

        <div className="assets-grid">
          {ASSETS.map((a, i) => (
            <AssetCard key={i} asset={a} delay={i % 4} />
          ))}
        </div>

        <div className="assets-cta reveal">
          <a
            href="https://agrimart.gumroad.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="assets-store-btn"
          >
            View All on Gumroad ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function AssetCard({ asset, delay }) {
  return (
    <a
      href={asset.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`asset-card reveal reveal-d${delay}`}
    >
      <div className="asset-card-img">
        <img src={asset.img} alt={asset.name} loading="lazy" />
        <div className="asset-card-img-overlay" />
      </div>
      <div className="asset-card-body">
        <span className="asset-card-tag">{asset.tag}</span>
        <p  className="asset-card-name">{asset.name}</p>
        <p  className="asset-card-desc">{asset.desc}</p>
        <span className="asset-card-link">Get it ↗</span>
      </div>
    </a>
  );
}
