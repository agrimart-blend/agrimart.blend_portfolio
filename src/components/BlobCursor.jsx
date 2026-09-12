// @ts-nocheck
import { useTrail, animated } from "@react-spring/web";
import { memo, useEffect, useRef, useState } from "react";
import "./BlobCursor.css";

const fast = { tension: 400, friction: 28 };
const slow = { mass: 3, tension: 200, friction: 22 };
const DOT_OPACITIES = [0.7, 0.5, 0.4];

const trans = (x, y) =>
  `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

function BlobCursor({ fillColor = "#e9d6ab" }) {
  const visibleRef = useRef(false);
  const [visible, setVisible] = useState(false);

  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow
  }), []);

  useEffect(() => {
    const show = () => {
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const move = (event) => {
      show();
      api.start({
        xy: [event.clientX, event.clientY]
      });
    };

    const hide = () => {
      if (visibleRef.current) {
        visibleRef.current = false;
        setVisible(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("blur", hide);
    };

  }, [api]);

  return (
    <div className="blob-cursor-container">

      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="blob">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -5"
          />
        </filter>
      </svg>

      <div className="blob-main">

        {trail.map((props, i) => (
          <animated.div
            key={i}
            className="blob-dot"
            style={{
              transform: props.xy.to(trans),
              background: fillColor,
              opacity: visible ? DOT_OPACITIES[i] : 0
            }}
          />
        ))}

      </div>

    </div>
  );
}

export default memo(BlobCursor);
