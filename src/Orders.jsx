import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      const response = await axios.get(
        `http://techkart-backend-7.onrender.com/api/orders/?user=${userId}`
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelorder = async (orderId) => {
    try {
      await axios.delete(
        `http://techkart-backend-7.onrender.com/api/orders/${orderId}/`
      );

      setOrders((prev) =>
        prev.filter((order) => order.id !== orderId)
      );

      toast.warning("Order cancelled successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        icon: false,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders-page">
      {orders.length === 0 ? (
        <div className="empty-orders">
          <h1>No Orders Yet</h1>
          <p>Your order history will appear here.</p>

          <button onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="orders-container">
          <h2>Your Orders</h2>

          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-left">
                <img
                  src={order.items[0]?.image}
                  alt="product"
                />

                <div>
                  <h3>Order #{order.id}</h3>

                  <p>
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    {order.items.reduce(
                      (total, item) =>
                        total + item.quantity,
                      0
                    )}{" "}
                    items
                  </p>

                  <h4>
                    ₹
                    {Number(order.total).toLocaleString(
                      "en-IN"
                    )}
                  </h4>
                </div>
              </div>

              <div className="order-right">
                <span
                  className={`status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>

                <div className="ord-btns">
                  <button
                    className="details-btn"
                    onClick={() =>
                      navigate(`/orders/${order.id}`)
                    }
                  >
                    View Details
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      cancelorder(order.id)
                    }
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}