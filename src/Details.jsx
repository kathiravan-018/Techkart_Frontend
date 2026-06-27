import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Details.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function Details() {
  const navigate = useNavigate();

  const [showCard, setShowcard] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: "",
    gender: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const user_id = localStorage.getItem("user_id");
  const [profileId, setProfileId] = useState(null);

  // ✅ FETCH PROFILE ON LOAD
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://techkart-backend-7.onrender.com/api/details/user/${user_id}/`
        );

        setUserDetails(res.data);
        setProfileId(res.data.id);
        setShowcard(true);
      } catch (error) {
        setShowcard(false);
      }
    };

    if (user_id) {
      fetchProfile();
    }
  }, [user_id]);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ CREATE OR UPDATE
  const Userdetails = async () => {
    try {
      // CREATE
      if (!profileId) {
        const res = await axios.post(
          "http://techkart-backend-7.onrender.com/api/details/",
          {
            user: user_id,
            ...userDetails,
          }
        );

        setProfileId(res.data.id);
      }

      // UPDATE
      else {
        await axios.put(
          `http://techkart-backend-7.onrender.com/api/details/${profileId}/`,
          {
            user: user_id,
            ...userDetails,
          }
        );
      }

      localStorage.setItem(
        "userDetails",
        JSON.stringify(userDetails)
      );
    } catch (error) {
      console.log(error);

      toast.error("Failed to save details", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        theme: "colored",
      });

      throw error;
    }
  };

  const saveDetails = async () => {
    if (!userDetails.name.trim()) {
      toast.error("Enter Your Name", {
        autoClose: 1500,
        theme: "colored",
        hideProgressBar: true,
        position: "top-center",
      });
      return;
    }

    if (!userDetails.gender) {
      toast.error("Select Gender", {
        autoClose: 1500,
        theme: "colored",
        hideProgressBar: true,
        position: "top-center",
      });
      return;
    }

    if (userDetails.phone.length !== 10) {
      toast.error("Enter Valid Phone Number", {
        autoClose: 1500,
        theme: "colored",
        hideProgressBar: true,
        position: "top-center",
      });
      return;
    }

    try {
      await Userdetails();

      setShowcard(true);

      toast.success("Details Saved Successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        theme: "colored",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mt-4 ms-5">TechKart</h1>

      {!showCard ? (
        <div className="details-page">
          <h2>👤 User Details</h2>

          <input
            type="text"
            name="name"
            placeholder="User Name"
            value={userDetails.name}
            onChange={handleChange}
          />

          <div className="gender-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={userDetails.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={userDetails.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={userDetails.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={userDetails.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={userDetails.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={userDetails.pincode}
            onChange={handleChange}
          />

          <button onClick={saveDetails}>
            Save Details
          </button>
        </div>
      ) : (
        <div className="profile-card">
          <h2>👤 User Profile</h2>

          <div className="profile-row">
            <span className="profile-label">Name</span>
            <span className="profile-value">{userDetails.name}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Gender</span>
            <span className="profile-value">{userDetails.gender}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Phone</span>
            <span className="profile-value">{userDetails.phone}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Address</span>
            <span className="profile-value">{userDetails.address}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">City</span>
            <span className="profile-value">{userDetails.city}</span>
          </div>

          <div className="profile-row">
            <span className="profile-label">Pincode</span>
            <span className="profile-value">{userDetails.pincode}</span>
          </div>

          <button
            className="edit-btn"
            onClick={() => setShowcard(false)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}