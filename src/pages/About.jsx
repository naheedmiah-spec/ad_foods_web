import { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Pages.css';
import './About.css';

export default function About() {
    return (
        <div className="page-container container animate-fade-in">
            <div className="about-hero">
                <span className="section-label">Our Story</span>
                <h1>Heritage<span>.</span> <br />Curated For The <br />Modern Pantry<span>.</span></h1>
                <p>Establishing a new standard in global ingredient sourcing, from the world's most authentic producers to your kitchen table.</p>
            </div>

            <div className="page-content about-content">
                <section className="about-section">
                    <div className="section-title">
                        <h2>The Beginning</h2>
                    </div>
                    <div className="section-text">
                        <p>Ad Foods was founded with a singular conviction: that extraordinary cooking begins with the authenticity of its ingredients. What started as a focused search for the finest international staples has evolved into a curated gateway for London's most discerning palates.</p>
                        <p>We believe that "prepackaged" should never mean "compromised." Every item on our shelves—from hand-harvested spices to artisan biscuits—carries the heritage of its origin and the integrity of its makers.</p>
                    </div>
                </section>

                <section className="about-section">
                    <div className="section-title">
                        <h2>Our Standards</h2>
                    </div>
                    <div className="section-text">
                        <div className="values-grid">
                            <div className="value-item">
                                <h3>Noble Sourcing</h3>
                                <p>We maintain direct relationships with heritage producers, ensuring ethical practices and uncompromised quality.</p>
                            </div>
                            <div className="value-item">
                                <h3>Curated Precision</h3>
                                <p>Our selection is not exhaustive, but definitive. We stock only what we believe to be the finest in its category.</p>
                            </div>
                            <div className="value-item">
                                <h3>Global Connection</h3>
                                <p>Bridging the distance between distant traditions and local kitchens with speed, care, and expertise.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-cta-section">
                    <div className="cta-content">
                        <h2>Visit Our Showrooms</h2>
                        <p>Experience the collection in person at our Paddington, Claremont, and London central locations.</p>
                        <Link to="/contact" className="cta-btn primary">Get Directions</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
