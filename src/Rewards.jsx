import { toast } from "react-toastify";
import './Rewards.css';



export default function Rewards() {

    const redeem = ()=>toast.success("Rewards Successfully redeemed", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        theme:"colored"
      });

    return (
        <div className="container mt-5 text-center">

            <h2>🎁 Techkart Rewards</h2>

            <div className="rewards-page">

  <div className="points-card">
    <h1>⭐ 2450</h1>
    <p>Available Reward Points</p>
    <button onClick={redeem}>Redeem Rewards</button>
  </div>

  <div className="rewards-list">
    <h2>Reward Coupons</h2>

    <div className="reward-card">
      <div>
        <h4>₹50 OFF Coupon</h4>
        <p>100 Points</p>
      </div>
      <button  onClick={redeem}>Redeem</button>
    </div>

    <div className="reward-card">
      <div>
        <h4>₹150 OFF Coupon</h4>
        <p>250 Points</p>
      </div>
      <button onClick={redeem}>Redeem</button>
    </div>
  </div>

</div>

        </div>
    );
}