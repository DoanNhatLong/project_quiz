import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/userSlice.js";

const RightSide = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.data);

    function handleLogout() {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <aside style={{ padding: "20px", width: "300px" }}>
            <div className="nes-container is-dark">

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
                    {user ? (
                        <>
                            <div style={{ textAlign: "center" }}>
                                <i className="nes-ash" style={{ transform: "scaleX(-1)" }}></i>
                                <p style={{ marginTop: "10px", color: "#f7d51d" }}>LVL. 1 Adventurer</p>
                                <h3 style={{ fontSize: "1.2rem" }}>Chào {user.username}</h3>
                            </div>

                            <button
                                type="button"
                                className="nes-btn is-primary is-fullwidth"
                                onClick={() => navigate('/profile')}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
                            >
                                <i className="ra ra-player"></i>
                                INFO
                            </button>

                            <button
                                type="button"
                                className="nes-btn is-error is-fullwidth"
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </button>
                        </>
                    ) : (
                        <>
                            <div style={{ textAlign: "center" }}>
                                <i className="nes-pokeball"></i>
                                <h3 style={{ marginTop: "10px" }}>Hello, Guest</h3>
                                <p style={{ fontSize: "0.8rem" }}>Login to save progress</p>
                            </div>

                            <button
                                type="button"
                                className="nes-btn is-success is-fullwidth"
                                onClick={() => navigate('/login')}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
                            >
                                <i className="ra ra-key"></i>
                                LOGIN
                            </button>

                            <button
                                type="button"
                                className="nes-btn is-warning is-fullwidth"
                                onClick={() => navigate('/register')}
                            >
                                REGISTER
                            </button>
                        </>
                    )}
                </div>
            </div>

        </aside>
    );
};

export default RightSide;