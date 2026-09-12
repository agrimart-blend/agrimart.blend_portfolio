/**
 * Resolves a public/ asset path against the app's actual base path.
 * Hardcoding "/sky.jpg" breaks once the site is served from a subpath
 * (e.g. GitHub Pages project sites at /repo-name/) because the browser
 * resolves it against the domain root instead. Route every public/
 * asset reference through this helper instead of a bare "/..." string.
 */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, "")}`;
