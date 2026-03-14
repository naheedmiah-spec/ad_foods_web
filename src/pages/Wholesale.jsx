import './Pages.css';

export default function Wholesale() {
    return (
        <div className="page-container container animate-fade-in">
            <div className="page-header">
                <h1>Wholesale Inquiries</h1>
                <p>Scale your business with AD Foods bulk supplies.</p>
            </div>

            <div className="page-content glass-panel-light">
                <div className="wholesale-intro">
                    <h2>Dedicated B2B Support</h2>
                    <p>Whether you run a restaurant, a catering business, or a local shop, AD Foods provides competitive wholesale pricing on over 1,000 authentic products.</p>
                </div>

                <div className="wholesale-grid">
                    <div className="wholesale-feature">
                        <span className="icon">📦</span>
                        <h3>Bulk Discounts</h3>
                        <p>Significant savings on case-quantities and high-volume orders.</p>
                    </div>
                    <div className="wholesale-feature">
                        <span className="icon">🚛</span>
                        <h3>Pallet Delivery</h3>
                        <p>Specialized logistics for large-scale inventory needs.</p>
                    </div>
                    <div className="wholesale-feature">
                        <span className="icon">📞</span>
                        <h3>Account Manager</h3>
                        <p>Direct support line for all your procurement queries.</p>
                    </div>
                </div>

                <section className="wholesale-form-section">
                    <h2>Enquiry Form</h2>
                    <form className="wholesale-form">
                        <div className="form-group">
                            <label>Business Name</label>
                            <input type="text" placeholder="Enter your business name" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="example@business.com" />
                        </div>
                        <div className="form-group">
                            <label>Estimated Monthly Spend</label>
                            <select>
                                <option>Under £1,000</option>
                                <option>£1,000 - £5,000</option>
                                <option>£5,000 - £20,000</option>
                                <option>Over £20,000</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea placeholder="Tell us about your requirements..."></textarea>
                        </div>
                        <button type="button" className="submit-btn">Send Enquiry</button>
                    </form>
                </section>
            </div>
        </div>
    );
}
