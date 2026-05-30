import "./Cartthings.css";


export default function Cartthings({ cart, removeFromCart}) {

  const handleBuyNow = (item) => {

  
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    
    const newOrder = {
        id: Date.now(),
        name: item.name,
        details: item.details,
        price: item.price,
        image: item.image,
        date: new Date().toLocaleString()
    };

    
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    alert("Order Placed 🚀");
};

  return (
    <div className="cart-container">
      <div className="cart-items mt-4">
        <h2 className=" d-flex justify-content-center">Your Cart 🛒</h2>
        <hr/>
        {cart.length === 0 ? (
          <p className="empty-text  d-flex justify-content-center">Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="cart-card">
              <img src={item.image} className="img-small" />

              <div className="cart-details">
                <h5>{item.name}</h5>
                <h5>{item.details}</h5>
                <h2 className="mt-2 ms-2">₹{item.price}</h2>

                <div className="d-flex justify-content-end gap-3">
                  <button 
                    onClick={() => removeFromCart(index)} 
                    className="btn btn-info"
                  >
                    🗑️ Remove
                  </button>

                  <button  className="btn btn-warning" onClick={() => handleBuyNow(item)}>
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