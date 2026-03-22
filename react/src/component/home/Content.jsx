import React from 'react';
import './Content.css';

const Content = () => {
    const cards = [
        { id: 1, title: 'JavaScript', img: 'src/assets/image/js.jpg', desc: 'Master JS Fundamentals' },
        { id: 2, title: 'Java', img: 'src/assets/image/java.jpg', desc: 'Deep dive into Java' },
        { id: 3, title: 'Store', img: 'src/assets/image/store.jpg', desc: 'Exchange your point' },
        { id: 4, title: 'Challenger', img: 'src/assets/image/challenger.jpg', desc: 'Daily challenges' }
    ];

    return (
        <div className="content-grid">
            {cards.map(card => (
                <div key={card.id} className="menu-card">
                    <div className="card-image">
                        <img src={card.img} alt={card.title} />
                    </div>
                    <div className="card-info">
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Content;