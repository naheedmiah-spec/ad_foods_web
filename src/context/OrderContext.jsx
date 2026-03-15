import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setOrders(data);
    };

    const placeOrder = async (orderDetails) => {
        const newOrder = {
            id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`,
            customer_name: orderDetails.customer,
            customer_email: orderDetails.email,
            customer_id: user?.id,
            amount: orderDetails.amount,
            status: 'Processing',
            items: orderDetails.items,
            metadata: {}
        };

        const { data, error } = await supabase
            .from('orders')
            .insert([newOrder])
            .select();

        if (error) throw error;

        fetchOrders(); // Refresh local list
        return newOrder;
    };

    const updateOrderStatus = async (orderId, newStatus, metadata = {}) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus, metadata: { ...metadata } })
            .eq('id', orderId);

        if (error) throw error;

        fetchOrders();
    };

    return (
        <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrders = () => useContext(OrderContext);
