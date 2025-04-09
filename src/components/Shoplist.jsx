import { useState, useEffect } from 'react';
import { getProducts } from '../api/products';

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
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h3 style={{ textAlign: 'center' }}>Product List</h3>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '20px',
                padding: '10px',
                justifyContent: 'center'
            }}>
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '15px',
                            backgroundColor: '#f9f9f9',
                            textAlign: 'center',
                            width: '250px',
                            margin: '10px'
                        }}
                    >
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