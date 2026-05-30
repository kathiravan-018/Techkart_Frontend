import "./App.css";

export default function Wishlist({ wishlist, setwishlist }) {

    function removeItem(indexToRemove) {
        setwishlist(prev =>
            prev.filter((_, index) => index !== indexToRemove)
        );

        alert("Item removed from Wishlist");
    }

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">❤️ Wishlist</h2>

            {wishlist.length === 0 ? (
                <h4 className="text-center">No Items in Wishlist</h4>
            ) : (
                wishlist.map((item, index) => (
                    <div key={index} className="card p-3 mb-3 ">

                        <div className="d-flex align-items-center">

                            <img
                                src={item.image}
                                alt={item.name}
                                width="200"
                            />

                            <div className="ms-5">
                                <h5>{item.name}</h5>
                                <p>{item.details}</p>
                                <h6>₹{item.price}</h6>

                                <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => removeItem(index)}
                                >
                                    Remove
                                </button>
                            </div>

                        </div>

                    </div>
                ))
            )}

        </div>
    );
}