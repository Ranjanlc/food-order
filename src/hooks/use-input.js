import { useState } from "react";

const useInput = (validateFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateFn(enteredValue);
  const hasError = !valueIsValid && isTouched;
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const inputChangeHandler = (e) => {
    if (hasError) {
      setIsTouched(true);
    } else {
      setIsTouched(false);
    }
    setEnteredValue(e.target.value);
  };
  const reset = () => {
    setIsTouched(false);
    setEnteredValue("");
  };
  return {
    enteredValue,
    isTouched,
    inputBlurHandler,
    inputChangeHandler,
    valueIsValid,
    hasError,
    reset,
  };
};
export default useInput;
