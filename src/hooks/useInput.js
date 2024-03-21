import { useEffect, useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [hasError, setHasError] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && isTouched;

  useEffect(() => {
    setHasError(!valueIsValid && isTouched);
  }, [valueIsValid, isTouched]);

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const setError = () => {
    setHasError(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    setIsTouched,
    reset,
    setValue: setEnteredValue,
    setError,
  };
};

export default useInput;
