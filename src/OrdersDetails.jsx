import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrdersDetails.css";
import axios from "axios";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

useEffect(() => {
  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/orders/${id}/`
      );

      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrder();
}, [id]);

  if (!order) {
    return <h2>Loading...</h2>;
  }

  const user = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <div className="order-details">
      <h2>Order #{order.id}</h2>

      {order.items.map((item, index) => (
        <div key={index} className="item-card">
          <img src={item.image} alt={item.product_name} />

          <div>
            <h4>{item.product_name}</h4>

            <p>Quantity: {item.quantity}</p>

            <p>
              Price: ₹
              {Number(item.price).toLocaleString("en-IN")}
            </p>

            <p>
              Total: ₹
              {(Number(item.price) * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      ))}

      <div className="summary">
        <h3>
          Total Amount: ₹
          {Number(order.total).toLocaleString("en-IN")}
        </h3>

        <p>Status: {order.status}</p>

        <p>
          Order Date:{" "}
          {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="delivery-address">
        <h3>📍 Delivery Address</h3>

        {user ? (
          <>
            <p>
              <strong>{user.name}</strong>
            </p>

            <p>{user.address}</p>

            <p>
              {user.city} - {user.pincode}
            </p>

            <p>📞 {user.phone}</p>
          </>
        ) : (
          <p>No address saved.</p>
        )}
      </div>
    </div>
  );
}