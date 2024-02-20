import { Route, Routes } from "react-router-dom";

//import Menu from "./components/Menu";

//import Cart from "./views/Cart";
//import Error404 from "./views/Error404";
//import Home from "./views/Home";
//import Producto from "./views/Producto";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    return (
        <>

            {/*<Menu />*/}

            <Routes>
                {/*<Route path="/" element={<Home />} />*/}
                {/*<Route path="/producto/:id_producto" element={<Producto />} />*/}
                {/*<Route path="/cart" element={<Cart />} />*/}
                {/*<Route path="*" element={<Error404 />} />*/}
            </Routes>
        </>
    );
};

export default App;
