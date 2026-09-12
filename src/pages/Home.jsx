import { useEffect }        from "react";
import ParallaxHero         from "../components/ParallaxHero";
import ScrollFrameCanvas    from "../components/ScrollFrameCanvas";
import RoadmapSection       from "../components/RoadmapSection";
import GameShowcase         from "../components/GameShowcase";
import FlowingMenu          from "../components/FlowingMenu";
import LogoLoop             from "../components/LogoLoop";
import PatreonSection       from "../components/PatreonSection";
import ReviewsSection       from "../components/ReviewsSection";
import ContactSection       from "../components/ContactSection";
import ShadersSection       from "../components/ShadersSection";
import ShuffleText          from "../components/ShuffleText";
import ScrambledText        from "../components/ScrambledText";
import { asset }            from "../lib/asset";

/* ─── Tool logos ─────────────────────────────────────────── */
const TL = ({ a, c, f }) => (
  <div className="tool-logo" title={f}
    style={{ "--tl-c": c, width:64, height:64, display:"flex",
      alignItems:"center", justifyContent:"center",
      background:"var(--surface)", border:"1px solid var(--border)",
      fontFamily:"var(--font-mono)", fontSize:".7rem", fontWeight:700,
      letterSpacing:".06em", color:c, transition:"all .25s ease",
      cursor:"default" }}
    onMouseEnter={e=>{e.currentTarget.style.background=c; e.currentTarget.style.color="#fff";}}
    onMouseLeave={e=>{e.currentTarget.style.background="var(--surface)"; e.currentTarget.style.color=c;}}
  >{a}</div>
);

const TOOLS = [
  { node:<TL a="BL"  c="#e87d0d" f="Blender"/>,           title:"Blender"            },
  { node:<TL a="UE5" c="#1d6fa4" f="Unreal Engine 5"/>,   title:"Unreal Engine 5"    },
  { node:<TL a="PS"  c="#31a8ff" f="Photoshop"/>,         title:"Photoshop"          },
  { node:<TL a="SD"  c="#ff6300" f="Substance Designer"/>,title:"Substance Designer" },
  { node:<TL a="SP"  c="#ff3d00" f="Substance Painter"/>, title:"Substance Painter"  },
  { node:<TL a="CSP" c="#b43fcb" f="Clip Studio Paint"/>, title:"Clip Studio Paint"  },
  { node:<TL a="AI"  c="#ff9a00" f="Illustrator"/>,       title:"Illustrator"        },
];

/* ─── FlowingMenu disciplines ────────────────────────────── */
const DISCIPLINES = [
  { link:"#scroll-animation", text:"Blender 3D",    label:"3D · Rendering · HDRIs",
    images:[asset("sky.jpg"),asset("metro.jpg"),asset("room.jpg"),
      "https://public-files.gumroad.com/7l26a9autehk7o69n9v9rcdjcmvj",
      "https://public-files.gumroad.com/so1e0yc8zewomv4iey3pp91f73dd"] },
  { link:"#scroll-animation", text:"Unreal Engine 5", label:"Real-time · Environments",
    images:[asset("ue5.jpg")] },
  { link:"#scroll-animation", text:"Photoshop Art", label:"Digital · Illustration",
    images:[asset("ps-valorant.jpg"),asset("ps-windmill.jpg"),asset("ps-canvas.png")] },
];

/* ─── Gallery strip ──────────────────────────────────────── */
const GALLERY = [
  asset("sky.jpg"),asset("metro.jpg"),asset("room.jpg"),asset("ue5.jpg"),
  asset("ps-windmill.jpg"),asset("ps-valorant.jpg"),
  asset("art/beach.webp"),asset("art/gun.webp"),asset("art/santorini.webp"),
  "https://public-files.gumroad.com/7l26a9autehk7o69n9v9rcdjcmvj",
  "https://public-files.gumroad.com/so1e0yc8zewomv4iey3pp91f73dd",
  "https://public-files.gumroad.com/d34rqd01nd7lrbb2mvuk23p33s83",
  "https://public-files.gumroad.com/t1elcqn3ws9ca5iqv2n7cdqhek3b",
];

