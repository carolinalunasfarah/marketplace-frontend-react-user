import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [totalToPay, setTotalToPay] = useState(0); // Guarda el total a pagar $.

    return (
        <CartContext.Provider value={{ totalToPay, setTotalToPay }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;