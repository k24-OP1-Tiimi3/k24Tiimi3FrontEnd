import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import './shoplist.css';
import { AgGridReact } from 'ag-grid-react';

export default function Shoplist() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productData = await getProducts();
                setProducts(productData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div style={{ textAlign: 'center', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div className="shoplist-container">
            <h3 className="shoplist-title">Product List</h3>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h4>{product.name}</h4>
                        <p><strong>Type:</strong> {product.type}</p>
                        <p><strong>Color:</strong> {product.color}</p>
                        <p><strong>Size:</strong> {product.size}</p>
                        <p><strong>Price:</strong> €{product.price.toFixed(2)}</p>
                        <p><strong>Manufacturer:</strong> {product.manufacturer.name}</p>
                        <p><strong>Inventory:</strong> {product.inventory} in stock</p>
                    </div>
                ))}
            </div>
        </div>
    );
}