import './Header.css';
import techkart from './images/Techkart.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ cart, setSearch }) {

  

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="tk-header">

      <div className="tk-Logo">
        <img src={techkart} alt="logo" className="tk-logo" />
      </div>

      
      <div className="tk-search-box">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      
      <div className="tk-right">

        
        <div className="tk-profile">

          <span className="login-btn">
            {username ? `Hi, ${username}` : 'Login'}
          </span>

          <div className="tk-dropdown">

            {!username ? (
              <>
                <p className="new-user">
                  New customer? <Link to="/signup">Sign Up</Link>
                </p>
                <hr />
                <Link to="/login">👤 Login</Link>
              </>
            ) : (
              <>
                <p className="new-user">
                  Welcome, {username}
                </p>
                <hr />
                <Link to="/profile">👤 My Profile</Link>
                <Link to="/orders">📦 Orders</Link>
                <Link to="/wishlist">❤️ Wishlist</Link>
                <Link to="/rewards">🎁 Rewards</Link>
                <hr />
                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}

          </div>
        </div>

        {/* CART */}
        <div
          className="tk-cart"
          onClick={() => navigate('/cart')}
        >
          🛒 Cart <span className="cart-badge">{cart}</span>
        </div>

      </div>
    </div>
  );
}