import { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
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

export default function Catalog() {
    const location = useLocation();

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
                <div className="sidebar-section">
                    <h3>Collections</h3>
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
                </div>

                <div className="sidebar-promo">
                    <h4>Specialty Sourcing</h4>
                    <p>Looking for a rare international ingredient? Our global network can find it for you.</p>
                </div>
            </aside>

            <div className="catalog-main animate-fade-in">
                <div className="catalog-header-simple">
                    <div className="header-content-left">
                        <h2>{selectedCategory.toLowerCase()}<span>.</span></h2>
                        <p>{filteredProducts.length} curated essentials</p>
                    </div>

                    <div className="catalog-controls">
                        <input
                            type="text"
                            placeholder="filter collection..."
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
                                        <div className="product-image-placeholder">
                                            <span>{(product.name || '?').charAt(0)}</span>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <span className="product-category-text">{product.category}</span>
                                        <h3 className="product-title" title={product.name}>{product.name}</h3>
                                        <div className="product-meta">
                                            <span className="product-status">Available in store</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* specialty sourcing card */}
                            <div className="product-card sourcing-card">
                                <div className="product-image-container">
                                    <div className="product-image-placeholder sourcing-icon">
                                        <span>?</span>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <span className="product-category-text">Bespoke Service</span>
                                    <h3 className="product-title">Can't find a specific ingredient?</h3>
                                    <Link to="/contact" className="sourcing-link">Request Sourcing &rarr;</Link>
                                </div>
                            </div>
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
        </div>
    );
}
