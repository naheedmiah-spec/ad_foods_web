import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('ad_foods_orders');
        return savedOrders ? JSON.parse(savedOrders) : [
            {
                id: '#ORD-9021',
                date: '2026-03-14T10:30:00Z',
                customer: 'John Doe',
                email: 'john@example.com',
                amount: 45.20,
                status: 'Completed',
                items: [
                    { name: 'Cadbury Dairy Milk 110g', quantity: 2, price: 1.50 },
                    { name: 'Coca-Cola 500ml', quantity: 1, price: 1.20 }
                ]
            },
            {
                id: '#ORD-9022',
                date: '2026-03-14T11:45:00Z',
                customer: 'Sarah Jenkins',
                email: 'sarah.j@example.com',
                amount: 120.50,
                status: 'Processing',
                items: [
                    { name: 'Indomie Mi Goreng 5-pack', quantity: 4, price: 2.50 },
                    { name: 'Kato Coconut Juice 320ml', quantity: 12, price: 0.85 }
                ]
            }
        ];
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
