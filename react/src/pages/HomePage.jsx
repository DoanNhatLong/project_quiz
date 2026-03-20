import React from 'react';
import { getUser } from '../service/authService';
import Navbar from "../component/common/Navbar.jsx";
import Content from "../component/home/Content.jsx";
import LeftSide from "../component/common/LeftSide.jsx";
import RightSide from "../component/common/RightSide.jsx";
import './css/HomePage.css';

export default function HomePage() {
    const user = getUser();

    return (
        <div className="homepage-container">
            <Navbar />
            <div className="main-layout">
                <LeftSide />

                <main className="content-area">
                    <Content />
                </main>

                <RightSide user={user} />
            </div>
        </div>
    );
}