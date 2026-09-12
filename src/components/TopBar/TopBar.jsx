import { useEffect, useRef } from "react";
import "./TopBar.css";

const SMOOTHING_FACTOR = 0.18;
const SNAP_THRESHOLD = 0.001;

function getScrollProgress() {
  const root = document.documentElement;
  const body = document.body;

  const scrollTop = Math.max(
    window.pageYOffset || 0,
    window.scrollY || 0,
    root?.scrollTop || 0,
    body?.scrollTop || 0
  );

  const scrollHeight = Math.max(
    root?.scrollHeight || 0,
    root?.offsetHeight || 0,
    root?.clientHeight || 0,
    body?.scrollHeight || 0,
    body?.offsetHeight || 0,
    body?.clientHeight || 0
  );

  const viewportHeight = window.innerHeight || root?.clientHeight || 0;
  const maxScroll = Math.max(scrollHeight - viewportHeight, 0);

  if (maxScroll <= 0) {
    return 0;
  }

  return Math.min(Math.max(scrollTop / maxScroll, 0), 1);
}

export default function TopBar() {
  const fillRef = useRef(null);

  useEffect(() => {
    let animationFrameId = 0;
    let resizeObserver;
    let currentProgress = 0;
    let targetProgress = 0;

    const applyProgress = value => {
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${value})`;
      }
    };

    const animateProgress = () => {
      const delta = targetProgress - currentProgress;

      if (Math.abs(delta) <= SNAP_THRESHOLD) {
        currentProgress = targetProgress;
        applyProgress(currentProgress);
        animationFrameId = 0;
        return;
      }

      currentProgress += delta * SMOOTHING_FACTOR;
      applyProgress(currentProgress);
      animationFrameId = window.requestAnimationFrame(animateProgress);
    };

    const syncTargetProgress = () => {
      targetProgress = getScrollProgress();

      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(animateProgress);
      }
    };

    applyProgress(0);
    syncTargetProgress();
    window.addEventListener("scroll", syncTargetProgress, { passive: true });
    document.addEventListener("scroll", syncTargetProgress, {
      passive: true,
      capture: true
    });
    window.addEventListener("resize", syncTargetProgress);
    window.addEventListener("load", syncTargetProgress);

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncTargetProgress);

      if (document.body) {
        resizeObserver.observe(document.body);
      }

      resizeObserver.observe(document.documentElement);
    }

    return () => {
      window.removeEventListener("scroll", syncTargetProgress);
      document.removeEventListener("scroll", syncTargetProgress, true);
      window.removeEventListener("resize", syncTargetProgress);
      window.removeEventListener("load", syncTargetProgress);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div className="topbar-wrapper" aria-hidden="true">
      <div className="topbar-progress-lane">
        <div ref={fillRef} className="topbar-progress-fill" />
      </div>

      <div className="topbar-frame">
        <span className="topbar-frame-outline" />
        <span className="topbar-frame-line topbar-frame-line-horizontal" />
        <span className="topbar-frame-line topbar-frame-line-vertical" />
      </div>
    </div>
  );
}
