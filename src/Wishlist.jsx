import "./Wishlist.css";
import { useNavigate } from "react-router-dom";

export default function Wishlist({ wishlist, setwishlist }) {

  const navigate = useNavigate();
  const removewishlist = (id) => {
    setwishlist(
      wishlist.filter(item => item.id !== id)
    );
  };

  return (
    <div className="wishlist-page">

      <h2 className="wishlist-title">
        ❤️ Your Wishlist ({wishlist.length})
      </h2>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h3>Your wishlist is empty</h3>
          <p>Add your favorite products here ❤️</p>
          <button className="Add-wishlistbtn"
          onClick={()=>navigate('/')}>Continue Shopping</button>
        </div>
      ) : (
        wishlist.map((item) => (
          <div className="wishlist-card" key={item.id}>

            <div className="wishlist-img-container">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="wishlist-img"
                onClick={()=>navigate(`/buy/${item.id}`)}
              />
            </div>

            <div className="wishlist-details">
              <h3>{item.name}</h3>
              <p className="wishlist-category">
                {item.category}
              </p>

              <h4 className="wishlist-price">
                {item.price}
              </h4>
            </div>

            <button
              className="wishlist-btn"
              onClick={() => removewishlist(item.id)}
            >
               Remove
            </button>

          </div>
        ))
      )}

    </div>
  );
}