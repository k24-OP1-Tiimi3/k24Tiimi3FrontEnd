import { useCart } from './CartContext';
import './cart.css';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>Price: €{item.price.toFixed(2)}</p>
              <p>Total: €{(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="cart-controls">
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
