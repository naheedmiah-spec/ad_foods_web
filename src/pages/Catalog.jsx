import { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import productsData from '../data/products.json';
import './Catalog.css';

const ITEMS_PER_PAGE = 40;

const categories = [
    'All',
    'Beverages/Drinks',
    'Biscuits/Cookies',
    'Chilled Foods',
    'Confectionery',
    'Instant Meals',
    'Noodles',
    'Snacks'
];

export default function Catalog({ onAddToCart, cartItems = [] }) {
    const { isAuthenticated, user } = useAuth();
    const { placeOrder } = useOrders();
    const [animatingItem, setAnimatingItem] = useState(null);
    const location = useLocation();

    const handleAddToCart = (product, e) => {
        // Trigger the original add to cart function
        if (onAddToCart) onAddToCart(product);

        // Get coordinates for animation
        const rect = e.currentTarget.getBoundingClientRect();
        const cartIcon = document.querySelector('.cart-btn');
        const cartRect = cartIcon ? cartIcon.getBoundingClientRect() : { left: window.innerWidth - 50, top: 20 };

        const animId = Date.now();
        setAnimatingItem({
            id: animId,
            start: { x: rect.left, top: rect.top },
            end: { x: cartRect.left, top: cartRect.top },
            char: (product.name || '?').charAt(0)
        });

        // Clean up animation state
        setTimeout(() => setAnimatingItem(null), 800);
    };

    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const initialCategory = queryParams.get('category') || 'All';
    const initialSearch = queryParams.get('search') || '';

    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const searchParam = queryParams.get('search') || '';
        const categoryParam = queryParams.get('category') || 'All';

        setSearchTerm(searchParam);
        setSelectedCategory(categoryParam);
        setCurrentPage(1);
    }, [queryParams]);

    const filteredProducts = useMemo(() => {
        return productsData.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="catalog-wrapper container">
            <aside className="catalog-sidebar">

                <h3>Categories</h3>
                <ul className="category-list">
                    {categories.map(cat => (
                        <li key={cat}>
                            <button
                                className={`category-link ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="sidebar-promo">
                    <h4>Member Deals</h4>
                    {isAuthenticated ? (
                        <p>Enjoy your exclusive member prices and OM Reward points!</p>
                    ) : (
                        <>
                            <p>Log in for exclusive prices and OM Reward points.</p>
                            <Link to="/login" className="btn-promo">Login for Deals</Link>
                        </>
                    )}
                </div>
            </aside>

            <div className="catalog-main animate-fade-in">
                <div className="catalog-header-simple">
                    <h2>{selectedCategory} Products</h2>
                    <p>Showing {filteredProducts.length} results</p>

                    <div className="catalog-controls">
                        <input
                            type="text"
                            placeholder="Search within this category..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="empty-state">
                        <p>No products found matching your criteria.</p>
                    </div>
                ) : (
                    <>
                        <div className="product-grid">
                            {paginatedProducts.map(product => (
                                <div className="product-card" key={product.id}>
                                    <div className="product-image-container">
                                        <div className="product-badges">
                                            {product.applyVat && <span className="badge-halal">HALAL</span>}
                                            {product.sellingPrice < 2 && product.sellingPrice > 0 && <span className="badge-new">NEW</span>}
                                        </div>
                                        <button className="wishlist-btn" title="Add to Wishlist">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                        </button>
                                        <div className="product-image-placeholder">
                                            <span>{(product.name || '?').charAt(0)}</span>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <span className="product-category-text">{product.category}</span>
                                        <h3 className="product-title" title={product.name}>{product.name}</h3>
                                        <div className="product-price-row">
                                            {isAuthenticated ? (
                                                <span className="product-price">
                                                    {product.sellingPrice > 0
                                                        ? `£${product.sellingPrice.toFixed(2)}`
                                                        : 'Price on Request'}
                                                </span>
                                            ) : (
                                                <Link to="/login" className="login-to-view">Login to view price</Link>
                                            )}
                                            <button className="add-cart-icon" onClick={(e) => handleAddToCart(product, e)}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</button>
                                <span className="pagination-info">{currentPage} / {totalPages}</span>
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
                            </div>
                        )}
                    </>
                )}
            </div>
            {animatingItem && (
                <div
                    className="fly-to-cart animate-fly"
                    style={{
                        '--start-x': `${animatingItem.start.x}px`,
                        '--start-y': `${animatingItem.start.top}px`,
                        '--end-x': `${animatingItem.end.x}px`,
                        '--end-y': `${animatingItem.end.top}px`
                    }}
                >
                    {animatingItem.char}
                </div>
            )}
        </div>
    );
}
