import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "../lib/asset";
import ScrollCue from "./ScrollCue";
import "../styles/addon-workbench.css";

gsap.registerPlugin(ScrollTrigger);

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
    link: "https://agrimart.gumroad.com/l/paint",
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
  { id: "arcane", label: "Arcane Shader", sub: "Painterly material", link: "https://agrimart.gumroad.com/l/paint", cta: "Get now" },
  { id: "edge", label: "Edge Glow", sub: "Luminous contours", link: "https://agrimart.gumroad.com/l/edge_glow", cta: "Get now" },
  { id: "combined", label: "Arcane + Edge Glow", sub: "Combined effect", link: "https://agrimart.gumroad.com/", cta: "Get both" },
];

const VARIANT_INDEX = { basic: 1, arcane: 2, arcaneLit: 3, edge: 4, combined: 5 };

export default function BlenderAddonWorkbench() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [applied, setApplied] = useState("basic");
  const [arcaneLighting, setArcaneLighting] = useState(false);
  const variant = VARIANTS[applied === "arcane" && arcaneLighting ? "arcaneLit" : applied];

  const apply = (id) => {
    setApplied(id);
    setArcaneLighting(false);
  };

  useEffect(() => {
    if (!trackRef.current || !stageRef.current) return undefined;
    const media = gsap.matchMedia();
    media.add("(min-width: 1001px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: stageRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(stageRef.current, { scale: 0.91, y: 44, opacity: 0.52, borderRadius: "12px" }, { scale: 1, y: 0, opacity: 1, borderRadius: "0px", duration: 0.22, ease: "none" })
        .to(stageRef.current, { scale: 1, y: 0, opacity: 1, duration: 0.56, ease: "none" })
        .to(stageRef.current, { scale: 0.96, y: -24, opacity: 0.45, borderRadius: "12px", duration: 0.22, ease: "none" });
      return () => timeline.scrollTrigger?.kill();
    });
    return () => media.revert();
  }, []);

  return (
    <section id="addon-lab" className="addon-lab" aria-labelledby="addon-lab-title">
      <div className="addon-stage-track" ref={trackRef}>
        <div className="addon-stage" ref={stageRef}>
          <div className="addon-lab-head">
            <span className="section-label">Blender · tools I built</span>
            <h2 id="addon-lab-title" className="t3d-h2">Choose a shader.<br />See it on the model.</h2>
            <p className="addon-lab-intro">Press <strong>Apply</strong> to change the preview. Press <strong>Get now</strong> to open that add-on on Gumroad.</p>
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
                <p className="addon-instruction">Compare four shader choices. The Arcane lighting switch adds another render.</p>
                <div className="addon-options">
                  {OPTIONS.map((option, index) => (
                    <article className={`addon-option ${applied === option.id ? "is-applied" : ""}`} key={option.id}>
                      <span className="addon-option-index">0{index + 1}</span>
                      <div className="addon-option-copy">
                        <strong>{option.label}</strong><small>{option.sub}</small>
                      </div>
                      <div className="addon-option-actions">
                        <button
                          className="addon-apply"
                          type="button"
                          onClick={() => apply(option.id)}
                          aria-pressed={applied === option.id}
                        >
                          {applied === option.id ? "Applied" : "Apply"}
                        </button>
                        {option.link && <a className="addon-get-link" href={option.link} target="_blank" rel="noopener noreferrer">{option.cta} <span aria-hidden="true">↗</span></a>}
                      </div>
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
                <p className="addon-panel-footnote">Lighting is adjustable in both add-ons. This preview uses the supplied lit Arcane render.</p>
              </div>
              <div className="addon-panel-footer"><span className="addon-status-dot" /> READY · BLENDER PREVIEW</div>
            </aside>

            <div className="addon-viewport">
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
          <ScrollCue href="#addon-products" current="Blender shader preview" label="V · Scroll for add-ons & Gumroad links" />
        </div>
      </div>

      <div id="addon-products" className="addon-products">
        <div className="addon-products-head">
          <div><span className="section-label">Built to be used</span><h3>Get the tools &amp; shaders</h3></div>
          <a href="https://agrimart.gumroad.com/" target="_blank" rel="noopener noreferrer">Browse Gumroad <span aria-hidden="true">↗</span></a>
        </div>
        <div className="addon-product-grid">
          {PRODUCTS.map((product) => (
            <article key={product.name} className={`addon-product ${product.featured ? "is-featured" : ""}`}>
              <a href={product.link} target="_blank" rel="noopener noreferrer" className="addon-product-image" aria-label={`Get ${product.name} on Gumroad`}>
                <img src={product.image.startsWith("https://") ? product.image : asset(product.image)} alt={product.name} loading="lazy" />
                <span>GET NOW <b aria-hidden="true">↗</b></span>
              </a>
              <div className="addon-product-copy"><span>{product.type}</span><h4>{product.name}</h4><p>{product.description}</p></div>
            </article>
          ))}
        </div>
        <ScrollCue href="#t3d-game-worlds" current="Blender shader products" label="V · Scroll to game environments" />
      </div>
    </section>
  );
}
