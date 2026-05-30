import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {

    const username = localStorage.getItem("username");

    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!username) return;

        axios.get(`http://127.0.0.1:8000/api/profile/?username=${username}`)
            .then(res => {

                setProfile(res.data);

                setEmail(res.data.email || "");
                setPhone(res.data.phone || "");
                setAddress(res.data.address || "");
                setGender(res.data.gender || "");

                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });

    }, [username]);

    const saveProfile = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/profile/", {
                username,
                email,
                phone,
                address,
                gender
            });

            setProfile(res.data);
            setEditMode(false); // 🔥 switch to view mode after save

            alert("Profile Saved 🚀");

        } catch (err) {
            console.log(err.response?.data);
            alert("Error saving profile ❌");
        }
    };

    if (loading) {
        return <h3 className="text-center mt-5">Loading profile...</h3>;
    }

    return (
        <div className="container mt-5">

            <h2>User Profile</h2>

            {/* 🔥 VIEW MODE */}
            {!editMode && profile && (
                <div className="card p-4 shadow">

                    <p><b>Username:</b> {profile.username}</p>
                    <p><b>Email:</b> {profile.email || "-"}</p>
                    <p><b>Phone:</b> {profile.phone || "-"}</p>
                    <p><b>Address:</b> {profile.address || "-"}</p>
                    <p><b>Gender:</b> {profile.gender || "-"}</p>

                    <button
                        className="btn btn-warning mt-3"
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </button>

                </div>
            )}

            {/* ✏️ EDIT MODE */}
            {editMode && (
                <div>

                    <label>Email</label>
                    <input
                        className="form-control mb-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Phone</label>
                    <input
                        className="form-control mb-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <label>Address</label>
                    <input
                        className="form-control mb-2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <label>Gender</label>
                    <div className="mb-3">

                        <label className="me-3">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === "Male"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Male
                        </label>

                        <label className="me-3">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === "Female"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Female
                        </label>

                    </div>

                    <button className="btn btn-success w-100" onClick={saveProfile}>
                        Save Profile
                    </button>

                </div>
            )}

        </div>
    );
}