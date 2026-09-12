import { useEffect, useRef, useState, useCallback } from "react";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%-+=?";

export default function ShuffleText({
  text = "",
  tag: Tag = "span",
  className = "",
  style = {},
  triggerOnHover = true,
  autoPlay = false,
  speed = 40,       // ms between frames
  stagger = 28,     // ms between letter starts
}) {
  const [chars, setChars] = useState(() => text.split(""));
  const busyRef = useRef(false);
  const timersRef = useRef([]);

  const clear = () => { timersRef.current.forEach(clearInterval); timersRef.current = []; };

  const shuffle = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    clear();
    const letters = text.split("");
    setChars(letters.map(c => c));

    letters.forEach((final, i) => {
      if (final === " ") return;
      let ticks = 0;
      const delay = setTimeout(() => {
        const id = setInterval(() => {
          ticks++;
          setChars(prev => {
            const next = [...prev];
            next[i] = POOL[Math.floor(Math.random() * POOL.length)];
            return next;
          });
          if (ticks >= 6) {
            clearInterval(id);
            setChars(prev => { const next = [...prev]; next[i] = final; return next; });
            if (i === letters.length - 1) busyRef.current = false;
          }
        }, speed);
        timersRef.current.push(id);
      }, i * stagger);
      timersRef.current.push(delay);
    });
  }, [text, speed, stagger]);

  useEffect(() => {
    setChars(text.split(""));
    if (autoPlay) { const t = setTimeout(shuffle, 400); return () => clearTimeout(t); }
  }, [text, autoPlay, shuffle]);

  useEffect(() => () => clear(), []);

  return (
    <Tag
      className={className}
      style={style}
      onMouseEnter={triggerOnHover ? shuffle : undefined}
    >
      {chars.map((c, i) => (
        <span key={i} style={{ display: "inline-block", minWidth: c === " " ? "0.3em" : undefined }}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </Tag>
  );
}
