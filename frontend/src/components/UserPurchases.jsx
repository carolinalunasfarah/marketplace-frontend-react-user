import { useState, useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

const UserPurchases = () => {
  const { user } = useOutletContext();
  const { orders, setOrders, formatPrice, formatDate } = useContext(UserContext)
  const [visibleDetailId, setVisibleDetailId] = useState(null);

  const purchases = orders.filter((order) => order.id_user === 1)

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
      <h1>Mis Compras</h1>
      <div>
        {purchases.length === 0 ? (<p>Realiza tu primera compra y recibe una estrella.</p>) : (<p>Revisa el listado de tus compras</p>)}
      </div>
      {purchases.map((purchase) => (
        <div key={purchase.id_order} className="bg-body-light shadow-sm rounded-3 p-3 mb-4">
          <Row>
            <Col>
              <Row className="d-flex flex-row justify-content-start align-items-center ">
                <Col className="d-flex flex-row justify-content-start align-items-center gap-4">
                  <div className="bg-white fw-bolder px-4 py-2 rounded-3"><i class="bi bi-bag-check"></i> Orden # {purchase.id_order}</div>
                  <div>Comprado el {formatDate(purchase.date_add)}</div>
                  <div>Total {formatPrice(purchase.total)}</div>
                </Col>
                <Col className="col-3">
                  <Button className="bg-primary border-0" onClick={() => toggleDetails(purchase.id_order)}>
                    {visibleDetailId === purchase.id_order ? 'Ocultar Detalles' : 'Ver Detalles'}
                  </Button>
                </Col>
              </Row>

              {visibleDetailId === purchase.id_order && (
                <div>
                  <hr></hr>
                  <Row className="d-flex flex-row align-items-center justify-content-center">
                    <Col>
                      foto
                    </Col>
                    <Col>
                      {/*<Link to={`/product/${product.id_product}`}>
                        <h5>{sell.product_name}</h5>
                      </Link>* */}
                      <h5>{purchase.product_name}</h5>
                      <small>Vendido por nombre<br />
                        Cant. {purchase.quantity}<br />
                        Subtotal: {formatPrice(purchase.price * purchase.quantity)}</small>
                    </Col>
                    <Col>
                      <div>
                        <small>Estado</small>
                        <p className="text-primary fw-bolder">En tránsito</p>
                      </div>
                    </Col>
                    <Col>
                      <small>
                        Fecha de entrega estimada
                      </small>
                      <p className="fw-bolder">{addDaysToDate(purchase.date_add, 4)}</p>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </div>
      ))}
    </>
  )
}

export default UserPurchases