/* ─── Assets ─────────────────────────────────────────────── */
const ASSETS = [
  { name:"Anime Fountain Shader", tag:"Shader · FREE",
    img:"https://public-files.gumroad.com/d34rqd01nd7lrbb2mvuk23p33s83",
    link:"https://agrimart.gumroad.com/l/animefountain" },
  { name:"Waterfall Shader", tag:"Shader",
    img:"https://public-files.gumroad.com/t1elcqn3ws9ca5iqv2n7cdqhek3b",
    link:"https://agrimart.gumroad.com/l/waterfall" },
  { name:"River Crossing Scene", tag:"Scene Pack",
    img:"https://public-files.gumroad.com/weehzc6knl1rs5z1fgr6v9gxh1kd",
    link:"https://agrimart.gumroad.com/l/xdglk" },
  { name:"Anime Sky HDRI 8K", tag:"HDRI · 8K",
    img:"https://public-files.gumroad.com/7l26a9autehk7o69n9v9rcdjcmvj",
    link:"https://agrimart.gumroad.com/l/pwoyw" },
  { name:"Vibrant HDRIs × 3", tag:"HDRI Pack",
    img:"https://public-files.gumroad.com/so1e0yc8zewomv4iey3pp91f73dd",
    link:"https://agrimart.gumroad.com/" },
  { name:"Anime Sky HDRI Warm", tag:"HDRI",
    img:"https://public-files.gumroad.com/l1qqb7oy602v3elt36k5w3sfkpx3",
    link:"https://agrimart.gumroad.com/" },
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
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.85 });
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }).catch(() => {});
    return () => lenis?.destroy();
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

      {/* 3 DISCIPLINES */}
      <section id="disciplines" className="disciplines-section">
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
      <section id="about" className="about-section">
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
              Blender 3D artist specialising in anime-style rendering, handpainted HDRIs
              and immersive digital environments — bridging traditional art with real-time 3D
              across Blender, UE5 and Photoshop.
            </ScrambledText>
            <div className="skills-grid reveal reveal-d3">
              {["Blender 3D","Anime HDRIs","UE5 Rendering","Digital Art",
                "3D Animation","Shader Design","Parallax Effect","Environment Art",
                "Procedural FX","Asset Design","Art Direction","Clip Studio"].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 ROADMAP */}
      <RoadmapSection />

      {/* 5 TOOLS */}
      <section className="tools-section">
        <div className="tools-label reveal">
          <div className="section-label">Software</div>
        </div>
        <LogoLoop logos={TOOLS} speed={70} logoHeight={42} gap={52} pauseOnHover fadeOut />
      </section>

      {/* 6 SCROLL FRAME ANIMATION */}
      <ScrollFrameCanvas />

      {/* 7 GALLERY MARQUEE */}
      <div className="gallery-strip">
        <div className="gallery-track">
          {[...GALLERY,...GALLERY].map((src,i) => (
            <div key={i} className="gallery-thumb">
              <img src={src} alt="" loading="lazy"
                onError={e => { e.target.style.display="none"; }} />
            </div>
          ))}
        </div>
      </div>

      {/* 7.5 GAMES SHOWCASE */}
      <GameShowcase />

      {/* 8 SHADERS SECTION */}
      <ShadersSection />

      {/* 9 ASSETS */}
      <section id="assets" className="assets-section">
        <div className="assets-inner">
          <div className="section-label reveal">Digital Products</div>
          <h2 className="section-title reveal">Asset<br/>Library</h2>
          <div className="assets-grid">
            {ASSETS.map((a,i) => (
              <a key={i} href={a.link} target="_blank" rel="noopener noreferrer"
                 className={`asset-card reveal reveal-d${i%3}`}>
                <div className="asset-img">
                  <img src={a.img} alt={a.name} loading="lazy" />
                </div>
                <div className="asset-body">
                  <span className="asset-tag">{a.tag}</span>
                  <p className="asset-name">{a.name}</p>
                  <span className="asset-cta">Get it ↗</span>
                </div>
              </a>
            ))}
          </div>
          <div className="assets-cta-wrap reveal">
            <a href="https://agrimart.gumroad.com/" target="_blank" rel="noopener"
               className="assets-all-btn">Browse All on Gumroad ↗</a>
          </div>
        </div>
      </section>

      {/* 10 PATREON */}
      <PatreonSection />

      {/* 11 REVIEWS */}
      <ReviewsSection />

      {/* 12 CONTACT */}
      <ContactSection />

      {/* 13 FOOTER */}
      <footer className="site-footer">
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
