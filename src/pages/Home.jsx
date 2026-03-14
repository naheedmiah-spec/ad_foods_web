import { Link } from 'react-router-dom';
import './Home.css';

const categories = [
    { id: 1, name: 'Groceries', image: '🛒', color: '#82b036' },
    { id: 2, name: 'Drinks', image: '🥤', color: '#3B82F6' },
    { id: 3, name: 'Snacks', image: '🍿', color: '#A855F7' },
    { id: 4, name: 'Fresh', image: '🥬', color: '#22C55E' },
    { id: 5, name: 'Frozen', image: '❄️', color: '#0EA5E9' },
    { id: 6, name: 'Bakery', image: '🍞', color: '#F59E0B' },
];

export default function Home() {
    return (
        <div className="home-container animate-fade-in">
            <section className="hero-section">
                <div className="container hero-content">
                    <div className="hero-text">
                        <span className="hero-badge">New Arrivals Weekly</span>
                        <h1>Authentic Quality <br /><span>Ingredients</span></h1>
                        <p>Sourced with care, delivered with love. Discover our wide range of premium grocery items.</p>
                        <Link to="/catalog" className="cta-btn">Shop the Catalog</Link>
                    </div>
                    <div className="hero-image">
                        <div className="hero-svg-placeholder">
                            {/* This would be a nice image or illustration */}
                            <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="200" cy="200" r="180" fill="#82b036" fillOpacity="0.1" />
                                <rect x="100" y="100" width="200" height="250" rx="10" fill="white" stroke="#82b036" strokeWidth="4" />
                                <circle cx="200" cy="180" r="40" fill="#82b036" fillOpacity="0.2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Shop by Category</h2>
                        <Link to="/catalog">View All</Link>
                    </div>
                    <div className="category-grid">
                        {categories.map(cat => (
                            <Link key={cat.id} to={`/catalog?category=${cat.name}`} className="category-card">
                                <div className="category-icon" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                                    <span>{cat.image}</span>
                                </div>
                                <h3>{cat.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container feature-grid">
                    <div className="feature-item">
                        <div className="feature-icon">🚚</div>
                        <div className="feature-text">
                            <h4>Free Delivery</h4>
                            <p>On orders over £55</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">⭐</div>
                        <div className="feature-text">
                            <h4>Quality Assured</h4>
                            <p>Freshness guaranteed</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🛡️</div>
                        <div className="feature-text">
                            <h4>Secure Payment</h4>
                            <p>100% safe checkout</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
