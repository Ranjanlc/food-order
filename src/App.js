import { Fragment, Suspense, useState } from 'react';
import React from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const Cart = React.lazy(() => import('./components/Cart/Cart'));
function App() {
  const navigate = useNavigate();
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
    navigate('/meals');
  };
  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CartProvider>
        <Header onShowCart={showCartHandler} />
        {/* {cartIsShown && (
          <Cart
            onClose={hideCartHandler}
            onOrder={showFormHandler}
            showForm={formIsShown}
            onCancel={hideFormHandler}
            showActionButton={actionButtonShow}
          />
        )} */}
        <Routes>
          <Route path="/" element={<Navigate to="meals" replace />} />
          <Route
            path="/meals/*"
            element={
              <Meals
                cartIsShown={cartIsShown}
                onClose={hideCartHandler}
                onOrder={showFormHandler}
                showForm={formIsShown}
                onCancel={hideFormHandler}
                showActionButton={actionButtonShow}
              />
            }
          />
        </Routes>
      </CartProvider>
    </Suspense>
  );
}

export default App;
