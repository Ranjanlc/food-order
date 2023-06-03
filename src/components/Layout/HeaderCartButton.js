import { useContext, useEffect, useState } from 'react';

import CartIcon from '../UI/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';
import { Link } from 'react-router-dom';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  // location.pathname.includes('cart') && props.onClick();
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <Link
      to="/meals/cart"
      state={{ fromMeals: true }}
      className={btnClasses}
      onClick={props.onClick}
    >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </Link>
  );
};

export default HeaderCartButton;
