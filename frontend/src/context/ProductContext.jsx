import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Slide, toast } from 'react-toastify';
import categories from  "../data/categories";

const ProductsProvider = ({ children }) => {
    const title          = "Mi Market Latino";
    const url_products   = "/products.json"; //cambiar por URL backend (VITE ENV)
    const cart_max_items = 10;
    const defaultCart = {
        items : [],
        total_items : 0,
        total_price : 0
    };
    const localStorageCart = () => {
        try {
            return JSON.parse(localStorage.getItem("cart"));        
        } catch(e) {
            localStorage.removeItem("cart");
        }
    };

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(localStorageCart() || defaultCart);

    const 
        addToCart = (product) => {
            if (cart.total_items >= cart_max_items) {
                feedback(`¡El carrito está lleno!`, "error");
                return false;
            }

            let newCart = {...cart};

            const index = newCart.items.findIndex(item => item.id_product === product.id_product);

            if (index === -1) {
                newCart.items = [...newCart.items, {...product, quantity: 1 }];
            } else {
                newCart.items[index].quantity++;
            }

            newCart.total_price += product.price;
            newCart.total_items ++;

            setCart(newCart);

            feedback(`Agregado al carrito: ${product.name}`, "success");
        },

        removeFromCart = (product) => {
            let newCart = {...cart};

            const index = newCart.items.findIndex(item => item.id_product === product.id_product);

            if (index === -1) {
                return false;
            }

            if (newCart.items[index].quantity === 1) {
                newCart.items.splice(index ,1);
            } else {
                newCart.items[index].quantity--;
            }

            newCart.total_price -= product.price;
            newCart.total_items --;

            setCart(newCart);

            feedback(`Quitado del carrito: ${product.name}`, "error");
        },

        getQuantityFromCart = (product) => {
            const index = cart.items.findIndex(item => item.id_product === product.id_product);

            return index === -1 ? 0 : cart.items[index].quantity;
        },

        confirmCart = () => {
        },

        emptyCart = () => {
            setCart(defaultCart);
        },

        formatPrice = (price) => {
            return new Intl.NumberFormat('es-CL', { 
                style    : 'currency',
                currency : 'CLP' 
            }).format(price);
        },

        feedback = (text, type) => {
            toast.dismiss();

            if (typeof toast[type] === 'function') {
                toast[type](text, {
                    hideProgressBar : true,
                    transition      : Slide,
                    bodyClassName   : `Feedback-${type}`
                });
            }
        };

    const [loading, setLoading] = useState(true);


    const getCategory = (id_category, attr) => {
        const index = categories.findIndex(category => category.id_category === id_category);

        if (index === -1) {
            return false;
        }

        return categories[index][attr] || null;
    };

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

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div className="ProductContext">
                    <div className="text-center">
                        <p>Cargando Productos ...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ProductContext.Provider
            value={{
                title,
                products, setProducts,
                cart, setCart, getQuantityFromCart,
                addToCart, removeFromCart, confirmCart, emptyCart,
                formatPrice, categories, getCategory
            }}>
            {children}
        </ProductContext.Provider>
    );
};

export const ProductContext = createContext();
export default ProductsProvider;