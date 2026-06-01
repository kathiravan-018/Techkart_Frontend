import "./Cartthings.css";

export default function Cartthings({ cart, removeFromCart }) {

  const handleBuyNow = (item, index) => {

    // 1. Get existing orders from localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // 2. Create new order object
    const newOrder = {
      id: Date.now(),
      name: item.name,
      details: item.details,
      price: item.price,
      image: item.image,
      date: new Date().toLocaleString()
    };

    // 3. Save to localStorage
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    // 4. Remove from cart (IMPORTANT FIX)
    removeFromCart(index);

    alert("Order Placed 🚀");
  };

  return (
    <div className="cart-container">
      <div className="cart-items mt-4">

        <h2 className="d-flex justify-content-center">
          Your Cart 🛒
        </h2>

        <hr />

        {cart.length === 0 ? (
          <p className="empty-text d-flex justify-content-center">
            Your cart is empty
          </p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="cart-card">

              <img src={item.image} className="img-small" alt={item.name} />

              <div className="cart-details">
                <h5>{item.name}</h5>
                <h5>{item.details}</h5>
                <h2 className="mt-2 ms-2">₹{item.price}</h2>

                <div className="d-flex justify-content-end gap-3">

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(index)}
                    className="btn btn-info"
                  >
                    🗑️ Remove
                  </button>

                  {/* Buy Now button */}
                  <button
                    className="btn btn-warning"
                    onClick={() => handleBuyNow(item, index)}
                  >
                    🛒 Buy Now
                  </button>

                </div>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}