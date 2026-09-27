const CATEGORIES = {
  "2d": {
    label: "Digital · Illustration",
    title: "2D",
    desc: "Photoshop and Clip Studio Paint pieces — concept art, illustration and digital painting.",
  },
  games: {
    label: "Interactive · Playable",
    title: "Games",
    desc: "Playable projects, from Wallfall Barricade to whatever ships next.",
  },
};

export default function CategoryPage({ kind }) {
  const cat = CATEGORIES[kind] || CATEGORIES["2d"];

  return (
    <main className="category-page">
      <section className="category-hero">
        <div className="category-hero-inner">
          <a href="#hero" className="category-back">&larr; Back to Portfolio</a>
          <span className="section-label">{cat.label}</span>
          <h1 className="category-title">{cat.title}</h1>
          <p className="category-desc">{cat.desc}</p>
          <span className="category-placeholder-tag">Page coming soon</span>
        </div>
      </section>
    </main>
  );
}
