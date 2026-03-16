import './Pages.css';
import './About.css';

export default function About() {
    return (
        <div className="page-container container animate-fade-in">
            <div className="about-hero">
                <h1>Authenticity,<br /><span>Found.</span></h1>
                <p>Curating the world's finest pantry essentials since our inception.</p>
            </div>

            <div className="page-content about-content">
                <section className="about-section">
                    <div className="section-title">
                        <h2>Our Story</h2>
                    </div>
                    <div className="section-text">
                        <p>AD Foods began with a simple mission: to make authentic, premium-quality ingredients accessible to everyone. We specialize in hard-to-find international specialties and essential pantry staples, hand-picked for their quality and heritage.</p>
                        <p>With three flagship locations across London, we serve a community of discerning cooks and food lovers who value substance and style in their kitchen.</p>
                    </div>
                </section>

                <section className="about-section">
                    <div className="section-title">
                        <h2>Our Ethos</h2>
                    </div>
                    <div className="section-text">
                        <ul className="ethos-list">
                            <li>
                                <strong>Uncompromising Quality</strong>
                                <p>We only source from producers who share our commitment to excellence.</p>
                            </li>
                            <li>
                                <strong>Global Community</strong>
                                <p>Celebrating diverse culinary traditions through authentic ingredients.</p>
                            </li>
                            <li>
                                <strong>Curated Convenience</strong>
                                <p>A simplified, premium shopping experience for the modern pantry.</p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
