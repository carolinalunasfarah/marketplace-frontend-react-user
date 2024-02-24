import { Route, Routes } from "react-router-dom";

//import Menu from "./components/Menu";

//import Cart from "./views/Cart";
//import Error404 from "./views/Error404";
import Home from "./views/Home";
//import Producto from "./views/Producto";

import UserProfile from "./views/UserProfile";
import UserInfo from "./components/UserInfo";
import UserFavorites from "./components/UserFavorites";
import UserProducts from "./components/UserProducts";
import UserPurchases from "./components/UserPurchases";
import UserSells from "./components/UserSells";
import './App.css';

const App = () => {
  return (
    <>

      {/*<Menu />*/}

      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/producto/:id_producto" element={<Producto />} />*/}
        {/*<Route path="/cart" element={<Cart />} />*/}
        {/*<Route path="*" element={<Error404 />} />*/}

        <Route path="/mi-perfil/:userId" element={<UserProfile />}>
          <Route path="mis-datos" element={<UserInfo />} />
          <Route path="mis-productos" element={<UserProducts />} />
          <Route path="mis-favoritos" element={<UserFavorites />} />
          <Route path="mis-compras" element={<UserPurchases />} />
          <Route path="mis-ventas" element={<UserSells />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
