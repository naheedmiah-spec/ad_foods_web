import './Pages.css';
import './Contact.css';

export default function Contact() {
    return (
        <div className="page-container container animate-fade-in">
            <div className="contact-hero">
                <span className="section-label">Get in Touch</span>
                <h1>Visit Our<span>.</span> <br />London Showrooms<span>.</span></h1>
                <p>Experience our curated collections in person. Our experts are ready to guide you through the world's finest pantry essentials.</p>
            </div>

            <div className="page-content contact-content">
                <section className="contact-info-grid">
                    <div className="contact-methods">
                        <div className="method-card">
                            <h3>General Inquiries</h3>
                            <p>For product availability, sourcing requests, or partnership opportunities.</p>
                            <a href="mailto:info@adfoods.com" className="email-link">info@adfoods.com</a>
                        </div>
                        <div className="method-card">
                            <h3>Phone Support</h3>
                            <p>Available during showroom hours across all locations.</p>
                            <a href="tel:+441234567890" className="phone-link">+44 123 456 7890</a>
                        </div>
                    </div>
                </section>

                <section className="locations-section">
                    <h2 className="locations-heading">Locations</h2>
                    <div className="locations-grid">
                        <div className="location-card">
                            <div className="location-details">
                                <span className="location-tag">Flagship</span>
                                <h4>Paddington<span>.</span></h4>
                                <p className="address">29 Paddington Street, London</p>
                                <p className="hours">Open 7 Days: 9am — 8pm</p>
                            </div>
                            <div className="map-wrapper">
                                <iframe
                                    title="Paddington Store Map"
                                    src="https://www.google.com/maps?q=29+Paddington+Street+London&output=embed"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>

                        <div className="location-card">
                            <div className="location-details">
                                <span className="location-tag">Artisan</span>
                                <h4>Claremont<span>.</span></h4>
                                <p className="address">29 Claremont Road, London</p>
                                <p className="hours">Open 7 Days: 10am — 7pm</p>
                            </div>
                            <div className="map-wrapper">
                                <iframe
                                    title="Claremont Store Map"
                                    src="https://www.google.com/maps?q=29+Claremont+Road+London&output=embed"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>

                        <div className="location-card">
                            <div className="location-details">
                                <span className="location-tag">Community</span>
                                <h4>Kentish Town<span>.</span></h4>
                                <p className="address">69 Kentish Town Road, London</p>
                                <p className="hours">Open 7 Days: 9am — 9pm</p>
                            </div>
                            <div className="map-wrapper">
                                <iframe
                                    title="Kentish Town Store Map"
                                    src="https://www.google.com/maps?q=69+Kentish+Town+Road+London&output=embed"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
