import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import './Pages.css';
import './Admin.css';

export default function AdminAnalytics() {
    const { user, users } = useAuth();
    const { orders, updateOrderStatus } = useOrders();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusMetadata, setStatusMetadata] = useState({ carrier: 'Royal Mail', trackingNumber: '', cancelReason: 'Out of Stock' });
    const [showStatusForm, setShowStatusForm] = useState(false);
    const [notification, setNotification] = useState(null);

    // Dynamic stats calculation
    const totalSales = orders.reduce((sum, order) => sum + order.amount, 0);
    const completedOrders = orders.filter(o => o.status === 'Completed' || o.status === 'Shipped').length;
    const activeMembers = Array.isArray(users) ? users.length : 0;

    const stats = [
        { label: 'Total Sales', value: `£${totalSales.toFixed(2)}`, icon: '💰' },
        { label: 'Total Members', value: activeMembers.toString(), icon: '👥' },
        { label: 'Total Orders', value: orders.length.toString(), icon: '📦' },
        { label: 'Completed/Shipped', value: completedOrders.toString(), icon: '✅' }
    ];

    // Dynamic Top Selling Categories calculation
    const categoryPerformance = useMemo(() => {
        const catSales = {};
        orders.forEach(order => {
            if (order.status === 'Cancelled') return;
            order.items.forEach(item => {
                const cat = item.category || 'Uncategorized';
                catSales[cat] = (catSales[cat] || 0) + (item.price * item.quantity);
            });
        });

        const sortedCats = Object.entries(catSales)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5); // Top 5

        const maxSales = sortedCats.length > 0 ? sortedCats[0][1] : 1;

        return sortedCats.map(([name, sales]) => ({
            name,
            percentage: Math.round((sales / maxSales) * 100),
            total: sales
        }));
    }, [orders]);

    const getShippingRecommendation = (amount) => {
        if (amount < 50) return { provider: 'Royal Mail', reason: 'Order under £50 - Cost effective for small parcels.' };
        return { provider: 'Evri', reason: 'Order over £50 - Better rates for medium/heavy parcels.' };
    };

    const handlePrintSlip = (order) => {
        const printWindow = window.open('', '_blank');

        const content = `
            <html>
            <head>
                <title>Packing Slip - ${order.id}</title>
                <style>
                    body { font-family: sans-serif; padding: 40px; color: #333; }
                    .header { border-bottom: 2px solid #1a3a32; padding-bottom: 20px; margin-bottom: 30px; }
                    .order-info { margin-bottom: 30px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
                    .thank-you { margin-top: 50px; padding: 20px; background: #f9f9f9; border-radius: 8px; text-align: center; font-style: italic; }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>AD Foods & Wine</h1>
                    <p>Packing Slip: ${order.id}</p>
                </div>
                <div class="order-info">
                    <p><strong>Customer:</strong> ${order.customer}</p>
                    <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>£${item.price.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="thank-you">
                    "Thank you for shopping with AD Foods! We hope you enjoy your items. Please visit us again soon."
                </div>
                <script>window.print();</script>
            </body>
            </html>
        `;

        printWindow.document.write(content);
        printWindow.document.close();
    };

    const handleStatusUpdate = (status) => {
        let metadata = {};
        if (status === 'Shipped') {
            metadata = {
                carrier: statusMetadata.carrier,
                trackingNumber: statusMetadata.trackingNumber,
                shippedDate: new Date().toISOString()
            };
        } else if (status === 'Cancelled') {
            metadata = {
                cancelReason: statusMetadata.cancelReason,
                cancelledDate: new Date().toISOString()
            };
        }

        updateOrderStatus(selectedOrder.id, status, metadata);

        // Simulate email sending
        const emailContent = `
            To: ${selectedOrder.email}
            Subject: Order ${selectedOrder.id} - ${status}
            
            Hi ${selectedOrder.customer},
            
            Your order ${selectedOrder.id} has been updated to: ${status}.
            ${status === 'Shipped' ? `Tracking info: ${metadata.carrier} ${metadata.trackingNumber}\nYou can track your order at the carrier website.` : ''}
            ${status === 'Cancelled' ? `Reason: ${metadata.cancelReason}` : ''}
            
            ORDER SUMMARY:
            ${selectedOrder.items.map(i => `- ${i.name} (x${i.quantity})`).join('\n')}
            Total: £${selectedOrder.amount.toFixed(2)}
            
            Thank you,
            AD Foods Team
        `;
        console.log("Simulating Email Sending...", emailContent);

        setNotification(`Email notification sent to ${selectedOrder.customer} (${status})`);
        setTimeout(() => setNotification(null), 5000);

        setShowStatusForm(false);
        setSelectedOrder({ ...selectedOrder, status, ...metadata });
    };

    return (
        <div className="page-container admin-page container animate-fade-in">
            {notification && (
                <div className="admin-notification animate-slide-down">
                    <span className="notif-icon">✉️</span>
                    <p>{notification}</p>
                </div>
            )}

            <header className="admin-header">
                <div>
                    <h1>Sales Analytics</h1>
                    <p>Welcome back, {user.name}. Here's what's happening today.</p>
                </div>
                <div className="admin-actions">
                    <button className="btn-secondary">Export Report</button>
                    <button className="btn-primary">Add Product</button>
                </div>
            </header>

            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <div className="stat-card" key={i}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-info">
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-value">{stat.value}</span>
                            {stat.change && (
                                <span className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                                    {stat.change} vs last month
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-grid">
                <section className="admin-section orders-section">
                    <h3>Recent Orders</h3>
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td><strong>{order.id}</strong></td>
                                        <td>{order.customer}</td>
                                        <td>£{order.amount.toFixed(2)}</td>
                                        <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                                        <td>
                                            <button className="btn-text" onClick={() => {
                                                setSelectedOrder(order);
                                                setShowStatusForm(false);
                                            }}>View Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="admin-section categories-performance">
                    <h3>Top Selling Categories (Auto-updating)</h3>
                    <div className="category-perf-list">
                        {categoryPerformance.length > 0 ? (
                            categoryPerformance.map((cat, i) => (
                                <div className="cat-perf-item" key={i}>
                                    <span className="cat-name">{cat.name}</span>
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${cat.percentage}%` }}></div>
                                    </div>
                                    <span className="cat-total">£{cat.total.toFixed(2)}</span>
                                </div>
                            ))
                        ) : (
                            <p className="empty-msg">No sales data yet.</p>
                        )}
                    </div>
                </section>
            </div>

            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Order Details: {selectedOrder.id}</h3>
                            <button className="close-btn" onClick={() => setSelectedOrder(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="order-summary-grid">
                                <div>
                                    <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                                    <p><strong>Email:</strong> {selectedOrder.email}</p>
                                    <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
                                    <p><strong>Status:</strong> <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></p>
                                    {selectedOrder.trackingNumber && (
                                        <p className="tracking-info"><strong>Tracking:</strong> {selectedOrder.carrier} - {selectedOrder.trackingNumber}</p>
                                    )}
                                    {selectedOrder.cancelReason && (
                                        <p className="cancel-info"><strong>Cancel Reason:</strong> {selectedOrder.cancelReason}</p>
                                    )}
                                </div>
                                <div className="shipping-box">
                                    <p><strong>Internal Logistics Suggestion:</strong></p>
                                    <div className="recommendation">
                                        <span className="provider">{getShippingRecommendation(selectedOrder.amount).provider}</span>
                                        <p className="reason">{getShippingRecommendation(selectedOrder.amount).reason}</p>
                                    </div>
                                    <p className="internal-note"><em>Note: This suggestion is for internal use and doesn't appear on the packing slip.</em></p>
                                </div>
                            </div>

                            {showStatusForm ? (
                                <div className="status-update-form animate-fade-in">
                                    <h4>Update Order Status</h4>
                                    <div className="metadata-inputs">
                                        <div className="input-group">
                                            <label>Carrier</label>
                                            <select
                                                value={statusMetadata.carrier}
                                                onChange={e => setStatusMetadata({ ...statusMetadata, carrier: e.target.value })}
                                            >
                                                <option value="Royal Mail">Royal Mail</option>
                                                <option value="Evri">Evri</option>
                                                <option value="DPD">DPD</option>
                                                <option value="Post Office">Post Office</option>
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <label>Tracking Number</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. JB12345678"
                                                value={statusMetadata.trackingNumber}
                                                onChange={e => setStatusMetadata({ ...statusMetadata, trackingNumber: e.target.value })}
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Cancel Reason</label>
                                            <select
                                                value={statusMetadata.cancelReason}
                                                onChange={e => setStatusMetadata({ ...statusMetadata, cancelReason: e.target.value })}
                                            >
                                                <option value="Out of Stock">Out of Stock</option>
                                                <option value="Address Issue">Address Issue</option>
                                                <option value="Customer Request">Customer Request</option>
                                                <option value="Payment Failed">Payment Failed</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="status-buttons-row">
                                        <button className="btn-status shipped" onClick={() => handleStatusUpdate('Shipped')}>Mark as Shipped</button>
                                        <button className="btn-status completed" onClick={() => handleStatusUpdate('Completed')}>Mark as Completed</button>
                                        <button className="btn-status cancelled" onClick={() => handleStatusUpdate('Cancelled')}>Cancel Order</button>
                                        <button className="btn-text" onClick={() => setShowStatusForm(false)}>Back</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="order-actions-row">
                                    <button className="btn-secondary" onClick={() => handlePrintSlip(selectedOrder)}>Print Packing Slip</button>
                                    <button className="btn-primary" onClick={() => setShowStatusForm(true)}>Manage Status & Tracking</button>
                                </div>
                            )}

                            <h4>Items</h4>
                            <table className="modal-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>£{item.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setSelectedOrder(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
