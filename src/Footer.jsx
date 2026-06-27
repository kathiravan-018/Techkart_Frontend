import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-section">
        <h3>TechKart</h3>
        <p>
          Delivering quality products, seamless shopping experiences,
          and exceptional customer satisfaction.
        </p>
      </div>

      <div className="footer-section">
        <h4>Quick Links</h4>
        <p>Home</p>
        <p>Products</p>
        <p>Wishlist</p>
        <p>Orders</p>
      </div>

      <div className="footer-section">
        <h4>Support</h4>
        <p>Help Center</p>
        <p>Returns & Refunds</p>
        <p>Shipping Information</p>
        <p>Track Order</p>
      </div>

      <div className="footer-section">
        <h4>Contact</h4>
        <p>Email: support@techkart.com</p>
        <p>Phone: +91 98765 43210</p>
        <div className="footer-bottom">
  <p>© 2026 TechKart. All Rights Reserved.</p>
</div>
      </div>

      

    </footer>
  );
}