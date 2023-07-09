import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore as legacy_createStore } from 'redux';
import rootReducer from '../../redux';
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = legacy_createStore(rootReducer, preloadedState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
