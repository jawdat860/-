import React, { useReducer } from 'react';
import CartContext from './CartContext';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
      const existingItem = state.items[existingItemIndex];
      const updatedItems = [...state.items];
      let updatedTotalAmount = state.totalAmount;

      if (existingItem) {
        // Update item amount
        const newAmount = action.item.amount;

        if (newAmount <= 0) {
          // Remove item if amount is 0 or less
          updatedTotalAmount -= existingItem.price * existingItem.amount; // Subtract old total
          updatedItems.splice(existingItemIndex, 1);
        } else {
          // Update existing item
          updatedTotalAmount -= existingItem.price * existingItem.amount; // Subtract old total
          updatedItems[existingItemIndex] = {
            ...existingItem,
            amount: newAmount,
          
          };
          updatedTotalAmount += existingItem.price * newAmount; // Add new total
        }
      } else if (action.item.amount > 0) {
        // Add new item
        updatedItems.push({
          ...action.item,
          amount: action.item.amount,
         
        });
        updatedTotalAmount += action.item.price * action.item.amount; // Add new total
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    case 'CLEAR':
      return defaultCartState;

    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const updateCartHandler = (item) => {
    dispatchCartAction({ type: 'UPDATE', item });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    updateItem: updateCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
