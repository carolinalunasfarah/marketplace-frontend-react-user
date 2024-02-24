import { useState, useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

const UserSells = () => {
  const { user } = useOutletContext();
  const { orders, setOrders, formatPrice, formatDate } = useContext(UserContext)
  const [visibleDetailId, setVisibleDetailId] = useState(null);

  const sells = orders.filter((order) => order.id_user != 1)

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
        {sells.length === 0 ? (<p>Realiza tu primera venta y recibe una estrella.</p>) : (<p>Revisa el listado de tus ventas</p>)}
      </div>
      {sells.map((sell) => (
        <div key={sell.id_order} className="bg-body-light shadow-sm rounded-3 p-3 mb-4">
          <Row>
            <Col>
              <Row className="d-flex flex-row justify-content-start align-items-center ">
                <Col className="d-flex flex-row justify-content-start align-items-center gap-4">
                  <div className="bg-white fw-bolder px-4 py-2 rounded-3"><i class="bi bi-piggy-bank text-secondary"></i> Orden # {sell.id_order}</div>
                  <div>Vendido el {formatDate(sell.date_add)}</div>
                  <div>Total {formatPrice(sell.total)}</div>
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
                  <Row className="d-flex flex-row align-items-center justify-content-center">
                    <Col>
                      foto
                    </Col>
                    <Col>
                      {/*<Link to={`/product/${product.id_product}`}>
                        <h5>{sell.product_name}</h5>
                      </Link>* */}
                      <h5>{sell.product_name}</h5>
                      <small>Comprado por nombre<br />
                        Cant. {sell.quantity}<br />
                        Subtotal: {formatPrice(sell.price * sell.quantity)}</small>
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
                      <p className="fw-bolder">{addDaysToDate(sell.date_add, 4)}</p>
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

export default UserSells