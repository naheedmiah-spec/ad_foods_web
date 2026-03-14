import './Pages.css';

export default function Legal() {
    return (
        <div className="page-container container animate-fade-in">
            <div className="page-header">
                <h1>Legal & Policies</h1>
                <p>Transparency and protection for our community.</p>
            </div>

            <div className="page-content">
                <section className="info-section">
                    <h2>Terms & Conditions</h2>
                    <p>By using the AD Foods website, you agree to comply with our usage policies. We reserve the right to update these terms at any time.</p>
                    <p>All product information is provided as accurately as possible, but we cannot guarantee that prices or availability will always be up to date.</p>
                </section>

                <section className="info-section">
                    <h2>Privacy Policy</h2>
                    <p>Your privacy is important to us. We only collect the data necessary to fulfill your orders and improve our service. We never sell your personal information to third parties.</p>
                    <ul>
                        <li>Data Encryption: SSL-secured checkout.</li>
                        <li>Marketing: Opt-in only emails.</li>
                        <li>Cookies: Used to remember your cart and preferences.</li>
                    </ul>
                </section>

                <section className="info-section">
                    <h2>Cookie Policy</h2>
                    <p>Our website uses essential cookies to function correctly. Analytical cookies help us understand how you use the site so we can make it better.</p>
                </section>
            </div>
        </div>
    );
}
