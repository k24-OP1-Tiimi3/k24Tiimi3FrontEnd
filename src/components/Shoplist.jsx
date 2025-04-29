import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import './shoplist.css';

export default function Shoplist() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [activeManufacturer, setActiveManufacturer] = useState('all');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getProducts();
                console.log("Fetched products:", productData);
                setProducts(productData);
                setFilteredProducts(productData);

                const uniqueManufacturers = [...new Set(
                    productData.map(product =>
                        product.manufacturerName ||
                        (product.manufacturer && product.manufacturer.name)
                    ).filter(name => name)
                )];

                console.log("Found manufacturers:", uniqueManufacturers);
                setManufacturers(uniqueManufacturers);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    const handleManufacturerChange = (event) => {
        const selectedManufacturer = event.target.value;
        setActiveManufacturer(selectedManufacturer);

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

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="shoplist-container">
            <h3 className="shoplist-title">Product List</h3>

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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}