import { useState } from "react";
import { asset } from "../lib/asset";
import "../styles/addon-workbench.css";

const VARIANTS = {
  basic: {
    image: "addons/blender-basic.jpg",
    name: "Original material",
    detail: "Baseline render · no custom shader add-ons",
    tag: "BASE MATERIAL",
  },
  arcane: {
    image: "addons/arcane-no-light.jpg",
    name: "Arcane Shader",
    detail: "Painterly surface treatment · lighting influence off",
    tag: "ARCANE SHADER",
  },
  arcaneLit: {
    image: "addons/arcane-with-light.jpg",
    name: "Arcane Shader + lighting",
    detail: "Painterly surface treatment · lighting influence on",
    tag: "ARCANE · LIGHTING ON",
  },
  edge: {
    image: "addons/edge-glow.jpg",
    name: "Edge Glow",
    detail: "A soft, controlled glow along the form",
    tag: "EDGE GLOW",
  },
  combined: {
    image: "addons/arcane-edge-glow.jpg",
    name: "Arcane + Edge Glow",
    detail: "Painterly surface treatment with a luminous edge",
    tag: "TWO ADD-ONS",
  },
};

const PRODUCTS = [
  {
    name: "Arcane Shader",
    type: "Blender add-on · paid",
    description: "A painterly shader workflow built for expressive, stylised renders.",
    image: "addons/arcane-with-light.jpg",
    link: "https://agrimart.gumroad.com/l/arcane",
    featured: true,
  },
  {
    name: "Edge Glow",
    type: "Blender add-on · free",
    description: "Add a controllable edge highlight to make forms read with more light.",
    image: "addons/edge-glow.jpg",
    link: "https://agrimart.gumroad.com/l/edge_glow",
  },
  {
    name: "Anime Fountain Shader",
    type: "Blender shader · free",
    description: "Stylised water with flowing waves and particle detail.",
    image: "https://public-files.gumroad.com/d34rqd01nd7lrbb2mvuk23p33s83",
    link: "https://agrimart.gumroad.com/l/animefountain",
  },
  {
    name: "Waterfall Shader",
    type: "Blender shader",
    description: "Painterly cascades with colour and motion controls.",
    image: "https://public-files.gumroad.com/t1elcqn3ws9ca5iqv2n7cdqhek3b",
    link: "https://agrimart.gumroad.com/l/waterfall",
  },
  {
    name: "Wood Shader Pack",
    type: "Blender shader · free",
    description: "A procedural stylised wood material for reusable scene work.",
    image: "https://public-files.gumroad.com/ogz7z3yv44usot34y1aef21tc7kq",
    link: "https://agrimart.gumroad.com/",
  },
];

const OPTIONS = [
  { id: "basic", label: "Original", sub: "No add-on" },
  { id: "arcane", label: "Arcane Shader", sub: "Painterly material" },
  { id: "edge", label: "Edge Glow", sub: "Luminous contours" },
  { id: "combined", label: "Arcane + Edge Glow", sub: "Combined effect" },
];

const VARIANT_INDEX = { basic: 1, arcane: 2, arcaneLit: 3, edge: 4, combined: 5 };

export default function BlenderAddonWorkbench() {
  const [applied, setApplied] = useState("basic");
  const [arcaneLighting, setArcaneLighting] = useState(false);
  const variant = VARIANTS[applied === "arcane" && arcaneLighting ? "arcaneLit" : applied];

  const apply = (id) => {
    setApplied(id);
    setArcaneLighting(false);
  };

  return (
    <section className="addon-lab" aria-labelledby="addon-lab-title">
      <div className="addon-lab-head">
        <div>
          <span className="section-label">Blender · tools I built</span>
          <h2 id="addon-lab-title" className="t3d-h2">A shader, switched on.</h2>
        </div>
        <p className="addon-lab-intro">
          These are my Blender add-ons in use. Choose a treatment, apply it, and compare the
          result on the same model.
        </p>
      </div>

      <div className="addon-workbench">
        <aside className="addon-panel" aria-label="Shader add-on controls">
          <div className="addon-panel-top">
            <span className="addon-blender-mark" aria-hidden="true">◉</span>
            <div><strong>AGRIMART TOOLS</strong><small>SHADER WORKBENCH</small></div>
            <span className="addon-panel-dots" aria-hidden="true">•••</span>
          </div>
          <div className="addon-panel-content">
            <div className="addon-panel-label"><span>ADD-ONS</span><span>04</span></div>
            <p className="addon-instruction">Select a look to preview it on the Blender logo.</p>
            <div className="addon-options">
              {OPTIONS.map((option, index) => (
                <article className={`addon-option ${applied === option.id ? "is-applied" : ""}`} key={option.id}>
                  <span className="addon-option-index">0{index + 1}</span>
                  <div className="addon-option-copy">
                    <strong>{option.label}</strong><small>{option.sub}</small>
                  </div>
                  <button
                    className="addon-apply"
                    type="button"
                    onClick={() => apply(option.id)}
                    aria-pressed={applied === option.id}
                  >
                    {applied === option.id ? "Applied" : "Apply"}
                  </button>
                </article>
              ))}
            </div>

            <div className={`addon-light-control ${applied === "arcane" ? "is-available" : ""}`}>
              <div><strong>Lighting influence</strong><small>Arcane Shader preview</small></div>
              <button
                type="button"
                role="switch"
                aria-checked={arcaneLighting}
                aria-label="Toggle Arcane Shader lighting preview"
                className={`addon-switch ${arcaneLighting ? "on" : ""}`}
                onClick={() => { setApplied("arcane"); setArcaneLighting(value => !value); }}
              ><span /></button>
            </div>
            <p className="addon-panel-footnote">Lighting can also be adjusted inside both add-ons. The supplied lit render is for Arcane; Edge Glow lighting renders can be added when available.</p>
          </div>
          <div className="addon-panel-footer"><span className="addon-status-dot" /> READY · BLENDER PREVIEW</div>
        </aside>

        <div className={`addon-viewport ${applied === "arcaneLit" ? "addon-viewport-lit" : ""}`}>
          <div className="addon-viewport-bar">
            <span><i /> MATERIAL PREVIEW</span>
            <span>USER ORTHO <b>▾</b></span>
          </div>
          <div className="addon-render-wrap" key={variant.image}>
            <img className="addon-render" src={asset(variant.image)} alt={`${variant.name} applied to a Blender logo render`} />
          </div>
          <div className="addon-viewport-caption">
            <div><span className="addon-variant-tag">{variant.tag}</span><h3>{variant.name}</h3><p>{variant.detail}</p></div>
            <span className="addon-render-index">{String(VARIANT_INDEX[applied === "arcane" && arcaneLighting ? "arcaneLit" : applied]).padStart(2, "0")} <i>/</i> 05</span>
          </div>
        </div>
      </div>

      <div className="addon-products-head">
        <div><span className="section-label">Built to be used</span><h3>Get the tools &amp; shaders</h3></div>
        <a href="https://agrimart.gumroad.com/" target="_blank" rel="noopener noreferrer">Browse Gumroad <span aria-hidden="true">↗</span></a>
      </div>
      <div className="addon-product-grid">
        {PRODUCTS.map((product) => (
          <article key={product.name} className={`addon-product ${product.featured ? "is-featured" : ""}`}>
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="addon-product-image" aria-label={`Get ${product.name} on Gumroad`}>
              <img src={asset(product.image)} alt="" loading="lazy" />
              <span>GET NOW <b aria-hidden="true">↗</b></span>
            </a>
            <div className="addon-product-copy"><span>{product.type}</span><h4>{product.name}</h4><p>{product.description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
