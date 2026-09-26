const CATEGORIES = {
  "3d": {
    label: "3D · Rendering · HDRIs",
    title: "3D",
    desc: "Blender & Unreal Engine 5 work lives here — renders, HDRIs and real-time environments.",
  },
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
  const cat = CATEGORIES[kind] || CATEGORIES["3d"];

  return (
    <main className="category-page">
      <a href="#hero" className="wf-back">&larr; Back to Portfolio</a>

      <section className="category-hero">
        <span className="section-label">{cat.label}</span>
        <h1 className="category-title">{cat.title}</h1>
        <p className="category-desc">{cat.desc}</p>
        <span className="category-placeholder-tag">Page coming soon</span>
      </section>
    </main>
  );
}
