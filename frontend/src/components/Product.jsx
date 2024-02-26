import { useContext } from "react"
import { Card, Badge, Button, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { ProductContext } from "../context/ProductContext"

const Product = ({ product }) => {
  const { addToCart, formatPrice, getCategory,favorites, setFavorites } = useContext(ProductContext)

  const isFavorite = favorites.some(favorite => favorite.id_product === product.id_product )

  const handleFavorite = (productId) => {
    if (isFavorite) {
      setFavorites(favorites.filter(favorite => favorite.id_product !== productId))
    } else {
      setFavorites([...favorites, { id_user: 1, id_product: productId }])
    }
  }
  return (
    <Card data-id_product={product.id_product} className="rounded-4 box-shadow mb-4">
      <Card.Img variant="top" src={product.image_url} alt={product.name} height={250} className="rounded-4"/>
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
        <Button variant="link" className="p-0 border-0 bg-transparent" onClick={() => handleFavorite(product.id_product)}>
          {isFavorite ? <i className="bi bi-heart-fill text-primary fs-3"></i> : <i className="bi bi-heart text-primary fs-3"></i>}
        </Button>
      </Card.Footer>
    </Card>
  )
}

export default Product
