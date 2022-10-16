import { useContext, useState } from 'react';
import React from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import OrderForm from './OrderForm';
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [sendingOrder, setSendingOrder] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const formSubmitHandler = async (order) => {
    cartCtx.clearAllItem(); //To clear the items
    setSendingOrder(true);
    props.onCancel(); // To hide the form
    const res = await fetch(
      'https://react-second-f430c-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    setOrderSent(true);
    setSendingOrder(false);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  // Stored close Button in variable coz we use it in different conditions.
  const closeBtn = (
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
  );
  return (
    <React.Fragment>
      <Modal onClose={props.onClose}>
        {sendingOrder && <p>Sending Data.....</p>}
        {orderSent && <p>Order Sent</p>}
        {!sendingOrder && !orderSent && (
          <React.Fragment>
            {cartItems}
            <div className={classes.total}>
              <span>Total Amount</span>
              <span>{totalAmount}</span>
            </div>
          </React.Fragment>
        )}

        <div className={classes.actions}>
          {props.showActionButton && !sendingOrder && !orderSent && closeBtn}
          {orderSent && closeBtn}
          {'for routes'}
          {'added in route'}
          {hasItems && !sendingOrder && !orderSent && props.showActionButton && (
            <button className={classes.button} onClick={props.onOrder}>
              Order
            </button>
          )}
        </div>
        <div>
          {props.showForm && (
            <OrderForm onCancel={props.onClose} onSubmit={formSubmitHandler} />
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Cart;
