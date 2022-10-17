import { Fragment, Suspense, useState } from 'react';
import React from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';
import LoadingSpinner from './components/UI/LoadingSpinner';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const [cartIsShown, setCartIsShown] = useState(false);
  const [formIsShown, setFormIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const showFormHandler = () => {
    navigate('/meals/cart/order');
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
                formIsShown={formIsShown}
                onCancel={hideFormHandler}
                showCart={showCartHandler}
              />
            }
          />
        </Routes>
      </CartProvider>
    </Suspense>
  );
}

export default App;
