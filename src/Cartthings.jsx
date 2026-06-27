import { useNavigate } from "react-router-dom";
import "./Cartthings.css";
import { toast } from "react-toastify";
import loadingGif from './images/loadingGif.gif'
import { useState, useContext } from "react";
import {Cartcontext} from './context/Cartcontext'
import axios from "axios";


export default function Cartthings() {

   const {
    cart,
    setcart,
    increaseqty,
    decreaseqty,
    deletecart,
  } = useContext(Cartcontext);



  const navigate = useNavigate();
  const [cartLoading, setcartLoading] = useState(false)

  const totalqty = cart.reduce((total,item)=>total+item.quantity,0)

  const subtotal = cart.reduce(
  (total, item) =>
    total +
    Number(item.price.replace(/[₹,\s]/g, "")) * item.quantity,
  0
);

  const rewardPoints = cart.reduce(
    (total,item)=>total+item.rewardPoints*item.quantity,0)
      console.log("cart");
    
const placeorder = async () => {
  setcartLoading(true);

  try {
    const userId = localStorage.getItem("user_id");

if (!userId) {

  setcartLoading(false);
  
  toast.error("Please login first", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    theme: "colored",
  });

  navigate("/login");
  return;
}

    // Create Order
    const orderResponse = await axios.post(
      "http://techkart-backend-7.onrender.com/api/orders/",
      {
        user: userId,
        total: subtotal,
        status: "pending",
      }
    );

    const orderId = orderResponse.data.id;

    // Create OrderItems
    for (const item of cart) {
      await axios.post(
        "http://techkart-backend-7.onrender.com/api/orderitems/",
        {
          order: orderId,
          product_name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: Number(item.price.replace(/[₹,\s]/g, "")),
        }
      );
    }

    setcart([]);

    toast.success("Order placed successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      theme: "colored",
    });

    navigate("/orders");

  } catch (error) {
    console.log(error);

    toast.error("Failed to place order", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      theme: "colored",
    });

  } finally {
    setcartLoading(false);
  }
};
    
        
  return (
  <div className="cart-page">
    {cart.length === 0 ? (
      <div className="emp-cart">
        <svg width="150px" height="150px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00024000000000000003">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.23737 2.28848C1.84442 2.15749 1.41968 2.36986 1.28869 2.76282C1.15771 3.15578 1.37008 3.58052 1.76303 3.7115L2.02794 3.79981C2.70435 4.02527 3.15155 4.17554 3.481 4.3288C3.79296 4.47392 3.92784 4.59072 4.01426 4.71062C4.10068 4.83052 4.16883 4.99541 4.20785 5.33726C4.24907 5.69826 4.2502 6.17003 4.2502 6.88303L4.2502 9.55487C4.25018 10.9225 4.25017 12.0248 4.36673 12.8917C4.48774 13.7918 4.74664 14.5497 5.34855 15.1516C5.95047 15.7536 6.70834 16.0125 7.60845 16.1335C8.47541 16.25 9.57773 16.25 10.9453 16.25H19.0002C19.4144 16.25 19.7502 15.9142 19.7502 15.5C19.7502 15.0858 19.4144 14.75 19.0002 14.75H11.0002C9.56479 14.75 8.56367 14.7484 7.80832 14.6468C7.07455 14.5482 6.68598 14.3677 6.40921 14.091C6.31252 13.9943 6.22758 13.8839 6.15378 13.75H16.0587C16.507 13.75 16.9014 13.75 17.2288 13.7147C17.5832 13.6764 17.9266 13.5914 18.2497 13.3784C18.5728 13.1653 18.7862 12.8832 18.961 12.5725C19.1224 12.2855 19.2778 11.923 19.4544 11.5109L19.9212 10.4216C20.3057 9.52464 20.6273 8.77419 20.7883 8.16384C20.9563 7.5271 21 6.86229 20.6038 6.26138C20.2076 5.66048 19.5793 5.4388 18.9278 5.34236C18.3034 5.24992 17.4869 5.24995 16.511 5.24999L5.70696 5.24999C5.70421 5.222 5.70129 5.19437 5.69817 5.16711C5.64282 4.68229 5.52222 4.23743 5.23112 3.83355C4.94002 3.42968 4.55613 3.17459 4.1137 2.96876C3.69746 2.77513 3.16814 2.59871 2.54176 2.38994L2.23737 2.28848ZM5.7502 6.74999C5.75021 6.78023 5.75021 6.8107 5.7502 6.84138L5.7502 9.49999C5.7502 10.672 5.75127 11.5544 5.80693 12.25H16.022C16.5179 12.25 16.8305 12.249 17.0678 12.2234C17.287 12.1997 17.3713 12.1608 17.424 12.1261C17.4766 12.0914 17.5455 12.0292 17.6537 11.8371C17.7707 11.629 17.8948 11.3421 18.0901 10.8863L18.5187 9.88631C18.9332 8.91911 19.2087 8.2713 19.3379 7.78124C19.4636 7.30501 19.3999 7.16048 19.3515 7.08712C19.3032 7.01376 19.1954 6.89831 18.7082 6.82619C18.2068 6.75196 17.5029 6.74999 16.4506 6.74999H5.7502Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.2502 19.5C5.2502 20.7426 6.25756 21.75 7.5002 21.75C8.74284 21.75 9.7502 20.7426 9.7502 19.5C9.7502 18.2573 8.74284 17.25 7.5002 17.25C6.25756 17.25 5.2502 18.2573 5.2502 19.5ZM7.5002 20.25C7.08599 20.25 6.7502 19.9142 6.7502 19.5C6.7502 19.0858 7.08599 18.75 7.5002 18.75C7.91442 18.75 8.2502 19.0858 8.2502 19.5C8.2502 19.9142 7.91442 20.25 7.5002 20.25Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5002 21.7501C15.2576 21.7501 14.2502 20.7427 14.2502 19.5001C14.2502 18.2574 15.2576 17.2501 16.5002 17.2501C17.7428 17.2501 18.7502 18.2574 18.7502 19.5001C18.7502 20.7427 17.7428 21.7501 16.5002 21.7501ZM15.7502 19.5001C15.7502 19.9143 16.086 20.2501 16.5002 20.2501C16.9144 20.2501 17.2502 19.9143 17.2502 19.5001C17.2502 19.0859 16.9144 18.7501 16.5002 18.7501C16.086 18.7501 15.7502 19.0859 15.7502 19.5001Z" fill="#1C274C"></path>
         </g></svg>
        <h1>Your cart is empty</h1>
        <p>Browse our products and add your favorite items to get started.</p>
        <button onClick={()=>navigate('/')}>Continue Shopping</button>
      </div>
    ) : (
      <>
        <div className="cart-container">
          <div className="cart-title ms-5 mt-4">
            <h2>Cart Items</h2>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="left-page">
              <div className="cart-card">
                <img
                  src={item.image}
                  alt={item.name}
                  width="200px"
                  height="150px"
                />

                <div className="cart-details">
                  <div className="cart-name">
                    <h4>
                      {item.name}
                      <br />
                      {item.category}
                    </h4>

                    <h5 className="price">
                      ₹
                      {(
                        Number(item.price.replace(/[₹,\s]/g, "")) *
                        item.quantity
                      ).toLocaleString("en-IN")}
                      <br />
                      <span>(includes all taxes)</span>
                    </h5>
                  </div>

                  <div className="cart-qty">
                    <button
                      className="cart-dec"
                      onClick={() => decreaseqty(item.id)}
                    >
                      −
                    </button>

                    <span className="qty">{item.quantity}</span>

                    <button
                      className="cart-inc"
                      onClick={() => increaseqty(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <div className="trash-btn">
                    <button onClick={()=>deletecart(item.id)}>
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="right-page">
          <div className="ord-card">
            <h2>Order summary</h2>

            <hr />

            <span>
              <h4>No of items</h4>
              <h4>{totalqty}</h4>
            </span>

            <span>
              <h4>Subtotal</h4>
              <h4>₹{subtotal.toLocaleString("en-IN")}</h4>
            </span>

            <span>
              <h4>Shipping</h4>
              <h4>Free</h4>
            </span>

            <hr className="tot-line" />

            <span>
              <h2>Total Amount</h2>
              <h3>₹{subtotal.toLocaleString("en-IN")}</h3>
            </span>

            <span className="reward-item">
              <p>Earn totally {rewardPoints} Reward Points for this Purchase</p>
            </span>

            <button className="ord-btn" onClick={placeorder}>Place Order</button>
          </div>
        </div>
      </>
    )}
     {cartLoading && (
                  <div className="loading-overlay">
                    <img src={loadingGif} alt="loading" />
                  </div>
                )}
  </div>
);}
                       
                    
                   
                      
                    
                     
                 