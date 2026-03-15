import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                handleUserSession(session);
            } else {
                setLoading(false);
            }
        });

        // 2. Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                handleUserSession(session);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
            }
        });

        // 3. Fetch all users for Admin panel
        fetchUsers();

        return () => subscription.unsubscribe();
    }, []);

    const handleUserSession = async (session) => {
        const { user: authUser } = session;

        // Fetch profile
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

        if (profile) {
            const userData = { ...authUser, ...profile };
            setUser(userData);
            setIsAuthenticated(true);
        } else {
            // Profile might not be created yet (trigger lag), use session data
            const userData = {
                ...authUser,
                role: (authUser.email === 'naheed.miah@gmail.com' || authUser.email === 'anas.arif786@adfoods.co.uk') ? 'admin' : 'user'
            };
            setUser(userData);
            setIsAuthenticated(true);
        }
        setLoading(false);
    };

    const fetchUsers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setUsers(data);
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data.user;
    };

    const resetPassword = async (email) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        return data;
    };

    const updatePassword = async (newPassword) => {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword
        });
        if (error) throw error;
        return data;
    };

    const register = async (email, password, name) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name }
            }
        });
        if (error) throw error;
        return data.user;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setIsAuthenticated(false);
    };

    const isAdmin = user?.role === 'admin';

    const manageUser = async (userId, updates) => {
        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);

        if (!error) fetchUsers();
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, users, login, logout, register, resetPassword, updatePassword, manageUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
