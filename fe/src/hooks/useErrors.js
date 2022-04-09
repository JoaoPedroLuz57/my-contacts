import { useState } from 'react';

export function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    if (errors.find((error) => error.field === field)) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { field, message }]);
  }

  function removeError(fieldName) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return { setError, removeError, getErrorMessageByFieldName };
}
