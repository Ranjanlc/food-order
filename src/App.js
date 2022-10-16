import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [formIsShown, setFormIsShown] = useState(false);
  let actionButtonShow = cartIsShown && !formIsShown;
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const showFormHandler = () => {
    setFormIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
    setFormIsShown(false);
  };
  const hideFormHandler = () => {
    setFormIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && (
        <Cart
          onClose={hideCartHandler}
          onOrder={showFormHandler}
          showForm={formIsShown}
          onCancel={hideFormHandler}
          showActionButton={actionButtonShow}
        />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
