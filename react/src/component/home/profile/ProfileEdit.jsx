import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileEdit = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [tempName, setTempName] = useState(user.name || user.username);

    const handleSave = () => {
        setUser({ ...user, name: tempName });
        navigate('/home/profile');
    };

    return (
        <section className="nes-container is-with-title" style={{ backgroundColor: "white", padding: "30px" }}>
            <p className="title" style={{ fontSize: "1.5rem" }}>Edit Character</p>

            <div className="nes-field" style={{ marginBottom: "25px" }}>
                <label htmlFor="name_field" style={{ display: "block", marginBottom: "10px" }}>
                    <i className="ra ra-edit-style"></i> New Name
                </label>
                <input
                    type="text"
                    id="name_field"
                    className="nes-input"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Enter your hero name..."
                />
            </div>

            <div className="nes-field" style={{ marginBottom: "25px" }}>
                <label style={{ display: "block", marginBottom: "10px", color: "#999" }}>
                    <i className="ra ra-envelope"></i> Email (Cannot change)
                </label>
                <input
                    type="text"
                    className="nes-input is-disabled"
                    value={user.email}
                    disabled
                />
            </div>

            <div style={{ marginTop: "40px", display: "flex", gap: "20px" }}>
                <button
                    onClick={handleSave}
                    type="button"
                    className="nes-btn is-primary"
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
                >
                    <i className="ra ra-save"></i> SAVE
                </button>

                <button
                    onClick={() => navigate(-1)}
                    type="button"
                    className="nes-btn"
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
                >
                    <i className="ra ra-pawn"></i> CANCEL
                </button>
            </div>
        </section>
    );
};

export default ProfileEdit;