// hooks
import { createContext, useEffect, useState } from "react";

// axios
import axios from "axios";

// toastify
import { Slide, toast } from "react-toastify";

// data
import categories from "../data/categories";

// uuid
import { v4 as uuidv4 } from "uuid";

// utils
import Config from "../utils/Config";

const DataProvider = ({ children }) => {
    const title = "Mi Market Latino";

    const urlBaseServer = Config.get("URL_API");
    const url_products = urlBaseServer + "products";
    const url_users = urlBaseServer + "users";
    const url_favorites = urlBaseServer + "favorites";
    const url_orders = urlBaseServer + "orders";

    // Preinicializado
    const localStorageCart = () => {
        try {
            return JSON.parse(localStorage.getItem("cart"));
        } catch (e) {
            localStorage.removeItem("cart");
        }
    };
    const defaultCart = {
        items: [],
        total_items: 0,
        total_price: 0,
    };

    // Estados
    const [users, setUsers] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(localStorageCart() || defaultCart);
    const [loading, setLoading] = useState(true);
    const [userObjective, setUserObjective] = useState({
        hasInfo: false,
        hasProducts: false,
        hasPurchases: false,
        hasSells: false,
        hasFavorites: false,
    });

    // TODOS LOS GET DE LA VIDA
    const getCategory = (category, attr) => {
        const index = categories.findIndex((c) => c.category === category);
        if (index === -1) {
            return false;
        }
        return categories[index][attr] || null;
    };

    // users
    const getUsersAPI = (userId) => {
        const token = sessionStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get(`${url_users}/${userId}`, config)
            .then((response) => {+
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error trying to get data:", error);
            });
    };

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        if (userData) {
            getUsersAPI(userData.id_user);
        }
    }, []);

    const getFavoritesAPI = () => {
        axios
            .get(url_favorites)
            .then((response) => {
                setFavorites(response.data);
            })
            .catch((error) => {
                console.error("Error trying to get data:", error);
            });
    };
    useEffect(() => {
        getFavoritesAPI();
    }, []);

    const getOrdersAPI = () => {
        axios
            .get(url_orders)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error trying to get data:", error);
            });
    };
    useEffect(() => {
        getOrdersAPI();
    }, []);

    const getProductsAPI = () => {
        axios
            .get(url_products)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error trying to get data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    useEffect(() => {
        getProductsAPI();
        document.title = title;
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // *** CART STUFF ***
    const cart_max_items = 10;
    const addToCart = (product) => {
            if (cart.total_items >= cart_max_items) {
                feedback(`¡El carrito está lleno!`, "error");
                return false;
            }

            let newCart = { ...cart };

            const index = newCart.items.findIndex(
                (item) => item.id_product === product.id_product
            );

            if (index === -1) {
                newCart.items = [...newCart.items, { ...product, quantity: 1 }];
            } else {
                newCart.items[index].quantity++;
            }

            newCart.total_price += product.price;
            newCart.total_items++;

            setCart(newCart);

            feedback(`Agregado al carrito: ${product.name}`, "success");
        },
        removeFromCart = (product) => {
            let newCart = { ...cart };

            const index = newCart.items.findIndex(
                (item) => item.id_product === product.id_product
            );

            if (index === -1) {
                return false;
            }

            if (newCart.items[index].quantity === 1) {
                newCart.items.splice(index, 1);
            } else {
                newCart.items[index].quantity--;
            }

            newCart.total_price -= product.price;
            newCart.total_items--;

            setCart(newCart);

            feedback(`Quitado del carrito: ${product.name}`, "error");
        },
        getQuantityFromCart = (product) => {
            const index = cart.items.findIndex(
                (item) => item.id_product === product.id_product
            );

            return index === -1 ? 0 : cart.items[index].quantity;
        },
        confirmCart = () => {},
        emptyCart = () => {
            setCart(defaultCart);
        },
        feedback = (text, type) => {
            toast.dismiss();

            if (typeof toast[type] === "function") {
                toast[type](text, {
                    hideProgressBar: true,
                    transition: Slide,
                    bodyClassName: `Feedback-${type}`,
                });
            }
        };

    const [shippingCost, setShippingCost] = useState(() => {
        // Intenta obtener el shippingCost desde localStorage o establece 0 si no existe
        const savedShippingCost = localStorage.getItem("shippingCost");
        return savedShippingCost ? JSON.parse(savedShippingCost) : 0;
    });

    const [totalToPayPlusShipping, setTotalToPayPlusShipping] = useState(0);

    // Inicializa el orderID desde localStorage si existe; de lo contrario, genera uno nuevo
    const [orderID, setOrderID] = useState(() => {
        const savedOrderID = localStorage.getItem("orderID");
        return savedOrderID || uuidv4();
    });

    // Efecto para guardar orderID en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("orderID", orderID);
    }, [orderID]);

    // Efecto para guardar shippingCost en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("shippingCost", JSON.stringify(shippingCost));
    }, [shippingCost]);

    // Efecto para calcular el total a pagar incluyendo el costo de envío
    useEffect(() => {
        setTotalToPayPlusShipping(cart.total_price + shippingCost);
    }, [cart.total_price, shippingCost]);

    const startNewOrder = () => {
        const newOrderID = uuidv4();
        setOrderID(newOrderID);
        // Opcionalmente, reinicia otros estados aquí
        // setTotalToPay(0);
        // setShippingCost(0);
        // Asegúrate de limpiar o reiniciar cualquier otro estado relevante aquí
        // Por ejemplo, si mantienes un estado para los items del carrito, deberías reiniciarlo también
    };

    // UTILIDADES
    const filterOrderLimitProducts = (products, filter, limit) => {
        //filter
        let filtered = products.filter((product) => {
            const matchByCategory = filter.category
                ? product.category === filter.category
                : true;

            const matchByPrice = filter.price
                ? Number(product.price) >= Number(filter.price[0]) &&
                  Number(product.price) <= Number(filter.price[1])
                : true;

            const matchByText = () => {
                if (Number(filter.text)) {
                    return Number(product.id_product) === Number(filter.text);
                }

                const includes = (text) =>
                    text
                        .toString()
                        .toLowerCase()
                        .includes(filter.text.trim().toLowerCase());

                return includes(product.name) || includes(product.description);
            };

            return matchByCategory && matchByPrice && matchByText();
        });

        //order
        switch (filter.order) {
            case "name_asc":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case "price_asc":
                filtered.sort((a, b) => Number(a.price) - Number(b.price));
                break;

            case "price_desc":
                filtered.sort((a, b) => Number(b.price) - Number(a.price));
                break;

            case "date_add_desc":
                filtered.sort((a, b) => b.date_add.localeCompare(a.date_add));
                break;
        }

        //limit
        if (limit) {
            filtered = filtered.slice(0, Math.min(limit, filtered.length));
        }

        return filtered;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        }).format(price);
    };

    const formatDate = (date_add) => {
        return new Date(date_add).toISOString().split("T")[0];
    };

    const formatBytes = (bytes) => {
        if (!bytes) {
            return "0 Bytes";
        }

        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="DataContext">
                    <div className="text-center">
                        <p>Cargando Productos ...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <DataContext.Provider
            value={{
                title,
                products,
                setProducts,
                filterOrderLimitProducts,
                cart,
                setCart,
                getQuantityFromCart,
                addToCart,
                removeFromCart,
                confirmCart,
                emptyCart,
                shippingCost,
                setShippingCost,
                orderID,
                totalToPayPlusShipping,
                startNewOrder,
                categories,
                getCategory,
                users,
                setUsers,
                userObjective,
                setUserObjective,
                orders,
                setOrders,
                favorites,
                setFavorites,
                formatPrice,
                formatDate,
                formatBytes,
            }}>
            {children}
        </DataContext.Provider>
    );
};

export const DataContext = createContext();
export default DataProvider;
