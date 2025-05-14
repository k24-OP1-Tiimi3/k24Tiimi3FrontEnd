import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useUser } from '../Customers/UserContext';
import { submitOrder } from '../../api/carts';
import { getProducts } from '../../api/products';
import './cart.css';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart, error } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <p>Please <button className="login-redirect" onClick={() => navigate('/account')}>log in</button> to view your cart.</p>
      </div>
    );
  }

  const handleIncrement = (item) => {
    if (item.quantity < item.inventory) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) {
      setOrderStatus({ success: false, message: 'Your cart is empty.' });
      return;
    }

    // Check inventory before submitting
    const outOfStockItems = cartItems.filter(item => item.quantity > item.inventory);
    if (outOfStockItems.length > 0) {
      setOrderStatus({
        success: false,
        message: `Some items are out of stock: ${outOfStockItems.map(item => item.name).join(', ')}`
      });
      return;
    }

    setIsSubmitting(true);
    setOrderStatus(null);

    try {
      // Transform cart items into the format expected by the backend
      const productIds = [];

      // For each item, add its ID to the array based on quantity
      cartItems.forEach(item => {
        // If quantity is 3, add the ID 3 times
        for (let i = 0; i < item.quantity; i++) {
          productIds.push(item.id);
        }
      });

      // Format the order data according to backend expectations
      const orderData = {
        customerId: Number(user.id), // Force customer ID to be a number
        productIds: productIds
      };

      await submitOrder(orderData);

      clearCart();
      setOrderStatus({
        success: true,
        message: 'Your order has been successfully placed! Thank you for shopping with us.'
      });

    } catch (error) {
      console.error("Failed to submit order:", error);
      setOrderStatus({
        success: false,
        message: error.message || 'There was a problem placing your order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {/* Show any inventory errors */}
      {error && <div className="cart-error">{error}</div>}

      {/* Show order status messages */}
      {orderStatus && (
        <div className={`order-status ${orderStatus.success ? 'success' : 'error'}`}>
          {orderStatus.message}
        </div>
      )}

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p>Price: €{item.price.toFixed(2)}</p>
                  <p>Total: €{(item.price * item.quantity).toFixed(2)}</p>
                  <p className="inventory-info">In stock: {item.inventory}</p>
                </div>
                <div className="cart-controls">
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() => handleDecrement(item)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max={item.inventory}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val >= 1) {
                          updateQuantity(item.id, val);
                        }
                      }}
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleIncrement(item)}
                      disabled={item.quantity >= item.inventory}
                    >
                      +
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="checkout-button"
              onClick={handleSubmitOrder}
              disabled={isSubmitting || cartItems.length === 0}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
