import './home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-hero">
                <h1>Welcome to PetPack</h1>
                <p className="home-subtitle">Your trusted store for high-quality pet products</p>
                <div className="pet-icons">
                    <span>🐕</span>
                </div>
            </div>

            <div className="home-features">
                <div className="feature-card">
                    <h3>Quality Products</h3>
                    <p>Carefully selected items for all your pet needs</p>
                </div>
                <div className="feature-card">
                    <h3>Fast Shipping</h3>
                    <p>Delivery within 2-3 business days</p>
                </div>
                <div className="feature-card">
                    <h3>Expert Advice</h3>
                    <p>Guidance from pet care specialists</p>
                </div>
            </div>

            <div className="home-cta">
                <h2>Find the perfect products for your furry, feathery, or scaly friends!</h2>
                <Link to="/shoplist" className="shop-button">Shop Now</Link>
            </div>
        </div>
    );
}