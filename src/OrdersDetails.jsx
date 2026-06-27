import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import "./OrdersDetails.css";
import {Orderscontext} from "./context/Orderscontext"

export default function OrderDetails() {

  const {orders} = useContext(Orderscontext);

  const { id } = useParams();

  const order = orders.find(
    (o) => o.id === Number(id)
  );

  if (!order) {
    return <h2>Order Not Found</h2>;
  }

  const user = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <div className="order-details">

      <h2>Order #{order.id}</h2>

      {order.items.map((item) => (
        <div key={item.id} className="item-card">
          <img src={item.image} alt={item.name} />

          <div>
            <h4>{item.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price}</p>

            <p>
              Total: ₹
              {(
                Number(item.price.replace(/[₹,\s]/g, "")) *
                item.quantity
              ).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      ))}

      <div className="summary">
        <h3>
          Total Amount: ₹
          {order.total.toLocaleString("en-IN")}
        </h3>

        <p>
          Reward Points Earned: {order.rewardPoints}
        </p>

        <p>Status: {order.status}</p>

        <p>Order Date: {order.date}</p>
      </div>
      <div className="delivery-address">
        <h3>📍 Delivery Address</h3>

        {user ? (
          <>
            <p><strong>{user.name}</strong></p>
            <p>{user.address}</p>
            <p>{user.city} - {user.pincode}</p>
            <p>📞{user.phone}</p>
          </>
        ) : (
          <p>No address saved.</p>
        )}
      </div>
    </div>
  );
}