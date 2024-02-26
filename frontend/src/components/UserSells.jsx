import { useState, useContext, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from "react-router-dom"

const UserSells = () => {
  const { user, setIsLinkClicked } = useOutletContext()
  const { setUserObjective, products, orders, formatPrice, formatDate } = useContext(UserContext)
  const [visibleDetailId, setVisibleDetailId] = useState(null);

  // Productos creados por el usuario y luego busco las órdenes con estos id_product
  const createdBy = products.filter((product) => product.id_user === 1).map(product => product.id_product)
  const sellsBy = orders.filter(order => createdBy.includes(order.id_product))
    .map(order => {
      const product = products.find(product => product.id_product === order.id_product)
      return {
        ...order,
        image_url: product?.image_url,
        product_name: product?.name
      }
    })

  useEffect(() => {
    if (sellsBy.length > 0) {
      setUserObjective(prevState => ({ ...prevState, hasSells: true }))
    }
  }, []);

  const addDaysToDate = (dateStr, daysToAdd) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  const toggleDetails = (id) => {
    setVisibleDetailId(visibleDetailId === id ? null : id);
  };

  return (
    <>
      <h1>Mis Ventas</h1>
      <div>
        {sellsBy.length === 0 ? (<p>Realiza tu primera venta y recibe una estrella.</p>) : (<p>Revisa el listado de tus ventas y fechas de abono.</p>)}
      </div>
      {sellsBy.map((sell) => (
        <div key={sell.id_order} className="bg-white shadow-sm rounded-3 p-3 mb-4">
          <Row>
            <Col>
              <Row className="d-flex flex-row justify-content-start align-items-center">
                <Col className="d-flex flex-row justify-content-start align-items-center gap-4">
                  <div className="text-secondary fw-bolder"><i className="bi bi-piggy-bank text-secondary"></i> Orden # {sell.id_order}</div>
                  <div>Vendido el {formatDate(sell.purchase_date)}</div>
                  <div>Total {formatPrice(sell.total_price)}</div>
                </Col>
                <Col className="col-3">
                  <Button className="bg-primary border-0" onClick={() => toggleDetails(sell.id_order)}>
                    {visibleDetailId === sell.id_order ? 'Ocultar Detalles' : 'Ver Detalles'}
                  </Button>
                </Col>
              </Row>

              {visibleDetailId === sell.id_order && (
                <div>
                  <hr></hr>
                  <Row className="d-flex flex-row justify-content-center align-items-center">
                    <Col>
                      <Image src={sell.image_url} width={90} className="bg-white border border-1 rounded-3 p-2" />
                    </Col>
                    <Col>
                      <Link to={`/product/${sell.id_product}`} className="text-decoration-none text-black">
                        <p className="fw-bolder">{sell.product_name} <i class="bi bi-search"></i></p>
                      </Link>
                      <small>
                        Cant. {sell.product_quantity}<br />
                        Subtotal: {formatPrice(sell.total_price / sell.product_quantity)}</small>
                    </Col>
                    <Col>
                      <div>
                        <small>Estado</small>
                        <p className="text-primary fw-bolder">Por Abonar</p>
                      </div>
                    </Col>
                    <Col>
                      <small>
                        Fecha de Abono
                      </small>
                      <p className="fw-bolder">{addDaysToDate(sell.purchase_date, 4)}</p>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </div>
      ))}
      <div className="d-flex justify-content-end mt-4"> <Button className="bg-transparent text-black border-0" onClick={() => setIsLinkClicked(false)}><i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil</Button>
      </div>
    </>
  )
}

export default UserSells