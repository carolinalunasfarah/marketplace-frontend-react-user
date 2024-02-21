import { Route, Routes } from "react-router-dom";

//import Menu from "./components/Menu";

import Cart from "./views/Cart";
import Error404 from "./views/Error404";
import Products from "./views/Products";
import Product from "./views/Product";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <>
            {/*<Menu />*/}

            <Routes>
                {/*<Route path="/" element={<Home />} />*/}
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id_product" element={<Product />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
};

export default App;
