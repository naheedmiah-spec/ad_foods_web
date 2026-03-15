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
    { id: 4, name: 'Fresh', image: '🥬', color: '#22C55E' },
    { id: 5, name: 'Frozen', image: '❄️', color: '#0EA5E9' },
    { id: 6, name: 'Bakery', image: '🍞', color: '#F59E0B' },
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
                <div className="slideshow-controls">
                    <button className="slide-arrow prev" onClick={prevSlide}>&larr;</button>
                    <button className="slide-arrow next" onClick={nextSlide}>&rarr;</button>
                </div>

                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <div className="container hero-content">
                            <div className="hero-text">
                                <span className="hero-badge" style={{ backgroundColor: `${slide.color}20`, color: slide.color }}>
                                    {slide.badge}
                                </span>
                                <h1 dangerouslySetInnerHTML={{ __html: slide.title }} />
                                <p>{slide.text}</p>
                                <Link to="/catalog" className="cta-btn" style={{ backgroundColor: slide.color }}>
                                    Explore Catalog
                                </Link>
                            </div>
                            <div className="hero-image">
                                <div className="hero-svg-placeholder" style={{ borderColor: slide.color }}>
                                    <div className="slide-icon-burst" style={{ backgroundColor: `${slide.color}15` }}>
                                        <span>{slide.imageChar}</span>
                                    </div>
                                    <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="200" cy="200" r="180" fill={slide.color} fillOpacity="0.05" />
                                        <rect x="100" y="100" width="200" height="250" rx="10" fill="white" stroke={slide.color} strokeWidth="2" strokeDasharray="10 5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="slide-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
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
                    <Link to="/catalog" className="feature-item">
                        <div className="feature-icon">📦</div>
                        <div className="feature-text">
                            <h4>Premium Range</h4>
                            <p>Imported specialties</p>
                        </div>
                    </Link>
                    <Link to="/about" className="feature-item">
                        <div className="feature-icon">⭐</div>
                        <div className="feature-text">
                            <h4>Quality Assured</h4>
                            <p>Hand-picked products</p>
                        </div>
                    </Link>
                    <Link to="/contact" className="feature-item">
                        <div className="feature-icon">📍</div>
                        <div className="feature-text">
                            <h4>Visit Us</h4>
                            <p>3 London locations</p>
                        </div>
                    </Link>
                    <Link to="/about" className="feature-item">
                        <div className="feature-icon">📖</div>
                        <div className="feature-text">
                            <h4>Our Story</h4>
                            <p>About AD Foods</p>
                        </div>
                    </Link>
                    <Link to="/faq" className="feature-item">
                        <div className="feature-icon">💬</div>
                        <div className="feature-text">
                            <h4>Any Questions?</h4>
                            <p>Friendly support</p>
                        </div>
                    </Link>
                </div>
            </section>
        </div>
    );
}
