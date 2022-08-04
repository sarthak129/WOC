import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Amplify } from "aws-amplify";
import config from "./services/config.json";
import reportWebVitals from "./reportWebVitals";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
