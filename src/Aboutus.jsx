import "./Aboutus.css";

export default function AboutUs() {
  return (
    <div className="about-container">

      <section className="hero">
        <h1>About TechKart</h1>
        <p>
          Your trusted destination for the latest gadgets and technology.
        </p>
      </section>

      <section className="about-section">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Tech Team"
          />
        </div>

        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            TechKart was created with a simple mission: make technology
            accessible, affordable, and enjoyable for everyone.
          </p>

          <p>
            We offer quality products, secure shopping, and a seamless online
            experience for tech enthusiasts.
          </p>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🚚 Fast Delivery</h3>
          <p>Quick and reliable shipping across the country.</p>
        </div>

        <div className="feature-card">
          <h3>🔒 Secure Payments</h3>
          <p>Protected transactions and trusted payment gateways.</p>
        </div>

        <div className="feature-card">
          <h3>⭐ Quality Products</h3>
          <p>Handpicked gadgets from trusted brands.</p>
        </div>

        <div className="feature-card">
          <h3>📞 24/7 Support</h3>
          <p>Always ready to assist our customers.</p>
        </div>
      </section>

      <section className="stats">
        <div>
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div>
          <h2>500+</h2>
          <p>Products</p>
        </div>

        <div>
          <h2>4.8★</h2>
          <p>Customer Rating</p>
        </div>
      </section>

    </div>
  );
}