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
                        <span className="hero-badge">Curated Global Pantry</span>
                        <h1>Extraordinary <br />Ingredients for the <br />Everyday <span>Kitchen.</span></h1>
                        <p>Sourcing the world's most authentic pantry staples, delivered to our London doorsteps. Heritage-conscious flavor, curated for you.</p>
                        <div className="hero-actions">
                            <Link to="/catalog" className="cta-btn primary">Shop the Collection</Link>
                            <Link to="/about" className="cta-btn secondary">Our Sourcing Story</Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="hero-art-piece">
                            <div className="art-circle"></div>
                            <span className="art-emblem">🌍</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="trust-strip">
                <div className="container trust-strip-content">
                    <div className="trust-strip-item">Sourced Globally</div>
                    <div className="trust-strip-item">Three London Shops</div>
                    <div className="trust-strip-item">Trusted Heritage</div>
                </div>
            </div>

            <section className="shop-floor">
                <div className="container">
                    <div className="shop-header">
                        <h2>The Shop Floor</h2>
                        <p>Explore our curated collections by category</p>
                    </div>
                    <div className="shop-grid">
                        {categories.map(cat => (
                            <Link key={cat.id} to={`/catalog?category=${cat.name}`} className="shop-card">
                                <div className="shop-card-image">
                                    <span>{cat.image}</span>
                                </div>
                                <div className="shop-card-info">
                                    <h3>{cat.name}</h3>
                                    <span>Explore Range &rarr;</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="sourcing-feature">
                <div className="container sourcing-content">
                    <div className="sourcing-text">
                        <span className="section-label">B2B & Specialty</span>
                        <h2>Global Partners in Flavor</h2>
                        <p>Beyond our retail shelves, we offer bespoke specialty sourcing for chefs, restaurants, and food partners globally. If it exists, we can find it.</p>
                        <Link to="/contact" className="text-cta">Partner with Ad Foods &rarr;</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
