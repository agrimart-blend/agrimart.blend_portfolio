import { useEffect }        from "react";
import ParallaxHero         from "../components/ParallaxHero";
import ScrollFrameCanvas    from "../components/ScrollFrameCanvas";
import GameShowcase         from "../components/GameShowcase";
import FlowingMenu          from "../components/FlowingMenu";
import LogoLoop             from "../components/LogoLoop";
import PatreonSection       from "../components/PatreonSection";
import ReviewsSection       from "../components/ReviewsSection";
import ContactSection       from "../components/ContactSection";
import ArtworkGallerySection from "../components/ArtworkGallerySection";
import AccordionGallery    from "../components/AccordionGallery";
import ShuffleText          from "../components/ShuffleText";
import ScrambledText        from "../components/ScrambledText";
import { asset }            from "../lib/asset";

/* ─── Tools shown with their supplied app marks ───────────── */
const TOOLS = [
  ["Blender", "cursor-blender.svg"],
  ["Unreal Engine 5", "cursor-unreal.svg"],
  ["Photoshop", "cursor-photoshop.svg"],
  ["Substance Designer", "cursor-substance-designer.svg"],
  ["Substance Painter", "cursor-substance-painter.svg"],
  ["Godot", "cursor-godot.svg"],
].map(([name, icon]) => ({
  title: name,
  node: (
    <span className="tool-logo">
      <img src={asset(`artworks/${icon}`)} alt="" />
      <span>{name}</span>
    </span>
  ),
}));

/* ─── FlowingMenu disciplines ────────────────────────────── */
const DISCIPLINES = [
  { link:"#/3d", text:"Blender 3D",    label:"3D · Rendering · HDRIs",
    images:[asset("art/meteor.webp"),asset("sky.jpg"),asset("metro.jpg"),asset("room.jpg"),
      asset("art/donut-render.webp"),
      "https://public-files.gumroad.com/7l26a9autehk7o69n9v9rcdjcmvj",
      "https://public-files.gumroad.com/so1e0yc8zewomv4iey3pp91f73dd"] },
  { link:"#/3d", text:"Unreal Engine 5", label:"Real-time · Environments",
    images:[asset("ue5.jpg")] },
  { link:"#/2d", text:"Blender + Photoshop", label:"Painted skies · 3D composites",
    images:[asset("ps-valorant.jpg"),asset("ps-windmill.jpg"),asset("sky.jpg")] },
  { link:"#/games", text:"Games", label:"Racing · Strategy · 2D Adventure (WIP)",
    images:[asset("free-drive/promo-race-ui.webp"),asset("games/wallfall-play-with-friends.webp"),
      asset("games/pixel-adventure-gameplay.png")] },
];

export default function Home() {
  /* scroll-reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* lenis smooth scroll */
  useEffect(() => {
    let lenis;
    let rafId = 0;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.85 });
      const raf = t => {
        if (!lenis) return;
        lenis.raf(t);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }).catch(() => {});
    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return (
    <main id="home-main">
      <div className="grain-overlay" aria-hidden="true" />

      {/* 1 HERO */}
      <ParallaxHero />

      {/* 2 MARQUEE BAND */}
      <div className="marquee-band" aria-hidden="true">
        <div className="marquee-band-track">
          {[...Array(4)].map((_,i) => (
            <span key={i} className="marquee-band-item">
              3D ARTIST&nbsp;·&nbsp;BLENDER&nbsp;·&nbsp;UE5&nbsp;·&nbsp;
              PHOTOSHOP&nbsp;·&nbsp;DIGITAL ART&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* 4 DISCIPLINES */}
      <section id="disciplines" className="disciplines-section" data-scroll-guide="Work categories">
        <div className="disciplines-header reveal">
          <div className="section-label">Disciplines</div>
          <h2 className="section-title" style={{ marginBottom:0 }}>Work<br/>Categories</h2>
        </div>
        <div className="disciplines-menu">
          <FlowingMenu
            items={DISCIPLINES}
            bgColor="var(--bg)"
            textColor="var(--text)"
            marqueeBgColor="var(--bg-dark)"
            marqueeTextColor="var(--bg)"
            borderColor="var(--border)"
          />
        </div>
      </section>

      {/* 4 ABOUT */}
      <section id="about" className="about-section" data-scroll-guide="About Agrim">
        <div className="about-inner">
          <div className="about-left reveal">
            <div className="about-name-geo">
              <div className="about-geo-accent" />
              <h2 className="about-name">
                Agrim<br/><span className="about-name-hi">Kaushal</span>
              </h2>
              <div className="about-geo-corner" />
            </div>
            <span className="about-handle reveal reveal-d1">@agrimart.blend</span>
          </div>
          <div className="about-right">
            <div className="section-label reveal">About</div>
            <ScrambledText className="about-scrambled scrambled-root reveal reveal-d1" radius={80}>
              Blender 3D artist creating anime-inspired environments, hand-painted skies and
              shader tools. I paint skies in Photoshop, build real-time worlds in Unreal Engine,
              and make games in Godot.
            </ScrambledText>
            <div className="skills-grid reveal reveal-d3">
              {["Blender environments","Hand-painted skies","Blender shader tools",
                "Unreal Engine 5","Godot games","Photoshop art","Substance Designer","Substance Painter"].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 TOOLS */}
      <section className="tools-section" data-scroll-guide="Software tools">
        <div className="tools-label reveal">
          <div className="section-label">Software</div>
        </div>
        <LogoLoop logos={TOOLS} speed={70} logoHeight={42} gap={52} pauseOnHover fadeOut />
      </section>

      {/* 6 MATERIAL ARTWORK — interactive studies with tool-specific cursors */}
      <AccordionGallery />

      {/* Buyer proof follows the first substantial body of portfolio work. */}
      <ReviewsSection />

      {/* 7 SCROLL FRAME ANIMATION */}
      <ScrollFrameCanvas />

      {/* 7.5 GAMES SHOWCASE */}
      <GameShowcase />

      {/* 8 SELECTED ARTWORKS + PRODUCT LINKS */}
      <ArtworkGallerySection />

      {/* Optional studio support stays below the main portfolio and shop proof. */}
      <PatreonSection />

      {/* 13 CONTACT */}
      <ContactSection />

      {/* 14 FOOTER */}
      <footer className="site-footer" data-scroll-guide="Portfolio footer">
        <div className="footer-top">
          <div className="footer-shuffle-wrap">
            <span>I AM A&nbsp;</span>
            <ShuffleText text="3D ARTIST" tag="span" className="footer-shuffle-text"
              triggerOnHover autoPlay={false} />
          </div>
          <div className="footer-socials">
            {[
              { l:"YouTube",   h:"https://www.youtube.com/@ytagrimart" },
              { l:"Instagram", h:"https://www.instagram.com/agrimart.blend/" },
              { l:"Gumroad",   h:"https://agrimart.gumroad.com/" },
              { l:"GitHub",    h:"https://github.com/agrimart-blend" },
            ].map(s=>(
              <a key={s.l} href={s.h} target="_blank" rel="noopener"
                 className="footer-social-link">{s.l}</a>
            ))}
          </div>
        </div>
        <div className="footer-logo-big">
          <ShuffleText text="AGRIMART" tag="span" className="footer-name-shuffle"
            triggerOnHover autoPlay={false} />
          <span className="footer-name-dot">.blend</span>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Agrimart.blend — All rights reserved</span>
          <span className="footer-stack">Blender · UE5 · Photoshop · React</span>
        </div>
      </footer>
    </main>
  );
}
