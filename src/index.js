import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import applyMiddleware from './middleware';

// Create the Redux store with the combined reducer and middleware
export const store = createStore(reducer, applyMiddleware);

ReactDOM.render(
  <React.StrictMode>
    {/* Set up the BrowserRouter to enable routing */}
    <BrowserRouter>
      {/* Provide the Redux store to the entire app */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import './index.css';
// import App from './App';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducer from './reducers';
// import applyMiddleware from './middleware';
//
// // Create the Redux store with the combined reducer and middleware
// export const store = createStore(reducer, applyMiddleware);
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         {/* Set up the BrowserRouter to enable routing */}
//         <BrowserRouter>
//             {/* Provide the Redux store to the entire app */}
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         </BrowserRouter>
//     </React.StrictMode>,
// );
