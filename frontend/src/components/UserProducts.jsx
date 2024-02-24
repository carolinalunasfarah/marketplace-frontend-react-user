import { useState, useContext } from "react"
import { UserContext } from '../context/UserContext'
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

const UserProducts = () => {
  const { products, setProducts, formatPrice, formatDate } = useContext(UserContext)
  const [visibleDetailId, setVisibleDetailId] = useState(null);

  const productsByUser = products.filter((product) => product.id_user === 1)

  const addDaysToDate = (dateStr, daysToAdd) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = () => { }
  return (
    <>
      <h1>Mis Productos</h1>
      <div>
        {productsByUser.length === 0 ? (<p>Crea tu primero producto y comienza a ganar dinero.</p>) : (<p>Este es el listado de tus productos publicados</p>)}
      </div>
      <div className="d-flex flex-row justify-content-end">
        <Button className="bg-primary border-0" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? (
            <>Cerrar <i className="bi bi-chevron-compact-up"></i></>
          ) : (
            <>Crear Producto <i className="bi bi-chevron-compact-down"></i></>
          )}
        </Button>
      </div>
      {showDetails && (
        <Row className="d-flex flex-row align-items-center justify-content-center mt-4">
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                className="mb-3"
                placeholder="Nombre Producto"
                type="text"
                id="firstname"
                name="firstname"
                value=""
                required
              />
              <InputGroup size="lg" className="mb-3 gap-2">
                <Form.Control
                  placeholder="Stock"
                  type="number"
                  id="stock"
                  name="stock"
                  value=""
                  required
                />
                <Form.Control
                  placeholder="Precio"
                  type="number"
                  id="price"
                  name="price"
                  value=""
                  required
                />
                <Form.Control
                  placeholder="Categoría"
                  type="number"
                  id="category"
                  name="category"
                  value=""
                  required
                />
              </InputGroup>

              <Form.Control
                className="mb-3"
                placeholder="URL Imagen"
                type="text"
                id="product_img"
                name="product_img"
                value=""
                required
              />
              <Form.Control
                className="mb-3"
                placeholder="Descripción"
                type="text"
                id="desc"
                name="desc"
                value=""
                required
              />
              <Button type="submit" className="bg-primary border-0 w-25">Crear</Button>
            </Form>

          </Col>
        </Row>
      )}
      {productsByUser.map((product) => (
        <div key={product.id_product} className="bg-body-light shadow-sm rounded-3 p-3 my-4">
          <Row>
            <Col>
              <Row>
                <Col className="d-flex flex-row justify-content-between align-items-center gap-4">
                  <div className="bg-body-secondary rounded-rectangle p-4">imagen</div>
                  <div className=""> Producto <br/>{product.product_name}</div>
                  <div className="">Precio <br/>{formatPrice(product.price)}</div>
                  <div className="">Cantidad <br/>{product.stock}</div>
                  <div><i class="bi bi-trash3 text-secondary"></i></div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      ))}
    </>
  )
}

export default UserProducts