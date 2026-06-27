import { createContext } from "react";
import { useState, useEffect } from "react";

export const Cartcontext = createContext();
export default function CartProvider({children}){

    const [cart, setcart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
      });

    const increaseqty=(id)=>{
    setcart(
      cart.map((item)=>item.id===id ? {...item,quantity:item.quantity+1}:item)
    );
  };

    const decreaseqty=(id)=>{
        setcart(
            cart.map((item)=>item.id===id && item.quantity > 1 ? {...item,quantity:item.quantity-1}:item)
        );
        };

        
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const deletecart=(id)=>{
    const updatecart = cart.filter((item)=>item.id !== id);

    setcart(updatecart);
    localStorage.setItem("cart",JSON.stringify(updatecart));
  } 


  return(
    <Cartcontext.Provider value={{
        cart,
        setcart,
        increaseqty,
        decreaseqty,
        deletecart
    }}>
        {children}
    </Cartcontext.Provider>
  )

}