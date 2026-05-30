import "./App.css";
import mobile from './images/mobile.jpg';
import laptop from './images/laptop.jpg';
import jersey from './images/jersey.jpg';
import shoes from './images/shoes.jpg';
import tv from './images/tv.jpg';

export default function Home({ setcart, setwishlist, search = "" }) {

    function Rating({ stars, count }) {
        return (
            <div className="d-flex align-items-center">
                <span className="text-warning">
                    {"★".repeat(stars) + "☆".repeat(5 - stars)}
                </span>
                <span className="ms-2">({count})</span>
            </div>
        );
    }

    function Addtocart(product) {
        setcart(prev => [...prev, product]);
        alert("Added to Cart 🛒");
    }

    function AddToWishlist(product) {
    setwishlist(prev => {
        const updated = [...prev, product];
        console.log(updated);
        return updated;
    });

    alert("Added to Wishlist ❤️");
}

    const products = [
        { name: "Samsung TV", details: "4K SMART TV", price: 45999, image: tv },
        { name: "Vivo V60e", details: "8GB RAM | 256GB ROM", price: 35500, image: mobile },
        { name: "RCB Jersey", details: "For Boys & Kids", price: 1500, image: jersey },
        { name: "Nike Shoes", details: "Mens Casual Shoes", price: 4000, image: shoes },
        { name: "DELL Laptop", details: "i5 13th Gen", price: 54999, image: laptop }
    ];

    const query = (search ?? "").toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.details.toLowerCase().includes(query)
    );

    return (
        <div className="grid">

            {filteredProducts.length === 0 ? (
                <h3 className="text-center w-100 mt-5">
                    No products found 😢
                </h3>
            ) : (
                filteredProducts.map((product, index) => (
                    <div className="card" key={index}>

                        <img src={product.image} alt={product.name} />

                        <p>{product.name}</p>
                        <p>{product.details}</p>
                        <h3>₹{product.price}</h3>

                        <Rating stars={3} count={100} />

                        
                        <div className="d-flex align-items-center gap-2 mt-3 ms-5">

                            <button
                                className="btn btn-warning"
                                onClick={() => Addtocart(product)}
                            >
                                Add to cart
                            </button>

                        
                            <button
                                onClick={() => AddToWishlist(product)}
                                style={{
                                    fontSize: "24px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                            >
                                ❤️
                            </button>

                        </div>

                    </div>
                ))
            )}

        </div>
    );
}