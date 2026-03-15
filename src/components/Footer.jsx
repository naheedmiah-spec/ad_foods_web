import { supabase } from '../lib/supabase';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) {
            setStatus({ type: 'error', message: 'Please enter an email address.' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus({ type: 'error', message: 'Please enter a valid email address.' });
            return;
        }

        setStatus({ type: 'loading', message: 'Subscribing...' });

        try {
            const { error } = await supabase
                .from('newsletter_subscriptions')
                .insert([{ email: email.toLowerCase() }]);

            if (error) {
                if (error.code === '23505') {
                    setStatus({ type: 'success', message: 'You are already subscribed!' });
                } else {
                    throw error;
                }
            } else {
                setStatus({ type: 'success', message: 'Thank you for subscribing!' });
            }
            setEmail('');
        } catch (error) {
            console.error('Newsletter error:', error);
            setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (status.type) setStatus({ type: '', message: '' });
    };

    return (
        <footer className="app-footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>Customer Services</h3>
                    <ul>
                        <li><Link to="/faq">FAQs</Link></li>
                        <li><Link to="/legal">Terms & Conditions</Link></li>
                        <li><Link to="/legal">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/catalog">View Catalog</Link></li>
                        <li><Link to="/about">About AD Foods</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Social Media</h3>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">FB</a>
                        <a href="#" aria-label="Instagram">IG</a>
                        <a href="#" aria-label="TikTok">TK</a>
                    </div>
                    <p className="footer-note">Follow us for latest deals!</p>
                </div>

                <div className="footer-section newsletter">
                    <h3>Newsletter</h3>
                    <p>Subscribe for updates and offers.</p>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={handleEmailChange}
                                className={status.type === 'error' ? 'error' : ''}
                            />
                            <button type="submit" disabled={status.type === 'loading'}>
                                {status.type === 'loading' ? '...' : 'Join'}
                            </button>
                        </div>
                        {status.message && (
                            <p className={`status-message ${status.type}`}>
                                {status.message}
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} AD Foods. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
