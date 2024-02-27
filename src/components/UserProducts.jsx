import { useState, useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Form, InputGroup, Button, Image, Table } from 'react-bootstrap';


const UserProducts = () => {
  const { user } = useOutletContext()
  const { setUserObjective, products, setProducts, categories, formatPrice } = useContext(DataContext)
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
      <section>
        <h1>Mis Productos</h1>
        <p>
          {productsByUser.length === 0 ? (<p>Crea tu primer producto y comienza a ganar dinero.</p>) : (<p>Este es el listado de tus productos publicados.</p>)}
        </p>
      </section>
      <section>
        <div className="text-end mb-4">
          <Button className="bg-primary border-0" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? (
              <>Cerrar <i className="bi bi-chevron-compact-up"></i></>
            ) : (
              <>Crear Producto <i className="bi bi-chevron-compact-down"></i></>
            )}
          </Button>
        </div>
        {showDetails && ( 
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
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    placeholder="Precio"
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  /> <InputGroup.Text className="me-2"
                  >CLP</InputGroup.Text>
                </InputGroup>

                <InputGroup className="mb-3">
                  <Form.Select
                    className="form-control text-body-secondary"
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
                <Button type="submit" className="bg-primary border-0 w-50">Crear Producto</Button>
              </Form>
        )}
      </section>
      <section>
        <Table bordered hover size="sm" className="box-shadow">
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
      </section>
      <section className="d-flex justify-content-end mt-4">
        <Button className="bg-transparent text-black border-0" onClick={() => setIsLinkClicked(false)}>
          <i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil
        </Button>
      </section>
    </>
  )
}

export default UserProducts