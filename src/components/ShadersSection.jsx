import DomeGallery from "./DomeGallery";
import { asset } from "../lib/asset";

const SHADER_VARIANTS = [
  { src: asset("addons/blender-basic.jpg"), alt: "Blender model before adding a shader" },
  { src: asset("addons/arcane-no-light.jpg"), alt: "Arcane Shader applied to the Blender model" },
  { src: asset("addons/edge-glow.jpg"), alt: "Edge Glow applied to the Blender model" },
  { src: asset("addons/arcane-edge-glow.jpg"), alt: "Arcane Shader combined with Edge Glow" },
  { src: asset("addons/arcane-with-light.jpg"), alt: "Arcane Shader with its lighting option enabled" },
];

export default function ShadersSection() {
  return (
    <section id="shaders" className="shaders-section" aria-labelledby="shaders-title">
      <header className="shaders-header reveal">
        <div className="section-label">Blender shader studies</div>
        <h2 id="shaders-title" className="section-title shaders-title">Five finishes.<br />One model.</h2>
        <p className="shaders-desc">
          Drag to compare the original model, Arcane Shader, Edge Glow and their combined looks.
        </p>
      </header>

      <div className="shaders-dome-wrap reveal">
        <div className="shaders-dome">
          <DomeGallery
            images={SHADER_VARIANTS}
            fit={0.68}
            minRadius={380}
            maxRadius={680}
            padFactor={0.3}
            dragDampening={3.4}
            segments={28}
            maxVerticalRotationDeg={14}
            grayscale={false}
            overlayBlurColor="#05070a"
            imageBorderRadius="16px"
            openedImageBorderRadius="20px"
            openedImageWidth="480px"
            openedImageHeight="320px"
            autoRotate
            autoRotateSpeed={4}
          />

          <div className="dome-scan" aria-hidden="true" />
          <div className="dome-corner dome-corner-tl" aria-hidden="true" />
          <div className="dome-corner dome-corner-tr" aria-hidden="true" />
          <div className="dome-corner dome-corner-bl" aria-hidden="true" />
          <div className="dome-corner dome-corner-br" aria-hidden="true" />
          <div className="dome-hud dome-hud-tl"><span className="dome-hud-dot" />FIVE TEST RENDERS</div>
          <div className="dome-hud dome-hud-bl">DRAG TO COMPARE</div>
          <div className="dome-hud dome-hud-br">BLENDER · AGRIMART</div>
        </div>
      </div>

      <div className="shader-products">
        <div className="shader-products-copy">
          <span className="section-label">Try the shaders yourself</span>
          <p>Open the Blender workbench for a closer look, or get a shader from Gumroad.</p>
        </div>
        <div className="shader-product-actions">
          <a className="shader-product-link shader-product-link-primary" href="https://agrimart.gumroad.com/l/paint" target="_blank" rel="noopener noreferrer">
            Get Arcane Shader <span aria-hidden="true">↗</span>
          </a>
          <a className="shader-product-link" href="https://agrimart.gumroad.com/l/edge_glow" target="_blank" rel="noopener noreferrer">
            Get Edge Glow · Free <span aria-hidden="true">↗</span>
          </a>
          <a className="shader-workbench-link" href="#/3d">Explore the interactive Blender workbench <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
