/* DomeGallery — converted from TypeScript + Tailwind → plain JSX */
import { useEffect, useMemo, useRef, useCallback } from "react";
import { useGesture } from "@use-gesture/react";

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeAngle  = d => ((d % 360) + 360) % 360;
const wrapAngleSigned = deg => { const a = (((deg + 180) % 360) + 360) % 360; return a - 180; };
const getDataNum = (el, name, fb) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fb;
};

function buildItems(pool, seg) {
  const xCols  = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs  = [-3, -1, 1, 3, 5];
  const coords = xCols.flatMap((x, c) =>
    (c % 2 === 0 ? evenYs : oddYs).map(y => ({ x, y, sizeX: 2, sizeY: 2 }))
  );
  if (!pool.length) return coords.map(c => ({ ...c, src: "", alt: "" }));
  const norm = pool.map(img => typeof img === "string" ? { src: img, alt: "" } : { src: img.src || "", alt: img.alt || "" });
  const used = Array.from({ length: coords.length }, (_, i) => norm[i % norm.length]);
  for (let i = 1; i < used.length; i++) {
    if (used[i].src === used[i-1].src) {
      for (let j = i+1; j < used.length; j++) {
        if (used[j].src !== used[i].src) { const t = used[i]; used[i] = used[j]; used[j] = t; break; }
      }
    }
  }
  return coords.map((c, i) => ({ ...c, src: used[i].src, alt: used[i].alt }));
}

function computeItemBaseRotation(ox, oy, sx, sy, segments) {
  const unit = 360 / segments / 2;
  return { rotateX: unit * (oy - (sy-1)/2), rotateY: unit * (ox + (sx-1)/2) };
}

const CSS_INJECT = `
.dg-root{
  position:relative;width:100%;height:100%;
  --radius:600px;
  --circ:calc(var(--radius)*3.14159);
  --rot-y:calc((360deg/var(--segments-x))/2);
  --rot-x:calc((360deg/var(--segments-y))/2);
  --item-width:calc(var(--circ)/var(--segments-x));
  --item-height:calc(var(--circ)/var(--segments-y));
}
.dg-main{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden;
  user-select:none;-webkit-user-select:none;background:transparent;touch-action:none}
.dg-stage{width:100%;height:100%;display:grid;place-items:center;position:absolute;
  inset:0;margin:auto;perspective:calc(var(--radius)*2);perspective-origin:50% 50%}
.dg-sphere{transform:translateZ(calc(var(--radius)*-1));will-change:transform;position:absolute;
  transform-style:preserve-3d}
.dg-item{width:calc(var(--item-width)*var(--item-size-x));height:calc(var(--item-height)*var(--item-size-y));
  position:absolute;top:-999px;bottom:-999px;left:-999px;right:-999px;margin:auto;
  transform-origin:50% 50%;backface-visibility:hidden;transition:transform 300ms;
  transform:rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg)))
            rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg)))
            translateZ(var(--radius));
  transform-style:preserve-3d}
.dg-tile{position:absolute;inset:10px;border-radius:var(--tile-radius,12px);overflow:hidden;
  cursor:pointer;backface-visibility:hidden;-webkit-backface-visibility:hidden;
  transition:transform 300ms,box-shadow .35s ease,border-color .35s ease,filter .35s ease;
  pointer-events:auto;background:#141a22;
  border:1px solid rgba(140,190,255,.14);
  box-shadow:0 0 0 0 rgba(92,225,255,0)}
.dg-tile:hover{border-color:rgba(140,190,255,.65);
  box-shadow:0 0 0 1px rgba(140,190,255,.5),0 0 26px -4px rgba(92,225,255,.6);
  filter:brightness(1.08)}
.dg-tile-ref{position:absolute;inset:10px;pointer-events:none;opacity:0}
.dg-tile img{width:100%;height:100%;object-fit:cover;pointer-events:none;
  backface-visibility:hidden;filter:var(--image-filter,none)}
.dg-overlay{position:absolute;inset:0;margin:auto;z-index:3;pointer-events:none}
.dg-blur-overlay{position:absolute;inset:0;margin:auto;z-index:3;pointer-events:none}
.dg-grad-top{position:absolute;left:0;right:0;top:0;height:120px;z-index:5;
  pointer-events:none;transform:rotate(180deg)}
.dg-grad-bot{position:absolute;left:0;right:0;bottom:0;height:120px;z-index:5;pointer-events:none}
.dg-viewer{position:absolute;inset:0;z-index:20;pointer-events:none;
  display:flex;align-items:center;justify-content:center}
.dg-scrim{position:absolute;inset:0;z-index:10;pointer-events:none;opacity:0;
  transition:opacity .5s ease;background:rgba(4,7,12,.6);backdrop-filter:blur(5px)}
.dg-frame{height:100%;aspect-ratio:1;display:flex}
[data-dg-enlarging="true"] .dg-scrim{opacity:1!important;pointer-events:all!important}
.sphere,.sphere-item,.dg-sphere,.dg-item{transform-style:preserve-3d}
`;

