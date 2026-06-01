import { useEffect, useState } from "react";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(data);
    }, []);

    const cancelOrder = (id) => {
        const updated = orders.filter(order => order.id !== id);

        setOrders(updated);
        localStorage.setItem("orders", JSON.stringify(updated));
    };

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">My Orders 📦</h2>

            {orders.length === 0 ? (
                <h4 className="text-center">No Orders Yet</h4>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="card p-3 mb-3 shadow-sm">

                        <img
                            src={order.image}
                            alt={order.name || `Order ${order.id}`}
                            />

                        <h5>{order.name}</h5>
                        <p>{order.details}</p>
                        <h6>₹{order.price}</h6>
                        <small>{order.date}</small>

                        
                        <button
                            className="btn btn-warning mt-3"
                            onClick={() => cancelOrder(order.id)}
                        >
                            Cancel Order
                        </button>

                    </div>
                ))
            )}

        </div>
    );
}