import DomeGallery from "./DomeGallery";
import { asset } from "../lib/asset";

const ARTWORKS = [
  { src: "art/meteor.webp", title: "Meteor Night", tool: "Blender 3D", alt: "Japanese village under falling stars, made in Blender" },
  { src: "art/santorini.webp", title: "Santorini Café", tool: "Blender 3D", alt: "Stylised Mediterranean café environment made in Blender" },
  { src: "room.jpg", title: "Tatami Room", tool: "Blender 3D", alt: "Anime-inspired Japanese interior made in Blender" },
  { src: "metro.jpg", title: "River Crossing", tool: "Blender 3D", alt: "Train crossing a river in a stylised Blender environment" },
  { src: "art/donut-render.webp", title: "Sweet Stack", tool: "Blender 3D", alt: "Stylised product food render made in Blender" },
  { src: "art/beach.webp", title: "Painted Coast", tool: "Blender 3D", alt: "Painterly coastal environment rendered in Blender" },
  { src: "ps-valorant.jpg", title: "Windmill Landscape", tool: "Blender + Photoshop", alt: "Blender-made windmill scene with a sky hand-painted in Photoshop" },
  { src: "ps-windmill.jpg", title: "Valorant Weapon Study", tool: "Blender + Photoshop", alt: "3D weapon study finished as a Photoshop composite" },
  { src: "sky.jpg", title: "Power Line Scene", tool: "Blender + Photoshop", alt: "Power-line environment built in Blender with a hand-painted Photoshop sky" },
  { src: "art/gun.webp", title: "Plasma Blaster", tool: "Blender 3D", alt: "Emissive hard-surface prop modelled and rendered in Blender" },
  { src: "ue5.jpg", title: "Stylised Landscape", tool: "Unreal Engine 5", alt: "Real-time stylised landscape built in Unreal Engine 5" },
  { src: "free-drive/coastal-sunset.webp", title: "Coastal World", tool: "Blender + Godot", alt: "Coastal environment created for Free Drive World" },
  { src: "games/pixel-adventure-village.png", title: "Pixel Adventure", tool: "Godot · in development", alt: "Village screenshot from a pixel-art adventure in development" },
  { src: "wallfall/hero.webp", title: "Wallfall Barricade", tool: "Godot + Nakama", alt: "Key art for the online strategy game Wallfall Barricade" },
  { src: "artworks/wall-plaster.webp", title: "Wall Plaster", tool: "Substance Designer", alt: "Stylised plaster wall material made in Substance Designer" },
  { src: "artworks/anime-grass.webp", title: "Anime Grass", tool: "Substance Designer", alt: "Anime-style grass material made in Substance Designer" },
].map((work) => ({ ...work, src: asset(work.src) }));

export default function ArtworkGallerySection() {
  return (
    <section id="selected-work" className="selected-work-section" aria-labelledby="selected-work-title" data-scroll-guide="Selected artworks">
      <header className="selected-work-header reveal">
        <div>
          <div className="section-label">Artwork portfolio · 16 selected pieces</div>
          <h2 id="selected-work-title" className="section-title selected-work-title">Scenes, props<br />&amp; playable worlds.</h2>
        </div>
        <p className="selected-work-desc">
          Scenes, props, hand-painted sky composites and real captures from my games, made across
          Blender, Photoshop, Unreal Engine and Godot. Drag to browse; click any piece to enlarge it.
        </p>
      </header>

      <div className="selected-work-gallery-wrap reveal reveal-d1">
        <div className="selected-work-gallery">
          <DomeGallery
            images={ARTWORKS.map(({ src, alt }) => ({ src, alt }))}
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
          <div className="dome-hud dome-hud-tl"><span className="dome-hud-dot" />16 WORKS · 6 TOOLS</div>
          <div className="dome-hud dome-hud-bl">DRAG TO EXPLORE · CLICK TO ENLARGE</div>
          <div className="dome-hud dome-hud-br">AGRIMART.BLEND</div>
        </div>
      </div>

      <div className="selected-work-index" aria-label="Artwork index">
        {ARTWORKS.map((work, index) => (
          <div className="selected-work-index-item" key={work.title}>
            <span className="selected-work-index-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="selected-work-index-copy">
              <strong>{work.title}</strong>
              <span>{work.tool}</span>
            </span>
          </div>
        ))}
      </div>

      <div id="shaders" className="shader-products">
        <div className="shader-products-copy">
          <span className="section-label">Blender shader tools</span>
          <p>Try Arcane Shader and Edge Glow on the live model, or open their Gumroad pages.</p>
        </div>
        <div className="shader-product-actions">
          <a className="shader-product-link shader-product-link-primary" href="https://agrimart.gumroad.com/l/paint" target="_blank" rel="noopener noreferrer">
            Get Arcane Shader <span aria-hidden="true">↗</span>
          </a>
          <a className="shader-product-link" href="https://agrimart.gumroad.com/l/edge_glow" target="_blank" rel="noopener noreferrer">
            Get Edge Glow · Free <span aria-hidden="true">↗</span>
          </a>
          <a className="shader-workbench-link" href="#/3d">Open the interactive Blender workbench <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
