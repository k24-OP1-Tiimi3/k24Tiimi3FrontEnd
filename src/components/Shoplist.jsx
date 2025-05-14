import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import './shoplist.css';
import { useCart } from './Cart/CartContext';
import { useUser } from './Customers/UserContext';

/**
 * Shoplist component displays all available products
 * and allows filtering them by manufacturer.
 * Users can add products to the cart if they are logged in.
 */
export default function Shoplist() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [activeManufacturer, setActiveManufacturer] = useState('all');
    const [error, setError] = useState(null);
    const { addToCart, error: cartError, setError: setCartError } = useCart();
    const { user } = useUser();

    // Fetch products when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getProducts();
                setProducts(productData);
                setFilteredProducts(productData);

                // Create a list of unique manufacturers for filtering
                const uniqueManufacturers = [...new Set(
                    productData.map(product =>
                        product.manufacturerName ||
                        (product.manufacturer && product.manufacturer.name)
                    ).filter(name => name)
                )];

                setManufacturers(uniqueManufacturers);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    // Clear cart errors when component unmounts
    useEffect(() => {
        return () => {
            setCartError && setCartError('');
        };
    }, [setCartError]);

    /**
     * Handles manufacturer selection change and filters products accordingly
     */
    const handleManufacturerChange = (event) => {
        const selectedManufacturer = event.target.value;
        setActiveManufacturer(selectedManufacturer);

        // Filter products based on selected manufacturer
        if (selectedManufacturer === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                (product.manufacturerName === selectedManufacturer) ||
                (product.manufacturer && product.manufacturer.name === selectedManufacturer)
            );
            setFilteredProducts(filtered);
        }
    };

    /**
     * Adds a product to the cart if user is logged in
     */
    const handleAddToCart = (product) => {
        // Only add if user is logged in
        if (!user) {
            setCartError('Please log in to add items to your cart.');
            return;
        }

        addToCart(product);
    };

    // Show error message if product fetch failed
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="shoplist-container">
            <h3 className="shoplist-title">Product List</h3>

            {/* Display cart errors if any */}
            {cartError && <div className="error-message">{cartError}</div>}

            {/* Manufacturer filter dropdown */}
            <div className="filter-container">
                <label htmlFor="manufacturer-filter">Filter by Manufacturer: </label>
                <select
                    id="manufacturer-filter"
                    value={activeManufacturer}
                    onChange={handleManufacturerChange}
                    className="manufacturer-select"
                >
                    <option value="all">All Manufacturers</option>
                    {manufacturers.map(manufacturer => (
                        <option key={manufacturer} value={manufacturer}>
                            {manufacturer}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product listing */}
            <div className="product-list">
                {filteredProducts.length === 0 ? (
                    <div className="no-products">
                        No products found from this manufacturer.
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <h4 className="product-name">{product.name}</h4>
                            <p><strong>Type:</strong> {product.type.name}</p>
                            <p><strong>Color:</strong> {product.color}</p>
                            <p><strong>Size:</strong> {product.size}</p>
                            <p><strong>Manufacturer:</strong> {product.manufacturer.name}</p>
                            <p><strong>Price:</strong> €{product.price.toFixed(2)}</p>
                            <p><strong>Inventory:</strong> {product.inventory} in stock</p>

                            {/* Add to cart button that changes based on context */}
                            <button
                                className={`add-cart-button ${product.inventory <= 0 ? 'disabled' : ''}`}
                                onClick={() => handleAddToCart(product)}
                                disabled={product.inventory <= 0 || !user}
                            >
                                {product.inventory <= 0
                                    ? 'Out of Stock'
                                    : !user
                                        ? 'Login to Add'
                                        : 'Add to Cart'}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}