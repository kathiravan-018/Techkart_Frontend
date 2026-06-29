import "./Home.css";
import samsung from "./images/samsung.jpeg";
import fridge from "./images/fridge.jpeg";
import earbuds from "./images/earbuds.jpeg";
import { products } from "./products";
import { useNavigate } from "react-router-dom";

export default function Home({search}) {
  const navigate = useNavigate();

       
  return (
    <div className="home-container">
      <div className="hero-section">
         <img src={earbuds} alt="Earbuds Banner" className="hero-banner" />
      </div>
      <div className="grid">
        {products.slice(0, 4).map((product) => (
          <div className="card" key={product.id}>
            <h4>{product.name}</h4>

            <button
              className="img-btn"
              onClick={() => navigate(`/buy/${product.id}`)}
            >
              <img src={product.image} alt={product.name} />
            </button>

            <div className="intro">
              <button
                className="buy-btn"
                onClick={() => navigate(`/buy/${product.id}`)}
              >
                Buy 
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Samsung Banner */}
      <section className="hero-section">
        <img
          src={samsung}
          alt="Samsung Mobile Banner"
          className="trend-samsung"
        />
      </section>

      {/* Second Product Section */}
      <div className="grid">
        {products.slice(4, 8).map((product) => (
          <div className="card" key={product.id}>
            <h4>{product.name}</h4>

            <button
              className="img-btn"
              onClick={() => navigate(`/buy/${product.id}`)}
            >
              <img src={product.image} alt={product.name} />
            </button>

            <div className="intro">
              <button
                className="buy-btn"
                onClick={() => navigate(`/buy/${product.id}`)}
              >
                Buy 
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fridge Banner */}
      <section className="hero-section">
        <img
          src={fridge}
          alt="Refrigerator Banner"
          className="trend-fridge"
        />
      </section>

    </div>
  );
}