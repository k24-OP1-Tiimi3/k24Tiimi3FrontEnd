import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');

  const addToCart = (product) => {
    setError('');

    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);

      if (existing) {
        // Check if adding one more would exceed inventory
        if (existing.quantity >= product.inventory) {
          setError(`Cannot add more. Only ${product.inventory} available in stock.`);
          return prevItems;
        }

        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // For new item, check if inventory is available
        if (product.inventory <= 0) {
          setError('This product is out of stock.');
          return prevItems;
        }
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setError('');

    // First find the product to check inventory
    const item = cartItems.find(item => item.id === productId);

    if (item && quantity > item.inventory) {
      setError(`Cannot set quantity to ${quantity}. Only ${item.inventory} available in stock.`);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartTotal,
      error,
      setError
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);