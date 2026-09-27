import { useEffect, useState } from "react";
import LoadingScreen from "./loading/LoadingScreen";
import StaggeredMenu from "./components/StaggeredMenu";
import TopBar from "./components/TopBar/TopBar";
import BlobCursor from "./components/BlobCursor";
import PageReveal from "./components/PageReveal";
import Home from "./pages/Home";
import WallfallProject from "./pages/WallfallProject";
import CategoryPage from "./pages/CategoryPage";
import ThreeDPage from "./pages/ThreeDPage";
import { asset } from "./lib/asset";

const menuItems = [
  { label: "Home",    ariaLabel: "Go to home",       link: "#hero"                 },
  { label: "Work",    ariaLabel: "View work",        link: "#disciplines"          },
  { label: "Games",   ariaLabel: "View Wallfall Barricade", link: "#/wallfall-barricade" },
  { label: "Assets",  ariaLabel: "Browse assets",    link: "#assets"               },
  { label: "Patreon", ariaLabel: "Membership",       link: "#patreon"              },
  { label: "Connect", ariaLabel: "Get in touch",     link: "#contact"              },
];

const socialItems = [
  { label: "YouTube",   link: "https://www.youtube.com/@ytagrimart"       },
  { label: "Instagram", link: "https://www.instagram.com/agrimart.blend/"  },
  { label: "Gumroad",   link: "https://agrimart.gumroad.com/"              },
];

/* Lightweight hash-based route so this stays a single static bundle that
   works on any static host (GitHub Pages included) with no server rewrites.
   Routes are hashes starting with "/" (e.g. "#/wallfall-barricade") so they
   never collide with the in-page anchor links ("#hero", "#assets", ...). */
function readRoute() {
  return window.location.hash.startsWith("#/") ? window.location.hash.slice(1) : "/";
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [route, setRoute] = useState(readRoute());
  const [nav, setNav] = useState(null);

  useEffect(() => {
    const onHashChange = e => {
      const next = readRoute();
      const prev = e.oldURL.includes("#/") ? e.oldURL.slice(e.oldURL.indexOf("#") + 1) : "/";
      setRoute(next);
      setNav({ anchor: next === "/" ? window.location.hash.slice(1) : "", crossPage: prev !== next });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /* Runs after the new route has rendered, so an anchor on the home page
     (e.g. "#contact" clicked from a sub-page) exists before we scroll to it. */
  useEffect(() => {
    if (!nav) return;
    if (!nav.anchor) {
      window.scrollTo({ top: 0 });
      return;
    }
    document.getElementById(nav.anchor)?.scrollIntoView({ behavior: nav.crossPage ? "auto" : "smooth" });
  }, [nav]);

  if (!loaded) {
    return <LoadingScreen finishLoading={() => setLoaded(true)} />;
  }

  return (
    <div className="app-root">
      {!revealed && <PageReveal onComplete={() => setRevealed(true)} />}
      <TopBar />
      <BlobCursor fillColor="#EBDA98" />
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        isFixed={true}
        menuButtonColor="#36384d"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={["#c9613a", "#1a1512"]}
        logoUrl={asset("logo.svg")}
        accentColor="#c9613a"
      />
      {route === "/wallfall-barricade" ? <WallfallProject />
        : route === "/3d" ? <ThreeDPage />
        : route === "/2d" ? <CategoryPage kind="2d" />
        : route === "/games" ? <CategoryPage kind="games" />
        : <Home />}
    </div>
  );
}
