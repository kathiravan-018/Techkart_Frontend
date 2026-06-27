import "./Features.css";

export default function Features() {
  const features = [
    {
      icon: "🛒",
      title: "Smart Cart",
      desc: "Add, remove, and manage products easily."
    },
    {
      icon: "❤️",
      title: "Wishlist",
      desc: "Save your favorite products for later."
    },
    {
      icon: "🎁",
      title: "Rewards System",
      desc: "Earn reward points with every purchase."
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      desc: "Quick and reliable shipping services."
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      desc: "Safe and trusted online transactions."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      desc: "Works perfectly on mobile, tablet, and desktop."
    },
    {
      icon: "📦",
      title: "Order Tracking",
      desc: "Track your orders in real time."
    },
    {
      icon: "⭐",
      title: "Product Reviews",
      desc: "Read and share customer reviews."
    }
  ];

  return (
    <div className="features-page">
      <div className="features-header">
        <h1>✨ TechKart Features</h1>
        <p>Discover the powerful features that make shopping easier.</p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}