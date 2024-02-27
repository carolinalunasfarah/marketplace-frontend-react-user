import { useState, useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

// context
import { DataContext } from '../context/DataContext';

// react-boostrap
import { Row, Col, Button, Image } from 'react-bootstrap';


const UserSells = () => {
  const { user, setIsLinkClicked } = useOutletContext()
  const { setUserObjective, products, orders, formatPrice, formatDate } = useContext(DataContext)
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
      <section>
        <h1>Mis Ventas</h1>
        <p>
          {sellsBy.length === 0 ? (<p>Realiza tu primera venta y recibe una estrella.</p>) : (<p>Revisa el listado de tus ventas y fechas de abono.</p>)}
        </p>
      </section>
      <section>
        {sellsBy.map((sell) => (
          <div key={sell.id_order} className="bg-white rounded-4 box-shadow">
            <Row className="row-cols-12 row-cols-lg-2 my-4 p-3">
              <Col className="col-12 col-lg-8 d-flex flex-row justify-content-start align-items-center gap-4">
                <p className="text-primary fw-bold"><i className="bi bi--bank d-none d-lg-flex"></i> Orden # {sell.id_order}</p>
                <p>Comprado el {formatDate(sell.purchase_date)}</p>
                <p>Total {formatPrice(sell.total_price)}</p>
              </Col>
              <Col className="col-12 col-lg-3">
                <Button className="btn-primar border-0" onClick={() => toggleDetails(sell.id_order)}>
                  {visibleDetailId === sell.id_order ? 'Ocultar Detalles' : 'Ver Detalles'}
                </Button>
              </Col>
            </Row>
            {visibleDetailId === sell.id_order && (
              <Row className="col-12 row-cols-lg-4 d-flex flex-row align-items-center justify-content-between">
                <Col className="col-12 col-lg-3 text-center">
                  <Image src={sell.image_url} width={90} className="bg-white border border-1 rounded-4 p-2" />
                </Col>
                <Col className="col-12 col-lg-3 text-center py-2">
                  <Link to={`/product/${sell.id_product}`} className="text-decoration-none text-black">
                    <p className="fw-bolder">{sell.product_name} <i className="bi bi-search"></i></p>
                  </Link>
                  <small>
                    Cant. {sell.product_quantity}<br />
                    Subtotal: {formatPrice(sell.total_price / sell.product_quantity)}
                  </small>
                </Col>
                <Col className="col-12 col-lg-3 text-center py-2">
                  <div>
                    <small>Estado</small>
                    <p className="text-primary fw-bolder">Por abonar</p>
                  </div>
                </Col>
                <Col className="col-12 col-lg-3 text-center">
                  <small>
                    Fecha de abono estimada
                  </small>
                  <p className="fw-bolder">{addDaysToDate(sell.purchase_date, 4)}</p>
                </Col>
              </Row>
            )}
          </div>
        ))}
      </section>
      <section className="d-flex justify-content-end mt-4">
        <Link className="bg-transparent text-black border-0" onClick={() => setIsLinkClicked(false)}>
          <i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil
        </Link>
      </section>
    </>
  )
}

export default UserSells