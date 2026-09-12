const REVIEWS = [
  { text:"Now this is quality shader work. Exactly what I needed for my anime scene — the water reacts beautifully to the lighting.", author:"Gumroad Customer", product:"Anime Fountain Shader", stars:5 },
  { text:"Such a great shader and thanks a lot for providing it for free for all. ❤️ The community really appreciates this generosity.", author:"Blender Artist", product:"Waterfall Shader", stars:5 },
  { text:"Awesome work!!! The level of detail in these HDRIs is incredible. Completely transformed my entire project's lighting.", author:"3D Creator", product:"Vibrant HDRIs Pack", stars:5 },
  { text:"The HDRIs really fit over my project, thank you for making my work easier and better. ❤️ The anime lighting quality is unmatched.", author:"Verified Buyer", product:"Anime Sky HDRI", stars:5 },
  { text:"Incredible scene pack — saved me days of modelling. The train bridge environment is exactly the kind of asset every Blender artist needs.", author:"Environment Artist", product:"River Crossing Scene", stars:5 },
  { text:"Clean node setup, great docs, stunning renders. This is how free assets should be done. Thank you!", author:"Blender Community", product:"Wood Shader Pack", stars:5 },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-inner">
        <div className="section-label reveal">Community Feedback</div>
        <h2 className="section-title reveal">What Artists<br />Are Saying</h2>
        <div className="reviews-grid">
          {REVIEWS.map((r,i) => (
            <div key={i} className={`review-card reveal reveal-d${i%3}`}>
              <div className="review-geo" aria-hidden="true" />
              <div className="review-stars" aria-label={`${r.stars} stars`}>{"★".repeat(r.stars)}</div>
              <blockquote className="review-text">"{r.text}"</blockquote>
              <div className="review-footer">
                <span className="review-author">— {r.author}</span>
                <span className="review-product">{r.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
