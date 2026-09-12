import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./FlowingMenu.css";

export default function FlowingMenu({
  items = [],
  speed = 18,
  textColor = "#f7f5f0",
  bgColor = "#1a1512",
  marqueeBgColor = "#c9613a",
  marqueeTextColor = "#f7f5f0",
  borderColor = "rgba(247,245,240,0.12)",
}) {
  return (
    <div className="fm-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="fm-nav">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({
  link, text, images = [], label = "",
  speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst,
}) {
  const itemRef      = useRef(null);
  const marqueeRef   = useRef(null);
  const innerRef     = useRef(null);
  const animRef      = useRef(null);
  const [reps, setReps] = useState(3);

  const EASE = { duration: 0.6, ease: "expo" };

  const closestEdge = (mx, my, w, h) => {
    const top = (mx - w/2) ** 2 + my ** 2;
    const bot = (mx - w/2) ** 2 + (my - h) ** 2;
    return top < bot ? "top" : "bottom";
  };

  // Set up marquee animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!innerRef.current) return;
      const part = innerRef.current.querySelector(".fm-part");
      if (!part) return;
      const w = part.offsetWidth;
      if (w === 0) return;
      if (animRef.current) animRef.current.kill();
      animRef.current = gsap.to(innerRef.current, {
        x: -w, duration: speed, ease: "none", repeat: -1,
      });
    }, 60);
    return () => { clearTimeout(timer); animRef.current?.kill(); };
  }, [text, images, reps, speed]);

  // Calculate repetitions
  useEffect(() => {
    const calc = () => {
      if (!innerRef.current) return;
      const part = innerRef.current.querySelector(".fm-part");
      if (!part) return;
      const n = Math.ceil(window.innerWidth / (part.offsetWidth || 1)) + 3;
      setReps(Math.max(3, n));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [text, images]);

  const onEnter = (e) => {
    if (!itemRef.current || !marqueeRef.current || !innerRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    gsap.timeline({ defaults: EASE })
      .set(marqueeRef.current,  { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(innerRef.current,    { y: edge === "top" ? "101%"  : "-101%" }, 0)
      .to([marqueeRef.current, innerRef.current], { y: "0%" }, 0);
  };

  const onLeave = (e) => {
    if (!itemRef.current || !marqueeRef.current || !innerRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const edge = closestEdge(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    gsap.timeline({ defaults: EASE })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(innerRef.current,   { y: edge === "top" ? "101%"  : "-101%" }, 0);
  };

  return (
    <div
      ref={itemRef}
      className="fm-item"
      style={{ borderTop: isFirst ? "none" : `1px solid ${borderColor}` }}
    >
      <a
        href={link}
        className="fm-link"
        style={{ color: textColor }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <span className="fm-link-main">{text}</span>
        {label && <span className="fm-link-label">{label}</span>}
      </a>

      {/* Marquee overlay */}
      <div ref={marqueeRef} className="fm-marquee" style={{ backgroundColor: marqueeBgColor }}>
        <div ref={innerRef} className="fm-marquee-inner">
          {[...Array(reps)].map((_, i) => (
            <div key={i} className="fm-part" style={{ color: marqueeTextColor }}>
              <span className="fm-part-text">{text}</span>
              {images.map((src, j) => (
                <div
                  key={j}
                  className="fm-thumb"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
