import { createSelector, createSlice } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'shopstack_cart';

const loadCartItems = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch (error) {
    console.warn('Unable to read cart from localStorage:', error);
    return [];
  }
};

const initialState = {
  items: loadCartItems(),
};

const findItemIndex = (items, productId) =>
  items.findIndex((item) => item.id === productId);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const normalizedQuantity = Math.max(1, quantity);
      const existingIndex = findItemIndex(state.items, product.id);

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += normalizedQuantity;
        return;
      }

      state.items.push({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category_id: product.category_id,
        category_name: product.category_name,
        quantity: normalizedQuantity,
      });
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === productId);

      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === productId);

      if (!item) {
        return;
      }

      if (item.quantity <= 1) {
        state.items = state.items.filter((cartItem) => cartItem.id !== productId);
        return;
      }

      item.quantity -= 1;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectGrandTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);

export default cartSlice.reducer;
export { CART_STORAGE_KEY };
