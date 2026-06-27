import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header({ setSearch }) {
  const navigate = useNavigate();
  const location = useLocation();



  const handleLogout = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("profile_id");
  localStorage.removeItem("userDetails");

  navigate("/login");

  window.location.reload();
};

  const isHome = location.pathname === "/";

  return (
    <div className={`tk-header ${isHome ? "transparent" : "solid"}`}>

      <h2 className="logo">
        <span>Tech</span>Kart
      </h2>

      <nav className="nav-pages">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/aboutus">About Us</Link>
      </nav>

      <div className="tk-search-box">
        <input
          className="nav-search"
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="nav-icons">

        <button onClick={() => navigate("/cart")}>
          {/* Cart Icon */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
              stroke="#fff"
              strokeWidth="2"
            />
          </svg>
        </button>

        <div className="profile-wrapper">

          <button>
            {/* Profile Icon */}
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <path
                d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#fff"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          <div className="hidden-details">

            <div className="user-details">
              <Link to="/login" className="log-link">
                Login
              </Link>{" "}
              /
              <Link to="/Signin" className="sign-link">
                Sign-Up
              </Link>
            </div>

            <hr className="line" />

            <div className="profile">
              <Link to="/orders" className="order-link">Orders</Link>
              <Link to="/wishlist" className="wish-link">Wishlist</Link>
              <Link to="/rewards" className="reward-link">Rewards</Link>
              <Link to="/userdetails" className="details-link">Details</Link>
            </div>

            <hr className="bottomline" />

            <button className="logout" onClick={handleLogout}>
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}