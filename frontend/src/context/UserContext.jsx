import { useState, useEffect, createContext } from "react";
import axios from "axios"
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [userFavorites, setUserFavorites] = useState([])
  const [favorites, setFavorites] = useState([])
  const [products, setProducts] = useState([]) // Ya está en ProductContext

  const [loading, setLoading] = useState(true) // Ya está en ProductContext
  const title = "Mi Market Latino" // Ya está en ProductContext

  const url_users = "/users.json"
  const url_favorites = "/favorites.json"
  const url_products   = "/products.json"; // Ya está en ProductContext
  const url_orders = "/orders.json"

  // Usuarios
  const getUsersAPI = () => {
    axios.get(url_users)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error trying to get data:", error);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsersAPI();
    document.title = title;
  }, []);

  // Favoritos
  const getFavoritesAPI = () => {
    axios.get(url_favorites)
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.error("Error trying to get data:", error);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFavoritesAPI();
  }, []);

  // Órdenes
  const getOrdersAPI = () => {
    axios.get(url_orders)
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.error("Error trying to get data:", error);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getOrdersAPI();
  }, []);


  // Ya está en ProductContext
  const getProductsAPI = () => {
    axios.get(url_products)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error trying to get data:", error);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductsAPI();
    document.title = title;
  }, []);

  const [orders, setOrders] = useState([
    {
      id_order: 1,
      id_user: 1,
      product_name: "Producto 1",
      quantity: 1,
      price: 1000,
      date_add: "2023-02-23 12:34:56"
    },
    {
      id_order: 2,
      id_user: 2,
      product_name: "Producto 2",
      quantity: 2,
      price: 2000,
      date_add: "2023-05-23 12:34:56"
    },
    {
      id_order: 3,
      id_user: 2,
      product_name: "Producto 2",
      quantity: 2,
      price: 2000,
      date_add: "2023-05-23 12:34:56"
    }
  ])


  // de ProductContext.jsx
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  }

  const formatDate = (date_add) => {
    return new Date(date_add).toISOString().split('T')[0]
  }

  return (
    <UserContext.Provider value={{ users, setUsers, products, setProducts, orders, setOrders, favorites, setFavorites, userFavorites, setUserFavorites, formatPrice, formatDate }}>
      {children}
    </UserContext.Provider>
  );

}

export default UserProvider;