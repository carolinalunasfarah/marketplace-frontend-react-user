import { Link } from "react-router-dom";

// hooks
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap

import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// components
import Error404 from "./Error404";
import Favorites from "../components/Favorites";
import NavigationTrail from "../components/NavigationTrail";
import Reinsurances from "../components/Reinsurances";

const Product = () => {
  const user = {firstname: "Pepe", lastname: "Luna"} // Modificar
  const {
    title,
    products,
    addToCart,
    removeFromCart,
    confirmCart,
    getQuantityFromCart,
    formatPrice,
    getCategory,
  } = useContext(DataContext);
  const { id_product } = useParams();

  const product =
    products[
    products.findIndex(
      (product) => Number(product.id_product) === Number(id_product)
    )
    ];

  if (!product) {
    return <Error404 />;
  }

  useEffect(() => {
    document.title = `${title} - ${product.name}`;
  }, []);

  return (
    <Container fluid className="bg-body-secondary">
      <section className="py-4">
        <NavigationTrail
          paths={[
            {
              text: "Tienda",
              to: "/products",
            },
            {
              text: product.name,
              active: true,
            },
          ]}></NavigationTrail>
      </section>
      <section className="d-flex justify-content-center pb-4">
        <Row className="row-cols-1 row-cols-md-3 bg-white rounded-4 box-shadow mx-4 py-4">
          <Col className="cols-12 text-center pt-4">
            <img src={product.image_url} width={300} className="img-fluid" />
          </Col>
          <Col className="col-12 d-flex d-lg-none bg-body-secondary justify-content-between align-items-center py-2">
            <h3>Cantidad</h3>
            <div className="d-flex align-items-center my-2">
              <Button variant="danger" className="mt-1" onClick={() => removeFromCart(product)}>
                <i className="bi bi-dash"></i>
              </Button>
              <span className="mx-4">{getQuantityFromCart(product)}</span>
              <Button variant="success" className="mt-1" onClick={() => addToCart(product)}>
                <i className="bi bi-plus"></i>
              </Button>
            </div>
          </Col>
          <Col className="col-12 pt-4">
            <h1>{product.name}</h1>
            <p>Vendido por {user.firstname} {user.lastname} </p>
            <p>{product.description}</p>
            <h2 className="fs-4 text-primary fw-bold">Precio: {formatPrice(product.price)}</h2>
            <hr />
            <div className="d-flex justify-content-between">
              <Badge bg="success" className="Category fs-6" data-id_category={product.id_category}>{getCategory(product.id_category, "name")}</Badge>
              <Favorites />
            </div>
          </Col>
          <Col className="col-12 d-none d-lg-flex flex-column align-items-center text-center pt-4">
            <h3>Cantidad</h3>
            <div className="d-flex align-items-center my-2">
              <Button variant="danger" className="mt-1" onClick={() => removeFromCart(product)}>
                <i className="bi bi-dash"></i>
              </Button>
              <span className="mx-4">{getQuantityFromCart(product)}</span>
              <Button variant="success" className="mt-1" onClick={() => addToCart(product)}>
                <i className="bi bi-plus"></i>
              </Button>
            </div>
          </Col>
        </Row>
      </section>
      <section className="py-4">
        <Reinsurances />
      </section>
    </Container>
  );
};

export default Product;
