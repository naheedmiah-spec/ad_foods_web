import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('ad_foods_orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem('ad_foods_orders', JSON.stringify(orders));
    }, [orders]);

    const placeOrder = (orderDetails) => {
        const newOrder = {
            ...orderDetails,
            id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toISOString(),
            status: 'Processing'
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const updateOrderStatus = (orderId, newStatus, metadata = {}) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus, ...metadata } : order
        ));
    };

    return (
        <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrders = () => useContext(OrderContext);
