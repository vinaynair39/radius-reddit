import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "router/AppRouter";
import reportWebVitals from "./reportWebVitals";
import "styles/index.scss";
import { Provider } from "react-redux";
import store from "store/store";
import { setSaved } from "store/common/reducer";
import 'react-image-lightbox/style.css'; 


store.dispatch(setSaved());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
