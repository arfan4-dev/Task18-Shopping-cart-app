import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {store} from './store'
import {Provider} from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./Components/AppContext";
const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(
  <BrowserRouter>
   <Provider store={store}>
    <ContextProvider >

    <App />
    </ContextProvider>
    <Toaster/>
  </Provider>
  </BrowserRouter> 
 
);
