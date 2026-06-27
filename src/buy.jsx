import './buy.css';
import { productsdata } from "./products";
import loadingGif from './images/loadingGif.gif'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useContext } from 'react'
import { toast } from "react-toastify";
import { Cartcontext } from './context/Cartcontext';
import axios from "axios";



export default function Buy({  wishlist, setwishlist}){

  const{
    cart,
    setcart
  } = useContext(Cartcontext);

    const [loading, setLoading]=useState(false)


   const navigate = useNavigate();

   const buynow = async (product) => {
  setLoading(true);

  try {
    const userId = localStorage.getItem("user_id");

    const price = Number(product.price.replace(/[₹,\s]/g, ""));

    // Create Order
    const orderResponse = await axios.post(
      "http://127.0.0.1:8000/api/orders/",
      {
        user: userId,
        total: price,
        status: "pending",
      }
    );

    const orderId = orderResponse.data.id;

    // Create Order Item
    await axios.post(
      "http://127.0.0.1:8000/api/orderitems/",
      {
        order: orderId,
        product_name: product.name,
        image: product.images[0],
        quantity: 1,
        price: price,
      }
    );

    toast.success("Order placed successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      theme: "colored",
    });

    navigate("/orders");

  } catch (error) {
       console.log("Status:", error.response?.status);
  console.log("Response:", error.response?.data);
  console.log(error);

  toast.error("Failed to place order");


    toast.error("Failed to place order", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      theme: "colored",
    });

  } finally {
    setLoading(false);
  }
};
   

   const addtocart = (product) => {
      console.log("Add to Cart clicked");
      const exist = cart.find((item)=>(item.id === product.id));

      if(exist){
        setcart(
          cart.map((item)=> 
            item.id === product.id ? {...item,quantity:item.quantity+1}:item
          )
        )
      }
      else{
      setcart([
          ...cart,
          {
            id:product.id,
            name:product.name,
            category:product.category,
            price:product.price,
            image:product.images[0],
            quantity:product.quantity,
            rewardPoints:product.rewardPoints
          }
      ]
      )
    }
    toast.success("Added to cart " ,
      {
        position:"top-center",
        autoClose:1500,
        hideProgressBar:true,
        theme:'colored'
      }
    );
   
   }

   
    var [currentImage , setcurrentImage] = useState(0)
    const {id} = useParams()

    const product = productsdata.find((item)=>(
        item.id === Number(id)
    ))

    if(!product){
        return <h1>Image Not Found</h1>
    }


    const isliked=wishlist.some(
    item => item.id === product.id
   )
   
   const togglewishlist = (product)=>{
    const exist = wishlist.some(
      item => item.id === product.id
    );

    if (exist){
      setwishlist(
        wishlist.filter(item => item.id !== product.id)
      )
    }
    else{
      setwishlist([...wishlist,product])

    toast.success(' 💌 Added to Wishlist', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar:true,
    icon:false,
    theme: "colored",
    style: {
      backgroundColor: '#d9277d', 
      color: '#FFFFFF',
      borderRadius: '8px',
    },
    progressStyle: {
      backgroundColor: '#FF1493' 
    }
  });
    }
    
   }

   

    return(
        <div >
            <h2 className='title'>{product.name}</h2>
            <hr />
           
            <div className='buy-page'>
                 <div className='scroll-container'>
               <button
               className='left-scroll'
               onClick={()=>setcurrentImage(currentImage===0 ? product.images.length-1 : currentImage-1)}
               >
                  ❮
               </button>

                <img src={product.images[currentImage]} alt={product.name} className='scroll-img'/>

                <button
                  className='right-scroll'
                  onClick={()=>setcurrentImage(currentImage===product.images.length-1 ? 0 : currentImage+1)}
                >
                  ❯

                </button>
            </div>
              <div className='details-container'>

                    <h2>{product.details}</h2>
                    <div className="price-container">
                        <h3>{product.name}</h3>
                        <p>From {product.price} <br />
                        (includes of all taxes)</p> 
                    </div>
                    <p className='rewards'>Earn {product.rewardPoints} points for this purchase</p>
                    <div className="rating-container">
                          {[1,2,3,4,5].map((star)=>(
                            <span
                              key={star}
                              className={product.rating >= star ? "star filled" : "star empty"}
                            >
                              {product.rating >= star ? "★" : "☆"}
                            </span>
                          ))}
                          <span className="rating-value">{product.rating}</span>
                     </div>
                    <div className='wish-div'>
                      <svg 
                      className={`like-btn ${isliked? "liked":""} `}  onClick={()=>togglewishlist(product)}
                      width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                     <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                   
                    <br />
                    <button type="button" className='btn addcart-btn btn-primary mt-5'  onClick={()=>addtocart(product)}>Add to Cart</button>
                    </div>
                    <button  type="button" className='btn buynow-btn btn-dark mt-4'    onClick={()=>buynow(product)}>Buynow</button>
                    
                    <div className='product-summary'>

                        <h3>Product details</h3> 
                        <table>
                            <tbody>
                              <tr>
                                <td>Brand</td>
                                <td>{product.brand}</td>
                              </tr>

                              <tr>
                                <td>Product Name</td>
                                <td>{product.name}</td>
                              </tr>

                              <tr>
                                <td>Category</td>
                                <td>{product.category}</td>
                              </tr>

                              <tr>
                                <td>Special Feature</td>
                                <td>{product.specialFeature}</td>
                              </tr>
                            </tbody>
                          </table>

                    </div>

                </div>
            </div>
                <div className='thum-container'>
                    {product.images.map((img,index)=>(
                        <img 
                        key={index}
                        src={img} 
                        alt={product.name}
                        className='thum'
                        onClick={()=>setcurrentImage(index)} />

                    ))}
                    
                </div>
               {loading && (
                  <div className="loading-overlay">
                    <img src={loadingGif} alt="loading" />
                  </div>
                )}
            
        </div>
    )


   }