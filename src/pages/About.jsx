import './Pages.css';
import './About.css';

export default function About() {
    return (
        <div className="page-container container animate-fade-in">
            <div className="page-header">
                <h1>About AD Foods</h1>
                <p>Your trusted neighborhood grocery.</p>
            </div>
            <div className="page-content">
                <section className="info-section">
                    <h2>Our Story</h2>
                    <p>AD Foods has been serving the community with fresh, premium quality ingredients for years. We source the best products to ensure our customers get top-tier groceries delivered straight to their doors.</p>
                    <p>Whether you're looking for everyday essentials or specialty items, our wide selection caters to all your needs.</p>
                </section>

                <section className="info-section">
                    <h2>Our Values</h2>
                    <ul className="values-list">
                        <li><strong>Quality:</strong> We never compromise on the freshness of our produce.</li>
                        <li><strong>Community:</strong> Proudly serving our local neighborhoods with care.</li>
                        <li><strong>Convenience:</strong> Making your grocery shopping as easy as possible.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
