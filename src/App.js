import "./App.css";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Cartthings from "./Cartthings";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import Orders from "./Orders";
import Wishlist from "./Wishlist";
import Rewards from "./Rewards";

function App() {

  const [cart, setcart] = useState([]);
  const [wishlist, setwishlist] = useState([]);
  const [search, setSearch] = useState("");

  const location = useLocation();

  function removeFromCart(indexToRemove) {
    setcart(prev =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  }

  return (
    <>
      {location.pathname !== "/signup" &&
       location.pathname !== "/login" && (
        <Header
          cart={cart.length}
          setSearch={setSearch}
        />
      )}

      <Routes>

        <Route
          path="/"
          element={
            <Home
              setcart={setcart}
              setwishlist={setwishlist}
              search={search}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cartthings
              cart={cart}
              removeFromCart={removeFromCart}
            />
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

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/rewards" element={<Rewards />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;