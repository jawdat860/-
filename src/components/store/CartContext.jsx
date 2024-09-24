import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  updateItem: () => {},
  removeItem: (id) => {}
});

export default CartContext;