export default function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#120F17",
  maxVerticalRotationDeg = 5,
  dragSensitivity = 20,
  enlargeTransitionMs = 300,
  segments = 35,
  dragDampening = 2,
  openedImageWidth = "400px",
  openedImageHeight = "400px",
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = false,
  autoRotate = true,
  autoRotateSpeed = 6,
}) {
  const rootRef   = useRef(null);
  const mainRef   = useRef(null);
  const sphereRef = useRef(null);
  const frameRef  = useRef(null);
  const viewerRef = useRef(null);
  const scrimRef  = useRef(null);
  const focusedElRef   = useRef(null);
  const origPosRef     = useRef(null);
  const rotRef         = useRef({ x: 0, y: 0 });
  const startRotRef    = useRef({ x: 0, y: 0 });
  const startPosRef    = useRef(null);
  const draggingRef    = useRef(false);
  const cancelTapRef   = useRef(false);
  const movedRef       = useRef(false);
  const inertiaRAF     = useRef(null);
  const ptrTypeRef     = useRef("mouse");
  const tapTargetRef   = useRef(null);
  const openingRef     = useRef(false);
  const openStartRef   = useRef(0);
  const lastDragEnd    = useRef(0);
  const scrollLocked   = useRef(false);
  const hoverRef       = useRef(false);

  const lockScroll = useCallback(() => {
    if (scrollLocked.current) return;
    scrollLocked.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLocked.current) return;
    if (rootRef.current?.getAttribute("data-dg-enlarging") === "true") return;
    scrollLocked.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (x, y) => {
    if (sphereRef.current)
      sphereRef.current.style.transform =
        `translateZ(calc(var(--radius)*-1)) rotateX(${x}deg) rotateY(${y}deg)`;
  };

  /* ResizeObserver — compute radius & CSS vars */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      const minDim = Math.min(w, h), maxDim = Math.max(w, h);
      const basis = fitBasis === "min" ? minDim : fitBasis === "max" ? maxDim
                  : fitBasis === "width" ? w : fitBasis === "height" ? h
                  : (w/h >= 1.3 ? w : minDim);
      let radius = clamp(Math.min(basis * fit, h * 1.35), minRadius, maxRadius);
      const pad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty("--radius", `${Math.round(radius)}px`);
      root.style.setProperty("--viewer-pad", `${pad}px`);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none");
      applyTransform(rotRef.current.x, rotRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, imageBorderRadius, openedImageBorderRadius, grayscale]);

  /* Inertia */
  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) { cancelAnimationFrame(inertiaRAF.current); inertiaRAF.current = null; }
  }, []);

  const startInertia = useCallback((vx, vy) => {
    let vX = clamp(vx, -1.4, 1.4) * 80;
    let vY = clamp(vy, -1.4, 1.4) * 80;
    let frames = 0;
    const d = clamp(dragDampening, 0, 1);
    const friction = 0.94 + 0.055 * d;
    const stop = 0.015 - 0.01 * d;
    const maxF = Math.round(90 + 270 * d);
    const step = () => {
      vX *= friction; vY *= friction;
      if (Math.abs(vX) < stop && Math.abs(vY) < stop) { inertiaRAF.current = null; return; }
      if (++frames > maxF) { inertiaRAF.current = null; return; }
      const nx = clamp(rotRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const ny = wrapAngleSigned(rotRef.current.y + vX / 200);
      rotRef.current = { x: nx, y: ny };
      applyTransform(nx, ny);
      inertiaRAF.current = requestAnimationFrame(step);
    };
    stopInertia();
    inertiaRAF.current = requestAnimationFrame(step);
  }, [dragDampening, maxVerticalRotationDeg, stopInertia]);

  /* Idle hover tracking (pauses auto-rotate while the pointer rests on the dome) */
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const enter = () => { hoverRef.current = true; };
    const leave = () => { hoverRef.current = false; };
    main.addEventListener("pointerenter", enter);
    main.addEventListener("pointerleave", leave);
    return () => {
      main.removeEventListener("pointerenter", enter);
      main.removeEventListener("pointerleave", leave);
    };
  }, []);

  /* Slow idle auto-rotation — a living holographic globe until the viewer takes over */
  useEffect(() => {
    if (!autoRotate) return;
    let raf;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min(now - last, 100);
      last = now;
      if (!draggingRef.current && !focusedElRef.current && !inertiaRAF.current && !hoverRef.current) {
        const ny = wrapAngleSigned(rotRef.current.y + (autoRotateSpeed * dt) / 1000);
        rotRef.current = { x: rotRef.current.x, y: ny };
        applyTransform(rotRef.current.x, ny);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [autoRotate, autoRotateSpeed]);

  /* Drag via use-gesture */
  useGesture({
    onDragStart: ({ event: ev }) => {
      if (focusedElRef.current) return;
      stopInertia();
      ptrTypeRef.current = ev.pointerType || "mouse";
      if (ptrTypeRef.current === "touch") { ev.preventDefault(); lockScroll(); }
      draggingRef.current = true;
      cancelTapRef.current = false;
      movedRef.current = false;
      startRotRef.current = { ...rotRef.current };
      startPosRef.current = { x: ev.clientX, y: ev.clientY };
      tapTargetRef.current = ev.target?.closest?.(".dg-tile") || null;
    },
    onDrag: ({ event: ev, last, velocity: vel = [0,0], direction: dir = [0,0], movement }) => {
      if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
      if (ptrTypeRef.current === "touch") ev.preventDefault();
      const dx = ev.clientX - startPosRef.current.x;
      const dy = ev.clientY - startPosRef.current.y;
      if (!movedRef.current && dx*dx + dy*dy > 16) movedRef.current = true;
      const nx = clamp(startRotRef.current.x - dy / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
      const ny = startRotRef.current.y + dx / dragSensitivity;
      if (rotRef.current.x !== nx || rotRef.current.y !== ny) {
        rotRef.current = { x: nx, y: ny };
        applyTransform(nx, ny);
      }
      if (last) {
        draggingRef.current = false;
        const distSq = dx*dx + dy*dy;
        const TAP = ptrTypeRef.current === "touch" ? 10 : 6;
        const isTap = distSq <= TAP * TAP;
        let vx = vel[0] * dir[0], vy = vel[1] * dir[1];
        if (!isTap && Math.abs(vx) < .001 && Math.abs(vy) < .001 && Array.isArray(movement)) {
          vx = (movement[0] / dragSensitivity) * 0.02;
          vy = (movement[1] / dragSensitivity) * 0.02;
        }
        if (!isTap && (Math.abs(vx) > .005 || Math.abs(vy) > .005)) startInertia(vx, vy);
        startPosRef.current = null;
        cancelTapRef.current = !isTap;
        if (isTap && tapTargetRef.current && !focusedElRef.current) openItem(tapTargetRef.current);
        tapTargetRef.current = null;
        if (cancelTapRef.current) setTimeout(() => { cancelTapRef.current = false; }, 120);
        if (ptrTypeRef.current === "touch") unlockScroll();
        if (movedRef.current) lastDragEnd.current = performance.now();
        movedRef.current = false;
      }
    },
  }, { target: mainRef, eventOptions: { passive: false } });

  /* Scrim close */
  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;
    const close = () => {
      if (performance.now() - openStartRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement;
      const overlay = viewerRef.current?.querySelector(".dg-enlarge");
      if (!overlay) return;
      const refDiv = parent.querySelector(".dg-tile-ref");
      const origPos = origPosRef.current;
      if (!origPos) {
        overlay.remove(); if (refDiv) refDiv.remove();
        parent.style.setProperty("--rot-y-delta","0deg");
        parent.style.setProperty("--rot-x-delta","0deg");
        el.style.visibility = ""; el.style.zIndex = 0;
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-dg-enlarging");
        openingRef.current = false;
        return;
      }
      const cr = overlay.getBoundingClientRect();
      const rr = rootRef.current.getBoundingClientRect();
      const anim = document.createElement("div");
      anim.style.cssText = `position:absolute;left:${cr.left-rr.left}px;top:${cr.top-rr.top}px;
        width:${cr.width}px;height:${cr.height}px;z-index:9999;border-radius:${openedImageBorderRadius};
        overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.55),0 0 0 1px rgba(140,190,255,.3),0 0 40px -8px rgba(92,225,255,.4);
        transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;
        filter:${grayscale?"grayscale(1)":"none"}`;
      const oi = overlay.querySelector("img");
      if (oi) { const ni = oi.cloneNode(); ni.style.cssText="width:100%;height:100%;object-fit:cover"; anim.appendChild(ni); }
      overlay.remove();
      rootRef.current.appendChild(anim);
      void anim.getBoundingClientRect();
      requestAnimationFrame(() => {
        anim.style.left   = `${origPos.left - rr.left}px`;
        anim.style.top    = `${origPos.top  - rr.top}px`;
        anim.style.width  = `${origPos.width}px`;
        anim.style.height = `${origPos.height}px`;
        anim.style.opacity = "0";
      });
      anim.addEventListener("transitionend", () => {
        anim.remove(); origPosRef.current = null;
        if (refDiv) refDiv.remove();
        parent.style.setProperty("--rot-y-delta","0deg");
        parent.style.setProperty("--rot-x-delta","0deg");
        el.style.visibility = "";
        el.style.zIndex = 0;
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-dg-enlarging");
        openingRef.current = false;
        if (!draggingRef.current) document.body.classList.remove("dg-scroll-lock");
      }, { once: true });
    };
    scrim.addEventListener("click", close);
    const onKey = e => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { scrim.removeEventListener("click", close); window.removeEventListener("keydown", onKey); };
  }, [enlargeTransitionMs, openedImageBorderRadius, grayscale]);

  const openItem = (el) => {
    if (openingRef.current) return;
    openingRef.current = true;
    openStartRef.current = performance.now();
    lockScroll();
    const parent = el.parentElement;
    focusedElRef.current = el;
    const ox = getDataNum(parent,"offsetX",0), oy = getDataNum(parent,"offsetY",0);
    const sx = getDataNum(parent,"sizeX",2),   sy = getDataNum(parent,"sizeY",2);
    const pRot = computeItemBaseRotation(ox, oy, sx, sy, segments);
    const pY = normalizeAngle(pRot.rotateY);
    const gY = normalizeAngle(rotRef.current.y);
    let rY = -(pY + gY) % 360;
    if (rY < -180) rY += 360;
    parent.style.setProperty("--rot-y-delta",`${rY}deg`);
    parent.style.setProperty("--rot-x-delta",`${-pRot.rotateX - rotRef.current.x}deg`);
    const refDiv = document.createElement("div");
    refDiv.className = "dg-tile-ref";
    refDiv.style.transform = `rotateX(${-pRot.rotateX}deg) rotateY(${-pRot.rotateY}deg)`;
    parent.appendChild(refDiv);
    void refDiv.offsetHeight;
    const tr = refDiv.getBoundingClientRect();
    const mr = mainRef.current?.getBoundingClientRect();
    const fr = frameRef.current?.getBoundingClientRect();
    if (!mr || !fr || tr.width <= 0) {
      openingRef.current = false; focusedElRef.current = null;
      parent.removeChild(refDiv); unlockScroll(); return;
    }
    origPosRef.current = { left: tr.left, top: tr.top, width: tr.width, height: tr.height };
    el.style.visibility = "hidden"; el.style.zIndex = 0;
    const overlay = document.createElement("div");
    overlay.className = "dg-enlarge";
    overlay.style.cssText = `position:absolute;left:${fr.left-mr.left}px;top:${fr.top-mr.top}px;
      width:${fr.width}px;height:${fr.height}px;opacity:0;z-index:30;will-change:transform,opacity;
      transform-origin:top left;transition:transform ${enlargeTransitionMs}ms ease,opacity ${enlargeTransitionMs}ms ease;
      border-radius:${openedImageBorderRadius};overflow:hidden;
      box-shadow:0 20px 60px rgba(0,0,0,.55),0 0 0 1px rgba(140,190,255,.35),0 0 50px -6px rgba(92,225,255,.5)`;
    const rawSrc = parent.dataset.src || el.querySelector("img")?.src || "";
    const rawAlt = parent.dataset.alt || el.querySelector("img")?.alt || "";
    const img = document.createElement("img");
    img.src = rawSrc; img.alt = rawAlt;
    img.style.cssText = `width:100%;height:100%;object-fit:cover;filter:${grayscale?"grayscale(1)":"none"}`;
    overlay.appendChild(img);
    viewerRef.current.appendChild(overlay);
    const tx0 = tr.left - fr.left, ty0 = tr.top - fr.top;
    const sx0 = tr.width / fr.width || 1, sy0 = tr.height / fr.height || 1;
    overlay.style.transform = `translate(${tx0}px,${ty0}px) scale(${sx0},${sy0})`;
    setTimeout(() => {
      if (!overlay.parentElement) return;
      overlay.style.opacity = "1";
      overlay.style.transform = "translate(0,0) scale(1,1)";
      rootRef.current?.setAttribute("data-dg-enlarging","true");
    }, 16);
    if (openedImageWidth || openedImageHeight) {
      overlay.addEventListener("transitionend", function onEnd(ev) {
        if (ev.propertyName !== "transform") return;
        overlay.removeEventListener("transitionend", onEnd);
        const prev = overlay.style.transition;
        overlay.style.transition = "none";
        overlay.style.width  = openedImageWidth  || `${fr.width}px`;
        overlay.style.height = openedImageHeight || `${fr.height}px`;
        const nr = overlay.getBoundingClientRect();
        overlay.style.width  = `${fr.width}px`;
        overlay.style.height = `${fr.height}px`;
        void overlay.offsetWidth;
        overlay.style.transition = `left ${enlargeTransitionMs}ms ease,top ${enlargeTransitionMs}ms ease,width ${enlargeTransitionMs}ms ease,height ${enlargeTransitionMs}ms ease`;
        requestAnimationFrame(() => {
          overlay.style.left   = `${fr.left - mr.left + (fr.width  - nr.width)  / 2}px`;
          overlay.style.top    = `${fr.top  - mr.top  + (fr.height - nr.height) / 2}px`;
          overlay.style.width  = openedImageWidth;
          overlay.style.height = openedImageHeight;
        });
        overlay.addEventListener("transitionend", () => { overlay.style.transition = prev; }, { once: true });
      });
    }
  };

  useEffect(() => () => document.body.classList.remove("dg-scroll-lock"), []);

  const rootVars = {
    "--segments-x": segments,
    "--segments-y": segments,
    "--overlay-blur-color": overlayBlurColor,
    "--tile-radius": imageBorderRadius,
    "--enlarge-radius": openedImageBorderRadius,
    "--image-filter": grayscale ? "grayscale(1)" : "none",
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS_INJECT }} />
      <div ref={rootRef} className="dg-root" style={rootVars}>
        <main ref={mainRef} className="dg-main">
          <div className="dg-stage">
            <div ref={sphereRef} className="dg-sphere">
              {items.map((it, i) => (
                <div key={`${it.x},${it.y},${i}`} className="dg-item"
                  data-src={it.src} data-alt={it.alt}
                  data-offset-x={it.x} data-offset-y={it.y}
                  data-size-x={it.sizeX} data-size-y={it.sizeY}
                  style={{ "--offset-x": it.x, "--offset-y": it.y,
                           "--item-size-x": it.sizeX, "--item-size-y": it.sizeY }}>
                  <div className="dg-tile"
                    role="button" tabIndex={0}
                    aria-label={it.alt || "Open image"}
                    onClick={e => {
                      if (draggingRef.current || movedRef.current) return;
                      if (performance.now() - lastDragEnd.current < 80) return;
                      if (openingRef.current) return;
                      openItem(e.currentTarget);
                    }}>
                    {it.src && (
                      <img src={it.src} draggable={false} alt={it.alt}
                        onError={e => { e.target.style.display="none"; }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Radial colour overlay */}
          <div className="dg-overlay" style={{
            backgroundImage: `radial-gradient(rgba(235,235,235,0) 65%, ${overlayBlurColor} 100%)`
          }} />

          {/* Blur ring */}
          <div className="dg-blur-overlay" style={{
            WebkitMaskImage: `radial-gradient(rgba(235,235,235,0) 70%, ${overlayBlurColor} 90%)`,
            maskImage:       `radial-gradient(rgba(235,235,235,0) 70%, ${overlayBlurColor} 90%)`,
            backdropFilter:  "blur(3px)",
          }} />

          {/* Top / bottom fade */}
          <div className="dg-grad-top" style={{
            background:`linear-gradient(to bottom,transparent,${overlayBlurColor})`
          }} />
          <div className="dg-grad-bot" style={{
            background:`linear-gradient(to bottom,transparent,${overlayBlurColor})`
          }} />

          {/* Viewer + scrim */}
          <div ref={viewerRef} className="dg-viewer"
            style={{ padding: "var(--viewer-pad,72px)" }}>
            <div ref={scrimRef} className="dg-scrim" />
            <div ref={frameRef} className="dg-frame"
              style={{ borderRadius: `var(--enlarge-radius,${openedImageBorderRadius})` }} />
          </div>
        </main>
      </div>
    </>
  );
}
