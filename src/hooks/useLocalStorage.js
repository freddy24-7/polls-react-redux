import { useEffect, useState } from 'react';

// Custom hook to manage local storage
export function useLocalStorage(key, initialValue) {
  // Initialize state with a callback function
  // The callback function is only executed once during the initial render
  const [value, setValue] = useState(() => {
    // Get the stored value from local storage
    const storedValue = localStorage.getItem(key);
    // If a stored value exists, parse and return it
    // Otherwise, use the provided initial value
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Update local storage whenever the key or value changes
  useEffect(() => {
    // Store the current value in local storage as a string
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return the current value and a function to update it
  return [value, setValue];
}
