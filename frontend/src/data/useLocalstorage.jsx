import { useState, useEffect } from "react";

export const useLocalStorage = (key, type, initialState) => {
  const [state, setState] = useState(
    () =>
      JSON.parse(window.localStorage.getItem(`${type + " " + key}`)) ||
      initialState
  );

  useEffect(() => {
    window.localStorage.setItem(`${type + " " + key}`, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
