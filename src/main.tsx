import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { dataReducer } from "./reducers";
import { watchFetchData } from "./sagas";
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: dataReducer as any,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchData);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
)
