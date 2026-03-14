import './Pages.css';
import './Contact.css';

export default function Contact() {
    return (
        <div className="page-container container animate-fade-in">
            <div className="page-header">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you. Visit us at any of our locations.</p>
            </div>

            <div className="page-content">
                <section className="info-section contact-intro-section">
                    <h2>Get in Touch</h2>
                    <p>If you have any questions or feedback, feel free to reach out to us. We are always happy to help!</p>
                    <div className="info-details-row">
                        <div className="info-card">
                            <span className="info-icon">📧</span>
                            <div>
                                <strong>Email</strong>
                                <p>info@adfoods.com</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <span className="info-icon">📞</span>
                            <div>
                                <strong>Phone</strong>
                                <p>+44 123 456 7890</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="info-section">
                    <h2>Our Stores</h2>
                    <div className="locations-grid">
                        <div className="location-card">
                            <h4>Paddington Branch</h4>
                            <p className="address">29 Paddington Street, AD Foods</p>
                            <div className="map-wrapper">
                                <iframe
                                    title="Paddington Store Map"
                                    src="https://www.google.com/maps?q=29+Paddington+Street+London&output=embed"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>

                        <div className="location-card">
                            <h4>Claremont Branch</h4>
                            <p className="address">29 Claremont Road, AD Foods</p>
                            <div className="map-wrapper">
                                <iframe
                                    title="Claremont Store Map"
                                    src="https://www.google.com/maps?q=29+Claremont+Road+London&output=embed"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>

                        <div className="location-card">
                            <h4>Kentish Town Branch</h4>
                            <p className="address">69 Kentish Town Road, AD Foods</p>
                            <div className="map-wrapper">
                                <iframe
                                    title="Kentish Town Store Map"
                                    src="https://www.google.com/maps?q=69+Kentish+Town+Road+London&output=embed"
                                    width="100%"
                                    height="250"
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
