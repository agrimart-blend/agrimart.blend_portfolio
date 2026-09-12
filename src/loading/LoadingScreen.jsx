import { useEffect, useState } from "react";
import TiltedCard from "../components/TiltedCard";
import BlobCursor from "../components/BlobCursor";
import bg from "../assets/loadingFrames/bg.png";
import flower from "../assets/loadingFrames/flower.png";
import canvas from "../assets/loadingFrames/canvas.png";

export default function LoadingScreen({ finishLoading }) {

  const [progress, setProgress] = useState(0);

  const pages = [
    "home",
    "about",
    "projects",
    "gallery",
    "contact"
  ];

  const pageIndex = Math.min(
    Math.floor((progress / 100) * pages.length),
    pages.length - 1
  );

  useEffect(() => {

    const interval = setInterval(() => {

      setProgress((prev) => {

        const next = prev + Math.random() * 3;

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => finishLoading(), 500);
          return 100;
        }

        return next;

      });

    }, 60);

    return () => clearInterval(interval);

  }, [finishLoading]);

  useEffect(() => {
    document.body.classList.add("loading-screen-active");

    return () => {
      document.body.classList.remove("loading-screen-active");
    };
  }, []);

  return (

    <>
      {/* CURSOR LAYER (outside loader) */}
      <div className="cursor-layer">
        <BlobCursor />
      </div>

      <div className="loader">

        <div className="loader-ui">

          <div className="loader-bar">
            <div
              className="loader-progress"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="loader-info">
            <span>► LOADING - {Math.floor(progress)}%</span>
            <span>
              https://agrimart.portfolio/{pages[pageIndex]}
            </span>
          </div>

        </div>

        <div className="loader-frame position-4">

          {/* background */}
          <div className="loader-layer bg-layer">
            <TiltedCard
              imageSrc={bg}
              rotateAmplitude={10}
              containerWidth="var(--loader-bg-width)"
              containerHeight="var(--loader-bg-height)"
            />
          </div>

          {/* flower */}
          <div className="loader-layer flower-layer">
            <TiltedCard
              imageSrc={flower}
              altText="flower"
              rotateAmplitude={1}
              containerWidth="var(--loader-flower-width)"
              containerHeight="var(--loader-flower-height)"
            />
          </div>

          {/* canvas */}
          <div className="loader-layer canvas-layer">
            <img src={canvas} className="canvas-static" />
          </div>

        </div>

        <div className="loader-circle"></div>

      </div>
    </>
  );
}
