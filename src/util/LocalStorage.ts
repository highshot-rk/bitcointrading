import { useState } from 'react';

type Setter<T> = (data: T) => void;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Setter<T>] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setLocalStorageState = (newState: T) => {
    try {
      const newStateValue =
        typeof newState === 'function' ? newState(state) : newState;
      setState(newStateValue);
      window.localStorage.setItem(key, JSON.stringify(newStateValue));
    } catch (error) {
      console.error(`Unable to store new value for ${key} in localStorage`);
    }
  };
  return [state, setLocalStorageState];
}
