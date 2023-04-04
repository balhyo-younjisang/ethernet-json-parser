import { useState, useEffect } from "react";

export const useLocalStorage = (key, type, initialState) => {
  const [state, setState] = useState(
    // get data at localstorage
    () =>
      JSON.parse(window.localStorage.getItem(`${type + " " + key}`)) ||
      initialState
  );

  useEffect(() => {
    // save data in the localstorage
    window.localStorage.setItem(`${type + " " + key}`, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
