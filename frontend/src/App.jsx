import { Route, Routes } from "react-router-dom";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./views/Home";
import Cart from "./views/Cart";
import Error404 from "./views/Error404";
import Products from "./views/Products";
import Product from "./views/Product";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
    return (
        <>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id_product" element={<Product />} />
                <Route path="*" element={<Error404 />} />
            </Routes>

            <Footer />
        </>
    );
};

export default App;
