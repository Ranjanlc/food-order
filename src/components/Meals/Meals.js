import { Fragment } from 'react';

import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';
import { Route, Routes } from 'react-router-dom';
import Cart from '../Cart/Cart';

const Meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
      <Routes>
        <Route
          path="cart"
          element={
            <Cart
              onClose={props.onClose}
              onOrder={props.onOrder}
              showForm={props.showForm}
              onCancel={props.onCancel}
              showActionButton={props.showActionButton}
            />
          }
        />
      </Routes>
    </Fragment>
  );
};

export default Meals;
