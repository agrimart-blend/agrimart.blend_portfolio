import { useState, useEffect } from "react";
import DomeGallery from "./DomeGallery";
import ShuffleText from "./ShuffleText";
import { asset } from "../lib/asset";

/*
 * Put your shader images in  public/shaders/
 * Named:  shader1.jpg  shader2.jpg  shader3.jpg …
 * They will be auto-discovered up to shader30.jpg
 */

const FALLBACK_IMAGES = [
  { src: asset("sky.jpg"),        alt: "Anime Sky HDRI" },
  { src: asset("metro.jpg"),      alt: "Anime Train Scene" },
  { src: asset("room.jpg"),       alt: "Anime Room Interior" },
  { src: asset("ue5.jpg"),        alt: "UE5 Landscape" },
  { src: asset("ps-windmill.jpg"),alt: "Digital Art – Windmill" },
  { src: asset("ps-valorant.jpg"),alt: "Digital Art – Valorant" },
  { src: "https://public-files.gumroad.com/d34rqd01nd7lrbb2mvuk23p33s83", alt: "Fountain Shader" },
  { src: "https://public-files.gumroad.com/t1elcqn3ws9ca5iqv2n7cdqhek3b", alt: "Waterfall Shader" },
  { src: "https://public-files.gumroad.com/ogz7z3yv44usot34y1aef21tc7kq", alt: "Wood Shader" },
  { src: "https://public-files.gumroad.com/7l26a9autehk7o69n9v9rcdjcmvj", alt: "Anime HDRI" },
  { src: "https://public-files.gumroad.com/so1e0yc8zewomv4iey3pp91f73dd", alt: "HDRI Pack" },
];

export default function ShadersSection() {
  const [images, setImages] = useState(FALLBACK_IMAGES);

  /* Auto-discover shader1.jpg … shader30.jpg from public/shaders/ */
  useEffect(() => {
    let found = [];
    let pending = 30;
    const done = () => {
      pending--;
      if (pending === 0) {
        if (found.length > 0) setImages([...found, ...FALLBACK_IMAGES]);
      }
    };
    for (let i = 1; i <= 30; i++) {
      const src = asset(`shaders/shader${i}.jpg`);
      const img = new Image();
      img.onload  = () => { found.push({ src, alt: `Shader ${i}` }); done(); };
      img.onerror = () => done();
      img.src = src;
    }
  }, []);

  return (
    <section id="shaders" className="shaders-section">
      <div className="shaders-header reveal">
        <div className="section-label">Shaders &amp; Stylization</div>
        <ShuffleText
          tag="h2"
          text="SHADERS"
          className="section-title shaders-title"
          triggerOnHover
          autoPlay={false}
        />
        <p className="shaders-desc">
          Drag to rotate · Click to enlarge · All shaders made in Blender 3D
        </p>
      </div>

      <div className="shaders-dome-wrap reveal">
        <div className="shaders-dome">
          <DomeGallery
            images={images}
            fit={0.68}
            minRadius={560}
            maxRadius={820}
            padFactor={0.32}
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
            autoRotateSpeed={5}
          />

          <div className="dome-scan" />
          <div className="dome-corner dome-corner-tl" />
          <div className="dome-corner dome-corner-tr" />
          <div className="dome-corner dome-corner-bl" />
          <div className="dome-corner dome-corner-br" />
          <div className="dome-hud dome-hud-tl">
            <span className="dome-hud-dot" />
            LIVE · SEG-28
          </div>
          <div className="dome-hud dome-hud-tr">R 560–820</div>
          <div className="dome-hud dome-hud-bl">DRAG // ROTATE</div>
          <div className="dome-hud dome-hud-br">DOME.SYS_01</div>
        </div>
      </div>

      <div className="shaders-note reveal">
        <span>
          Add your own images to <code>public/shaders/shader1.jpg</code> …
          they'll appear automatically.
        </span>
      </div>
    </section>
  );
}
