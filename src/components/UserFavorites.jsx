import { useContext, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

// context
import { DataContext } from '../context/DataContext';

// react-bootstrap
import { Row, Col, Button } from "react-bootstrap";

// components
import Product from "./Product"


const UserFavorites = () => {
  const { user, setIsLinkClicked } = useOutletContext()
  const { setUserObjective, favorites, products } = useContext(DataContext)
  const favoritesBy = favorites.filter(favorite => favorite.id_user === user.id_user)
  const favoriteProductsDetails = favoritesBy.map(favorite => {
    const productDetails = products.find(product => product.id_product === favorite.id_product);
    return productDetails || {};
  })

  useEffect(() => {
    if (favoritesBy.length > 0) {
      setUserObjective(prevState => ({ ...prevState, hasFavorites: true }))
    }
  }, [favorites]);

  return (
    <>
      <section>
        <h1>Mis Favoritos</h1>
        <p>
          {favoritesBy.length === 0 ? "Agrega un producto a Favoritos y recibe una estrella." : "¡Tus favoritos son increíbles! No dejes pasar la oportunidad y cómpralos."}
        </p>
      </section>
      <section>
        <Row className="row-cols-6 row-cols-lg-3">
          {favoriteProductsDetails.map((product) => (
            <Col key={product.id_product}>
              <Product
                key={product.id_product}
                product={product}
              />
            </Col>
          ))}
        </Row>
      </section>
      <section className="d-flex justify-content-end mt-4">
        <Button className="bg-transparent text-black border-0" onClick={() => setIsLinkClicked(false)}>
          <i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil
          </Button>
      </section>
    </>
  )
}

export default UserFavorites