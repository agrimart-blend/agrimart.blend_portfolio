export default function ReviewsSection() {
  return (
    <section id="reviews" className="reviews-section" aria-labelledby="reviews-title">
      <div className="reviews-inner">
        <header className="reviews-heading">
          <div className="section-label">Gumroad storefront</div>
          <h2 id="reviews-title" className="section-title">Real work.<br />Verified feedback.</h2>
          <p>
            See what buyers say about the tools and artwork, directly on the storefront.
          </p>
        </header>

        <div className="reviews-proof" aria-label="Gumroad review summary">
          <div className="reviews-metric">
            <strong>5.0<span>/5</span></strong>
            <span>Store rating</span>
          </div>
          <div className="reviews-metric">
            <strong>20</strong>
            <span>Verified reviews</span>
          </div>
          <div className="reviews-metric">
            <strong>10</strong>
            <span>Products reviewed</span>
          </div>
          <a className="reviews-link" href="https://agrimart.gumroad.com/" target="_blank" rel="noopener noreferrer">
            Read verified reviews on Gumroad <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
