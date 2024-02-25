import { useState, useEffect, createContext } from "react"
import { useParams } from 'react-router-dom'
import axios from "axios"
export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [favorites, setFavorites] = useState([])
  const [products, setProducts] = useState([]) // Ya está en ProductContext
  const [orders, setOrders] = useState([])

  const [userObjective, setUserObjective] = useState({
    hasInfo: false,
    hasProducts:false,
    hasPurchases: false,
    hasSells: false,
    hasFavorites: false,
  })

  const [loading, setLoading] = useState(true) // Ya está en ProductContext
  const title = "Mi Market Latino" // Ya está en ProductContext

  const url_users = "/users.json"
  const url_favorites = "/favorites.json"
  const url_products = "/products.json" // Ya está en ProductContext
  const url_orders = "/orders.json"

  // Usuarios
  const getUsersAPI = () => {
    axios.get(url_users)
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error("Error trying to get data:", error)
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getUsersAPI()
    document.title = title
  }, [])

  // Favoritos
  const getFavoritesAPI = () => {
    axios.get(url_favorites)
      .then(response => {
        setFavorites(response.data)
      })
      .catch(error => {
        console.error("Error trying to get data:", error)
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getFavoritesAPI()
  }, [])

  // Órdenes
  const getOrdersAPI = () => {
    axios.get(url_orders)
      .then(response => {
        setOrders(response.data)
      })
      .catch(error => {
        console.error("Error trying to get data:", error)
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getOrdersAPI()
  }, [])


  // Ya está en ProductContext
  const getProductsAPI = () => {
    axios.get(url_products)
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error("Error trying to get data:", error)
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getProductsAPI()
    document.title = title
  }, [])


  // de ProductContext.jsx
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price)
  }

  const formatDate = (date_add) => {
    return new Date(date_add).toISOString().split('T')[0]
  }

  return (
    <UserContext.Provider value={{ 
      users, setUsers,
      userObjective, setUserObjective,
      products, setProducts,
      orders, setOrders,
      favorites, setFavorites,
      formatPrice, formatDate }}>
      {children}
    </UserContext.Provider>
  )

}

export default UserProvider