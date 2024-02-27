import { useState, useContext, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { ProductContext } from "../context/ProductContext"
import { Row, Col, Form, InputGroup, Button, Image, Table } from 'react-bootstrap'
import { Link } from "react-router-dom"

const UserProducts = () => {
  const { user } = useOutletContext()
  const { setUserObjective, products, setProducts, categories, formatPrice } = useContext(ProductContext)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image_url, setImageUrl] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const productsByUser = products.filter((product) => product.id_user === 1)

  useEffect(() => {
    if (productsByUser.length > 0) {
      setUserObjective(prevState => ({ ...prevState, hasProducts: true }))
    }
  }, [products])


  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      id_product: products.length + 1,
      id_user: user.id_user,
      name,
      price: parseInt(price),
      description,
      image_url,
      id_category: category,
      date_add: new Date().toISOString()
    }
    setProducts(prevProducts => [...prevProducts, formData])
    setName('')
    setPrice('')
    setDescription('')
    setCategory('')
    setImageUrl('')
    setShowDetails(false)
  }

  const handleDelete = (productId) => {
    const newProducts = products.filter(product => product.id_product !== productId)
    setProducts(newProducts)
  }

  return (
    <>
      <h1>Mis Productos</h1>
      <div>
        {productsByUser.length === 0 ? (<p>Crea tu primer producto y comienza a ganar dinero.</p>) : (<p>Este es el listado de tus productos publicados.</p>)}
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
                id="product_name"
                name="product_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <InputGroup size="lg" className="mb-3 gap-2">
                <Form.Control
                  placeholder="Precio"
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id_category} value={cat.id_category}>{cat.name}</option>
                  ))}
                </Form.Select>
              </InputGroup>

              <Form.Control
                className="mb-3"
                placeholder="URL Imagen"
                type="text"
                id="product_img"
                name="product_img"
                value={image_url}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
              <Form.Control
                className="mb-3"
                placeholder="Descripción"
                type="text"
                id="desc"
                name="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Button type="submit" className="bg-primary border-0 w-25">Crear</Button>
            </Form>

          </Col>
        </Row>
      )}

      <Table bordered hover className="shadow-sm rounded-3 p-3 my-4">
        <thead>
          <tr className="text-center">
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productsByUser.map((product) => (
            <tr key={product.id_product} className="align-middle">
              <td className="text-center">
                <Image src={product.image_url} width={80} className="bg-white border border-1 rounded-3 p-2" />
              </td>
              <td>{product.name}</td>
              <td className="text-center">{formatPrice(product.price)}</td>
              <td className="text-center align-middle">
                <Link to={`/product/${product.id_product}`}>
                  <i className="bi bi-search text-secondary fs-4 me-2"></i>
                </Link>
                <Button
                  type="submit"
                  onClick={() => handleDelete(product.id_product)}
                  className="bg-transparent border-0 pt-0 m-0"
                >
                  <i className="bi bi-trash3 text-secondary fs-4 ms-2"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end mt-4"> <Button className="bg-transparent text-black border-0" onClick={() => setIsLinkClicked(false)}><i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil</Button>
      </div>
    </>
  )
}

export default UserProducts