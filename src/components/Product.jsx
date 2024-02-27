import { useContext } from "react"
import { Card, Badge, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { ProductContext } from "../context/ProductContext"
import Favorites from "./Favorites"

const Product = ({ product }) => {
  const { addToCart, formatPrice, getCategory } = useContext(ProductContext)

  return (
    <Card data-id_product={product.id_product} className="rounded-4 box-shadow mb-4">
      <Card.Img variant="top" src={product.image_url} alt={product.name} height={250} className="rounded-4" />
      <Card.Body className="text-center">
        <Card.Title>
          <h3 className="text-uppercase fw-bold text-truncate fs-4">{product.name}</h3>
        </Card.Title>
        <Card.Text className="fs-3">{formatPrice(product.price)}</Card.Text>
        <Link className="btn bg-secondary w-100 mb-2" to={`/product/${product.id_product}`}>
          Ver detalles
        </Link>
        <Button className="bg-primary border-0 w-100 mb-2" onClick={() => addToCart(product)}>
          <i className="bi bi-cart4"></i> Agregar al Carro
        </Button>

      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <Badge bg="success" className="Category fs-6" data-id_category={product.id_category}>{getCategory(product.id_category, "name")}</Badge>
        <Favorites productId={product.id_product} />
      </Card.Footer>
    </Card>
  )
}

export default Product
