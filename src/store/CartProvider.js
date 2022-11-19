import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    let updatedItems;
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const repeatedItems = state.items.some(
      (item) => item.id === action.item.id
    );
    if (repeatedItems) {
      for (const item of state.items) {
        if (item.id === action.item.id) item.amount += action.item.amount;
      }
      // We fixed a bug by destructuring to create a brand new array instead of pointing to original state.items which didnt created state change in useEffect while using only state.items
      updatedItems = [...state.items];
      console.log(action.item.amount);
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    ); //To find out in which position the upcoming removed item is
    const existingItem = state.items[existingCartItemIndex]; //FIngind to be removed item
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      // TO completely remove the item from the list
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }; //Updating the to-be removed item
      updatedItems = [...state.items];
      // Copying prev data into updatedItems
      updatedItems[existingCartItemIndex] = updatedItem;
      // updating the final updatedItems with that cartIndex and updated amount of the removed item.
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'RESET') {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };
  const clearItemFromCartHandler = () => {
    dispatchCartAction({ type: 'RESET' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearAllItem: clearItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
