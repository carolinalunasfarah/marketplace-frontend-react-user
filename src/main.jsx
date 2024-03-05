import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// react-oauth
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";

// providers
import AuthProvider from "./context/AuthContext.jsx";
import DataProvider from "./context/DataContext.jsx";

// styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId="502905017316-r16m99cihtgvfie8jr42m5agl698s3pq.apps.googleusercontent.com">
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <DataProvider>
                        <App />
                        <ToastContainer />
                    </DataProvider>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    </GoogleOAuthProvider>
);