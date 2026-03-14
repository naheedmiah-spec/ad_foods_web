import './Pages.css';

export default function DeliveryInfo() {
    return (
        <div className="page-container container animate-fade-in">
            <div className="page-header">
                <h1>Delivery Information</h1>
                <p>Reliable shipping for your favorite groceries.</p>
            </div>

            <div className="page-content glass-panel-light">
                <section className="info-section">
                    <h2>Shipping Rates</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Order Value</th>
                                <th>Standard Delivery</th>
                                <th>Frozen Delivery</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Under £55</td>
                                <td>£5.99</td>
                                <td>£8.99</td>
                            </tr>
                            <tr>
                                <td>Over £55</td>
                                <td className="highlight">FREE</td>
                                <td>£3.99</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="info-section">
                    <h2>Delivery Zones</h2>
                    <p>We currently deliver to mainland UK. For Highlands and Islands, additional charges may apply.</p>
                    <ul>
                        <li><strong>Zone 1:</strong> London & South East (1-2 days)</li>
                        <li><strong>Zone 2:</strong> Midlands & North (2-3 days)</li>
                        <li><strong>Zone 3:</strong> Scotland & Wales (3-5 days)</li>
                    </ul>
                </section>

                <section className="info-section">
                    <h2>Same-Day Delivery</h2>
                    <p>Available within a 5-mile radius of our stores in London for orders placed before 12 PM.</p>
                </section>
            </div>
        </div>
    );
}
