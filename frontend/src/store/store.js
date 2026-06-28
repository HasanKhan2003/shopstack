import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CART_STORAGE_KEY } from './cartSlice.js';

const saveCartItems = (items) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!items.length) {
    window.localStorage.removeItem(CART_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

let lastSavedCart = JSON.stringify(store.getState().cart.items);

store.subscribe(() => {
  const currentCart = store.getState().cart.items;
  const serializedCart = JSON.stringify(currentCart);

  if (serializedCart !== lastSavedCart) {
    saveCartItems(currentCart);
    lastSavedCart = serializedCart;
  }
});
