import React, { useContext, useState } from "react";
import useInput from "../../hooks/use-input";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import Input from "../UI/Input";

const OrderForm = (props) => {
  const { items, totalAmount } = useContext(CartContext);
  // Using context to send data to database.
  // Used custom hook
  const {
    enteredValue: enteredName,
    inputBlurHandler: nameBlurHandler,
    valueIsValid: nameIsValid,
    inputChangeHandler: nameChangeHandler,
    hasError: nameHasError,
    reset: resetName,
  } = useInput((val) => val.trim().length !== 0);
  const {
    enteredValue: enteredAddress,
    inputBlurHandler: addressBlurHandler,
    valueIsValid: addressIsValid,
    inputChangeHandler: addressChangeHandler,
    hasError: addressHasError,
    reset: resetAddress,
  } = useInput((val) => val.trim().length !== 0);
  const {
    enteredValue: enteredContact,
    inputBlurHandler: contactBlurHandler,
    valueIsValid: contactIsValid,
    inputChangeHandler: contactChangeHandler,
    hasError: contactHasError,
    reset: resetContact,
  } = useInput((val) => val.trim().length === 10);
  const {
    enteredValue: enteredEmail,
    inputBlurHandler: emailBlurHandler,
    valueIsValid: emailIsValid,
    inputChangeHandler: emailChangeHandler,
    hasError: emailHasError,
    reset: resetEmail,
  } = useInput((val) => val.includes("@"));

  const errorLoader = (field, msg) => {
    return field && <p className="error-text">{msg}</p>;
  };

  const formIsValid =
    nameIsValid && emailIsValid && addressIsValid && contactIsValid;
  const formSubmitHandler = async function (e) {
    e.preventDefault();

    const order = {
      name: enteredName,
      address: enteredAddress,
      contact: +enteredContact,
      email: enteredEmail,
      order: { items, totalAmount },
    };
    props.onSubmit(order);
    if (!formIsValid) return;
    // Resetting all values
    resetName();
    resetEmail();
    resetAddress();
    resetContact();
  };
  return (
    <form
      onSubmit={formSubmitHandler}
      style={{ height: "200px", overflow: "auto" }}
    >
      {/* Used inline style coz having a whole css module file for this feature is not that worth it. */}
      <Input
        value={enteredName}
        label="Name:"
        input={{
          id: "name",
          type: "text",
          placeholder: "Enter your name here",
          onBlur: nameBlurHandler,
          onChange: nameChangeHandler,
        }}
      />

      {errorLoader(nameHasError, "I am pleading you to enter your name")}

      <Input
        value={enteredEmail}
        label="Email:"
        input={{
          id: "email",
          type: "email",
          placeholder: "Enter your email here",
          onChange: emailChangeHandler,
          onBlur: emailBlurHandler,
        }}
      />
      {errorLoader(emailHasError, "Stone age,huh?")}
      <Input
        value={enteredAddress}
        label="Address:"
        input={{
          id: "address",
          type: "text",
          placeholder: "Enter your address here",
          onChange: addressChangeHandler,
          onBlur: addressBlurHandler,
        }}
      />
      {errorLoader(addressHasError, "Are you homeless?")}
      <Input
        label="Contact No.:"
        value={enteredContact}
        input={{
          id: "contact",
          type: "tel",
          placeholder: "Enter your number here",
          maxLength: "10",
          onChange: contactChangeHandler,
          onBlur: contactBlurHandler,
        }}
      />
      {errorLoader(contactHasError, "Nomad?")}
      <Button onClick={props.hideCartHandler}>Cancel</Button>
      <Button type="submit" disabled={!formIsValid}>
        Confirm
      </Button>
    </form>
  );
};
export default OrderForm;
