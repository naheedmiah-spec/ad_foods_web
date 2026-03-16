import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const slides = [
    {
        id: 1,
        badge: "New Arrival",
        title: "Premium Global <br /><span>Groceries</span>",
        text: "Discover our curated selection of high-quality prepackaged goods from around the world.",
        imageChar: "📦",
        color: "#82b036"
    },
    {
        id: 2,
        badge: "Just In",
        title: "Authentic Asian <br /><span>Spices</span>",
        text: "Enhance your cooking with our premium selection of imported spices, sauces, and seasonings.",
        imageChar: "🌶️",
        color: "#ef4444"
    },
    {
        id: 3,
        badge: "Sweet Treats",
        title: "International <br /><span>Confectionery</span>",
        text: "A world of flavor in every bite. Explore our unique range of imported biscuits and treats.",
        imageChar: "🍪",
        color: "#f59e0b"
    }
];

const categories = [
    { id: 1, name: 'Groceries', image: '🛒', color: '#82b036' },
    { id: 2, name: 'Drinks', image: '🥤', color: '#3B82F6' },
    { id: 3, name: 'Snacks', image: '🍿', color: '#A855F7' },
    { id: 4, name: 'Frozen', image: '❄️', color: '#0EA5E9' },
    { id: 5, name: 'Bakery', image: '🍞', color: '#F59E0B' },
];

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="home-container animate-fade-in">
            <section className="hero-section">
                <div className="container hero-content">
                    <div className="hero-text">
                        <span className="hero-badge">Curated Excellence</span>
                        <h1>Global <br /><span>Pantry.</span><br />Redefined.</h1>
                        <p>Explore our premium collection of authentic prepackaged goods and international specialties, sourced from the world's finest producers.</p>
                        <div className="hero-actions">
                            <Link to="/catalog" className="cta-btn">Shop the Collection</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="hero-visual">
                            <div className="visual-circle"></div>
                            <span className="visual-icon">🌍</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="trust-bar">
                <div className="container trust-content">
                    <div className="trust-item"><span>✨</span> Premium Sourcing</div>
                    <div className="trust-item"><span>🚚</span> Fast UK Delivery</div>
                    <div className="trust-item"><span>📦</span> Eco-Friendly Packing</div>
                    <div className="trust-item"><span>⭐</span> 5-Star Quality</div>
                </div>
            </div>

            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Collections</h2>
                        <Link to="/catalog">View All Categories</Link>
                    </div>
                    <div className="category-grid">
                        {categories.map(cat => (
                            <Link key={cat.id} to={`/catalog?category=${cat.name}`} className="category-card">
                                <div className="category-icon">
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
                        <div className="feature-icon">🌿</div>
                        <div className="feature-text">
                            <h4>Specialty Sourcing</h4>
                            <p>Hand-picked global ingredients</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🏢</div>
                        <div className="feature-text">
                            <h4>Showroom Quality</h4>
                            <p>Visit us in Paddington & Claremont</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🛡️</div>
                        <div className="feature-text">
                            <h4>Secure Checkout</h4>
                            <p>Reliable and protected payments</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
