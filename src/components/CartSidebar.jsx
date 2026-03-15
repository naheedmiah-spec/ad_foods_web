import './CartSidebar.css';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

export default function CartSidebar({ isOpen, onClose, cartItems, onRemoveItem }) {
    const { isAuthenticated, user } = useAuth();
    const { placeOrder } = useOrders();

    const total = cartItems.reduce((sum, item) => sum + (item.sellingPrice || 0) * (item.quantity || 1), 0);

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            alert("Please login to place an order.");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        try {
            await placeOrder({
                customer: user?.name || 'Guest User',
                email: user?.email || 'guest@example.com',
                amount: total,
                items: cartItems.map(item => ({
                    name: item.name,
                    category: item.category,
                    quantity: item.quantity || 1,
                    price: item.sellingPrice || 0
                }))
            });

            alert("Order placed successfully! Check the Admin Analytics to see it in real-time.");
            onClose();
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-sidebar-header">
                    <h3>Your Shopping Bag</h3>
                    <button className="close-sidebar" onClick={onClose}>×</button>
                </div>

                <div className="cart-sidebar-body">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-msg">
                            <p>Your cart is empty.</p>
                            <button className="btn-text" onClick={onClose}>Start Shopping</button>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {cartItems.map((item, idx) => (
                                <div className="cart-item-row" key={idx}>
                                    <div className="item-char-logo">{(item.name || '?').charAt(0)}</div>
                                    <div className="item-details">
                                        <p className="item-name">{item.name}</p>
                                        <p className="item-price">£{(item.sellingPrice || 0).toFixed(2)}</p>
                                    </div>
                                    <button className="remove-item" onClick={() => onRemoveItem(idx)}>×</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-sidebar-footer">
                        <div className="cart-total-row">
                            <span>Subtotal</span>
                            <span className="total-amount">£{total.toFixed(2)}</span>
                        </div>
                        <div className="cart-actions">
                            <button className="btn-secondary" onClick={onClose}>Continue Shopping</button>
                            <button className="btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
