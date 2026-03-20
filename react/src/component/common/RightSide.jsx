import React from 'react';

const RightSide = ({ user }) => {
    return (
        <aside className="sidebar-wrapper">
            <div className="panel-list">
                <h3 className="panel-title">user profile</h3>
                <div className="panel-content">
                    {user ? (
                        <div className="user-profile-box">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p className="status-online">Status: Online</p>
                        </div>
                    ) : (
                        <p className="placeholder-text">Please login to see profile</p>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default RightSide;