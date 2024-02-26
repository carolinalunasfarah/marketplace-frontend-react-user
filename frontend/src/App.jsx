import { Route, Routes } from "react-router-dom";

// components
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import UserInfo from "./components/UserInfo";
import UserFavorites from "./components/UserFavorites";
import UserProducts from "./components/UserProducts";
import UserPurchases from "./components/UserPurchases";
import UserSells from "./components/UserSells";

// views
import Home from "./views/Home";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import OrderConfirmation from "./views/OrderConfirmation";
import Error404 from "./views/Error404";
import Products from "./views/Products";
import Product from "./views/Product";
import UserProfile from "./views/UserProfile";
import Login from "./views/Login";
import Register from "./views/Register";

// sources
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
    return (
        <>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmacion" element={<OrderConfirmation />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id_product" element={<Product />} />
                <Route path="/mi-perfil/:userId" element={<UserProfile />}>
                    <Route path="mis-datos" element={<UserInfo />} />
                    <Route path="mis-productos" element={<UserProducts />} />
                    <Route path="mis-favoritos" element={<UserFavorites />} />
                    <Route path="mis-compras" element={<UserPurchases />} />
                    <Route path="mis-ventas" element={<UserSells />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Error404 />} />
            </Routes>

            <Footer />
        </>
    );
};

export default App;
