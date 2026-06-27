import "./App.css";
import { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Cartthings from "./Cartthings";
import Signin from "./Signin";
import Login from "./Login";
import Orders from "./Orders";
import OrdersDetails from "./OrdersDetails";
import Wishlist from "./Wishlist";
import Rewards from "./Rewards";
import Buy from "./buy";
import AboutUs from "./Aboutus";
import Features from "./Features";
import Details from "./Details";

function App() {
  
  

  
  const [search, setSearch] = useState("");

  const location = useLocation();

  useLayoutEffect(() => {
  window.scrollTo(0, 0);
}, [location.pathname]);

  const [wishlist, setwishlist] = useState(() => {
  const saved = localStorage.getItem("wishlist");
  return saved ? JSON.parse(saved) : [];
});

    useEffect(() => {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

  return (
    <>
      {location.pathname !== "/Signin" &&
        location.pathname !== "/login" &&
        location.pathname !== "/userdetails" && (
          <Header setSearch={setSearch} />
        )}

      <Routes>

        <Route
          path="/"
          element={
            <Home
              search={search}
            />
          }
        />
          
        <Route
          path="/cart"
          element={
            <Cartthings/>
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setwishlist={setwishlist}
            />
          }
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route 
            path="/orders" 
            element={<Orders /> } /> 
        <Route 
            path="/orders/:id" 
            element={<OrdersDetails />} />
        
        <Route path="/rewards" element={<Rewards />} />

        <Route path="/userdetails" element={<Details/>}/>

        <Route
          path="/buy/:id"
          element={
            <Buy
              wishlist={wishlist}
              setwishlist={setwishlist}
            />
          }
        />

        <Route
          path="/aboutus"
          element={
            <AboutUs />
          }
        />

        <Route 
          path="/features"
          element={
            <Features />
          }
          />

      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;