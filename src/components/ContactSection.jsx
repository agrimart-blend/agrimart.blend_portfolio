const LINKS = [
  { icon:"▶", platform:"YouTube",    handle:"@ytagrimart",         href:"https://www.youtube.com/@ytagrimart"          },
  { icon:"◈", platform:"Instagram",  handle:"@agrimart.blend",     href:"https://www.instagram.com/agrimart.blend/"    },
  { icon:"◆", platform:"Gumroad",    handle:"agrimart.gumroad.com",href:"https://agrimart.gumroad.com/"               },
  { icon:"◎", platform:"GitHub",     handle:"agrimart-blend",      href:"https://github.com/agrimart-blend"           },
  { icon:"✦", platform:"ArtStation", handle:"agrimart",            href:"https://www.artstation.com/agrimart"          },
];

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-left">
          <div className="section-label reveal">Get In Touch</div>
          <h2 className="section-title reveal">Connect &amp;<br />Collaborate</h2>
          <p className="contact-body reveal reveal-d1">
            Open for commissions, collaborations, and custom asset creation. Let's build something remarkable.
          </p>
          <div className="contact-links reveal reveal-d2">
            {LINKS.map(l => (
              <a key={l.platform} href={l.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-link-icon">{l.icon}</span>
                <span className="contact-link-info">
                  <span className="contact-link-platform">{l.platform}</span>
                  <span className="contact-link-handle">{l.handle}</span>
                </span>
                <span className="contact-link-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
        <div className="contact-right reveal reveal-d1">
          <div className="contact-art">
            <img src="/ps-windmill.jpg" alt="Artwork" loading="lazy"
              onError={e => { e.target.src="/sky.jpg"; }} />
            <div className="contact-art-overlay">
              {[...Array(6)].map((_,i) => (
                <div key={i} className="contact-geo-diamond"
                  style={{ top:`${15+i*14}%`, left:`${8+(i%3)*30}%` }} />
              ))}
              <p className="contact-art-text">Let's create<br />something<br />remarkable</p>
            </div>
          </div>
          <div className="contact-stats">
            {[{n:"50+",l:"Assets Released"},{n:"★5.0",l:"Avg Rating"},{n:"UE5",l:"Tech Stack"}].map(s => (
              <div key={s.n} className="contact-stat">
                <span className="contact-stat-n">{s.n}</span>
                <span className="contact-stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
