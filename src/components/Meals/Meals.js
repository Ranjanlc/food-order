import { Fragment } from 'react';
import { Suspense } from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';
import { Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import React from 'react';
const Cart = React.lazy(() => import('../Cart/Cart'));
// To load cart component lazily
const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="cart/*"
            element={
              <Cart
                onClose={props.onClose}
                onOrder={props.onOrder}
                formIsShown={props.formIsShown}
                onCancel={props.onCancel}
                showCart={props.showCart}
                cartIsShown={props.cartIsShown}
              />
            }
          />
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default Meals;
