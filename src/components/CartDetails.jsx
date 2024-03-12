import { Link, useNavigate } from "react-router-dom";

// hooks
import { useContext, useEffect } from "react";

// context
import { DataContext } from "../context/DataContext";
import { AuthContext } from "../context/AuthContext";

// react-bootstrap
import { Button } from "react-bootstrap";

// components
import ProductSlider from "../components/ProductSlider";
import NavigationTrail from "../components/NavigationTrail";

// notifications
import Swal from "sweetalert2";

const CartDetails = () => {
  // Obtiene los datos del carrito desde el contexto
  const { cart, addToCart, removeFromCart, formatPrice, title } =
    useContext(DataContext);

  // Obtiene los datos del usuario desde el contexto
  const { userIsLoggedIn } = useContext(AuthContext);

  // navigate
  const navigate = useNavigate();

  // Cambia el título de la página
  useEffect(() => {
    document.title = `${title} - Carrito`;
  }, []);

  const handleCheckout = (event) => {
    if (!cart.items || cart.items.length === 0) {
      // Mostrar un mensaje al usuario
      Swal.fire("Ups...", "Tu carrito está vacío.", "error");
      // Cancelar la navegación
      event.preventDefault();
    } else if (!userIsLoggedIn) {
      // Si el usuario no ha iniciado sesión, desplazarse al inicio de sesión
      window.scrollTo({ top: 0, behavior: "instant" });
      navigate("/inicia-sesion");
    } else {
      // Si el carrito no está vacío, desplazarse al inicio del checkout
      window.scrollTo({ top: 0, behavior: "instant" });
      navigate("/checkout");
    }
  };


  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
    <div className="row col-12 col-md-8 mx-auto pb-5 w-100">
      <h1>Tu Carrito</h1>
      <table className="table table-border">
        <thead>
          <tr className="border-bottom">
            <th scope="col" className="py-3 cursor-default">
              Imagen
            </th>
            <th scope="col" className="py-3 cursor-default">
              Producto
            </th>
            <th scope="col" className="py-3 cursor-default">
              Precio
            </th>
            <th scope="col" className="py-3 cursor-default">
              Cantidad
            </th>
            <th scope="col" className="py-3 cursor-default">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.items?.map(
            (product, index) =>
              product && (
                <tr
                  key={index}
                  className="border-bottom align-middle">
                  <td>
                    <Link
                      to={`/producto/${product.id_product}`}
                      onClick={handleLinkClick}
                      className="text-decoration-none text-dark">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="rounded-2 mb-3"
                        width="100"
                      />
                    </Link>
                    </td>
                    <td>{product.name}</td>
                  <td>
                  {formatPrice(product.price)}
                  </td>
                  <td className="col-5">
                    <Button
                      onClick={() =>
                        removeFromCart(product)
                      }
                      className="py-1 rounded me-2 border-0 shadow-lg btn-remove fw-bolder">
                      -
                    </Button>
                    {product.quantity}
                    <Button
                      onClick={() =>
                        addToCart(product)
                      }
                      className="py-1 rounded ms-2 border-0 shadow-lg btn-add fw-bolder">
                      +
                    </Button>
                  </td>
                  <td className="col-2 cursor-default">
                    {product.price &&
                      product.quantity &&
                      formatPrice(
                        product.price *
                        product.quantity
                      )}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
      <div>
        <h2 className="text-md-end text-center mt-5 cursor-default">
          Subtotal: {formatPrice(cart.total_price)}
        </h2>
        <p className="text-md-end text-center cursor-default">
          Solo faltan los gastos de envío
        </p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleCheckout}
            className="col-lg-4 col-12 py-3 btn-primary btn-lg fw-bold"
            style={{ cursor: "pointer" }}>
            Pagar Pedido
          </Button>
        </div>
      </div>
    </div>
    </>
    );
};

export default CartDetails;
