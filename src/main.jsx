import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";

import DataProvider from "./context/DataContext.jsx";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId="502905017316-r16m99cihtgvfie8jr42m5agl698s3pq.apps.googleusercontent.com">
        <React.StrictMode>
            <BrowserRouter>
                <DataProvider>
                    <App />
                    <ToastContainer />
                </DataProvider>
            </BrowserRouter>
        </React.StrictMode>
    </GoogleOAuthProvider>
);
