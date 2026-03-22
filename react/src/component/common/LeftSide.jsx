import React from 'react';

const LeftSide = () => {
    return (
        <aside style={{ padding: "20px", width: "300px" }}>
            <div className="nes-container is-success">
                <h3 className="panel-title">leaderboard</h3>
                <div className="panel-content">
                    <p className="placeholder-text">No data available yet...</p>
                </div>
            </div>
        </aside>
    );
};

export default LeftSide;