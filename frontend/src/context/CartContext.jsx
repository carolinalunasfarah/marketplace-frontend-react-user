import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Asegúrate de importar uuidv4

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    // Inicializa totalToPay desde localStorage si existe; de lo contrario, usa 0
    const [totalToPay, setTotalToPay] = useState(() => {
        const savedTotalToPay = localStorage.getItem("totalToPay");
        return savedTotalToPay ? Number(savedTotalToPay) : 0;
    });

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

    // Efecto para guardar totalToPay en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("totalToPay", totalToPay.toString());
    }, [totalToPay]);

    // Efecto para guardar shippingCost en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem("shippingCost", JSON.stringify(shippingCost));
    }, [shippingCost]);

    // Efecto para calcular el total a pagar incluyendo el costo de envío
    useEffect(() => {
        setTotalToPayPlusShipping(totalToPay + shippingCost);
    }, [totalToPay, shippingCost]);

    const startNewOrder = () => {
        const newOrderID = uuidv4();
        setOrderID(newOrderID);
        // Opcionalmente, reinicia otros estados aquí
        // setTotalToPay(0);
        // setShippingCost(0);
        // Asegúrate de limpiar o reiniciar cualquier otro estado relevante aquí
        // Por ejemplo, si mantienes un estado para los items del carrito, deberías reiniciarlo también
    };

    return (
        <CartContext.Provider value={{ totalToPay, setTotalToPay, shippingCost, setShippingCost, orderID, totalToPayPlusShipping, startNewOrder }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;