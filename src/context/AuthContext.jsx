import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Init mock users if not exists
        const storedUsers = localStorage.getItem('ad_foods_all_users');
        if (!storedUsers) {
            const initialUsers = [
                { email: 'naheed.miah@gmail.com', name: 'Naheed (Admin)', id: 'u_1', role: 'admin', status: 'active' },
                { email: 'customer@example.com', name: 'Test User', id: 'u_2', role: 'user', status: 'active' }
            ];
            localStorage.setItem('ad_foods_all_users', JSON.stringify(initialUsers));
            setUsers(initialUsers);
        } else {
            setUsers(JSON.parse(storedUsers));
        }

        // Check local storage for persistent session
        const storedUser = localStorage.getItem('ad_foods_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            } catch (e) {
                console.error('Failed to parse stored user', e);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Admin special case
                if (email === 'naheed.miah@gmail.com' && password === '12345') {
                    const userData = { email, name: 'Naheed', id: 'u_1', role: 'admin' };
                    setUser(userData);
                    setIsAuthenticated(true);
                    localStorage.setItem('ad_foods_user', JSON.stringify(userData));
                    resolve(userData);
                    return;
                }

                if (email && password) {
                    const userData = { email, name: email.split('@')[0], id: 'u_' + Date.now(), role: 'user' };
                    setUser(userData);
                    setIsAuthenticated(true);
                    localStorage.setItem('ad_foods_user', JSON.stringify(userData));
                    resolve(userData);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 800);
        });
    };

    const isAdmin = user?.role === 'admin';

    const manageUser = (userId, updates) => {
        const updatedUsers = users.map(u => u.id === userId ? { ...u, ...updates } : u);
        setUsers(updatedUsers);
        localStorage.setItem('ad_foods_all_users', JSON.stringify(updatedUsers));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('ad_foods_user');
    };

    const register = async (email, password, name) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser = { email, name, id: 'u_' + Date.now(), role: 'user', status: 'active' };
                const updatedUsers = [...users, newUser];
                setUsers(updatedUsers);
                localStorage.setItem('ad_foods_all_users', JSON.stringify(updatedUsers));

                setUser({ ...newUser });
                setIsAuthenticated(true);
                localStorage.setItem('ad_foods_user', JSON.stringify(newUser));
                resolve(newUser);
            }, 1000);
        });
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, users, login, logout, register, manageUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
