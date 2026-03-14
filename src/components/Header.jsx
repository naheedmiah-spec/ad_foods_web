import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header({ cartCount, onCartClick }) {
    const [tempSearch, setTempSearch] = useState('');
    const navigate = useNavigate();
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (tempSearch.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(tempSearch.trim())}`);
            setTempSearch('');
        }
    };

    return (
        <header className="app-header">
            <div className="utility-bar">
                <div className="container utility-content">
                    <div className="utility-links">
                        <Link to="/contact">Our Stores</Link>
                        <Link to="/faq">Any Questions?</Link>
                        <Link to="/delivery">Delivery Info</Link>
                    </div>
                    <div className="utility-right">
                        <span>Free Delivery on orders over £55</span>
                    </div>
                </div>
            </div>

            <div className="main-header">
                <div className="container main-header-content">
                    <Link to="/" className="brand">
                        <span className="logo-symbol">AD</span>
                        <h1 className="logo-text">AD Foods</h1>
                    </Link>

                    <form className="header-search" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search for products, brands or categories..."
                            value={tempSearch}
                            onChange={(e) => setTempSearch(e.target.value)}
                        />
                        <button type="submit" className="search-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </button>
                    </form>

                    <div className="header-actions">
                        {!isAuthenticated ? (
                            <div className="auth-links">
                                <Link to="/login" className="login-link">Sign In</Link>
                                <Link to="/register" className="register-btn">Register</Link>
                            </div>
                        ) : (
                            <div className="user-menu">
                                <div className="user-info">
                                    <span className="user-greeting">Hi, {user.name}</span>
                                    {isAdmin && <span className="admin-badge">ADMIN</span>}
                                </div>
                                <button onClick={logout} className="logout-btn" title="Logout">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                </button>
                            </div>
                        )}
                        <button className="cart-btn" onClick={onCartClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>
                    </div>
                </div>
            </div>

            <nav className="sticky-nav">
                <div className="container nav-content">
                    <ul className="nav-menu">
                        <li><Link to="/">Groceries</Link></li>
                        <li><Link to="/wholesale">Wholesale</Link></li>
                        {isAdmin && (
                            <>
                                <li><Link to="/admin" className="admin-nav-link">Analytics</Link></li>
                                <li><Link to="/users" className="admin-nav-link">Users</Link></li>
                            </>
                        )}
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
