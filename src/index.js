import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createLogger} from "redux-logger/src";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./redux/modules/config";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import { CookiesProvider } from 'react-cookie';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const logger = createLogger();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

root.render(
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// const logger = createLogger();
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
// const container = document.getElementById('root');

export const Static_Base_Url = "http://localhost:5000/api"

// root.render(
//     <Provider store={store}>
//         <App />
//     </Provider>
// );

// root.render(
//     <React.StrictMode>
//       <CookiesProvider>
//         <App />
//       </CookiesProvider>
//     </React.StrictMode>
//   );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
