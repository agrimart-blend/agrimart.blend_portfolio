import AccordionGalleryComponent from "./ReactBitsAccordionGallery";
import { asset } from "../lib/asset";
import "./AccordionGallery.css";

const STUDIES = [
  {
    image: asset("art/meteor.webp"),
    label: "Meteor Night · Blender",
    cursor: asset("artworks/cursor-blender.svg"),
    alt: "Stylised 3D scene in Blender: a Japanese village beneath two falling stars",
  },
  {
    image: asset("art/santorini.webp"),
    label: "Santorini Café · Blender",
    cursor: asset("artworks/cursor-blender.svg"),
    alt: "Painterly 3D environment in Blender showing a Mediterranean café",
  },
  {
    image: asset("artworks/wall-plaster.webp"),
    label: "Painted Plaster · Substance Designer",
    cursor: asset("artworks/cursor-substance-designer.svg"),
    alt: "Warm, hand-painted plaster material made in Substance Designer",
  },
  {
    image: asset("artworks/anime-grass.webp"),
    label: "Anime Grass · Substance Designer",
    cursor: asset("artworks/cursor-substance-designer.svg"),
    alt: "Stylised grass ground texture created in Substance Designer",
  },
  {
    image: asset("ps-valorant.jpg"),
    label: "Valorant Study · Photoshop",
    cursor: asset("artworks/cursor-photoshop.svg"),
    alt: "Digital painting made in Photoshop",
  },
  {
    image: asset("ps-windmill.jpg"),
    label: "Windmill Landscape · Photoshop",
    cursor: asset("artworks/cursor-photoshop.svg"),
    alt: "Environment painting made in Photoshop",
  },
  {
    image: asset("sky.jpg"),
    label: "Power Line Scene · Blender + Photoshop sky",
    cursor: asset("artworks/cursor-blender.svg"),
    alt: "A 3D power-line environment rendered in Blender, with a sky hand-painted in Photoshop",
  },
  {
    image: asset("ue5.jpg"),
    label: "Stylised Landscape · Unreal Engine 5",
    cursor: asset("artworks/cursor-unreal.svg"),
    alt: "Real-time landscape environment built and lit in Unreal Engine 5",
  },
  {
    image: asset("free-drive/lighthouse-island.webp"),
    label: "Island Coast · Blender + Godot",
    cursor: asset("artworks/cursor-godot.svg"),
    alt: "Island coast environment made in Blender and used in the Godot racing game",
  },
  {
    image: asset("wallfall/shot-1.webp"),
    label: "Wallfall Barricade · Godot + Nakama",
    cursor: asset("artworks/cursor-godot.svg"),
    alt: "Real gameplay screenshot from Wallfall Barricade, an online strategy game made in Godot",
  },
  {
    image: asset("games/pixel-adventure-gameplay.png"),
    label: "2D Adventure · Godot · In Development",
    cursor: asset("artworks/cursor-godot.svg"),
    alt: "Gameplay screenshot from an original pixel-art adventure being built in Godot",
  },
];

const TOOLS = [
  { name: "Blender", icon: asset("artworks/cursor-blender.svg") },
  { name: "Substance Designer", icon: asset("artworks/cursor-substance-designer.svg") },
  { name: "Substance Painter", icon: asset("artworks/cursor-substance-painter.svg") },
  { name: "Photoshop", icon: asset("artworks/cursor-photoshop.svg") },
  { name: "Godot", icon: asset("artworks/cursor-godot.svg") },
  { name: "Unreal Engine 5", icon: asset("artworks/cursor-unreal.svg") },
];

export default function AccordionGallery() {
  return (
    <section className="artwork-section" aria-labelledby="artwork-title">
      <div className="artwork-inner">
        <header className="artwork-heading reveal">
          <div>
            <span className="section-label">Selected work · 01—11</span>
            <h2 id="artwork-title" className="section-title">Pixels to<br />playable worlds.</h2>
          </div>
          <p className="artwork-intro">
            Hover, focus or tap a panel to expand it. Each title names the work and the app
            behind it; the cursor mark follows the application as you explore.
          </p>
        </header>

        <div className="artwork-shell reveal reveal-d1">
          <div className="artwork-shell-core">
            <div className="artwork-gallery-meta">
              <span>Artwork index · 11 pieces</span>
              <span>Move, focus or tap to explore</span>
            </div>
            <AccordionGalleryComponent
              items={STUDIES}
              defaultIndex={0}
              expandRatio={0.52}
              trigger="hover"
              overlayColor="#181818"
              duration={0.75}
              parallax={0.95}
              tilt={14}
              height={410}
              gap={4}
              radius={30}
              accentColor="#f1c46f"
              textColor="#ffffff"
            />
          </div>
        </div>

        <div className="artwork-tools reveal reveal-d2">
          <div className="artwork-tools-copy">
            <span className="artwork-tools-kicker">The toolkit</span>
            <span className="artwork-tools-note">Each SVG cursor marks the app used for the work.</span>
          </div>
          <div className="artwork-tool-list" aria-label="Creative applications">
            {TOOLS.map((tool) => (
              <span
                className="artwork-tool"
                key={tool.name}
                tabIndex={0}
                title={tool.name}
                style={{ cursor: `url("${tool.icon}") 16 16, pointer` }}
              >
                <img src={tool.icon} alt="" aria-hidden="true" />
                <span>{tool.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
