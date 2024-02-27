import { useState, useContext, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { DataContext } from '../context/DataContext'
import { Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from "react-router-dom"

const UserPurchases = () => {
  const { setIsLinkClicked } = useOutletContext()
  const { setUserObjective, products, orders, formatPrice, formatDate } = useContext(DataContext)
  const [visibleDetailId, setVisibleDetailId] = useState(null);

  const purchasesBy = orders.filter(order => order.id_user === 1).map(order => {
    const product = products.find(product => product.id_product === order.id_product)
    return {
      ...order,
      image_url: product?.image_url,
      product_name: product?.name
    };
  });

  useEffect(() => {
    if (purchasesBy.length > 0) {
      setUserObjective(prevState => ({ ...prevState, hasPurchases: true }))
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
        <h1>Mis Compras</h1>
        <p>
          {purchasesBy.length === 0 ? (<p>Realiza tu primera compra y recibe una estrella.</p>) : (<p>Revisa el listado de tus compras y fecha de entrega.</p>)}
        </p>
      </section>
      <section>
        {purchasesBy.map((purchase) => (
          <div key={purchase.id_order} className="bg-white rounded-4 box-shadow">
            <Row className="row-cols-12 row-cols-lg-2 my-4 p-3">
              <Col className="col-12 col-lg-8 d-flex flex-row justify-content-start align-items-center gap-4">
                <p className="text-primary fw-bold"><i className="bi bi-bag-check d-none d-lg-flex"></i> Orden # {purchase.id_order}</p>
                <p>Comprado el {formatDate(purchase.purchase_date)}</p>
                <p>Total {formatPrice(purchase.total_price)}</p>
              </Col>
              <Col className="col-12 col-lg-3">
                <Button className="bg-primary border-0" onClick={() => toggleDetails(purchase.id_order)}>
                  {visibleDetailId === purchase.id_order ? 'Ocultar Detalles' : 'Ver Detalles'}
                </Button>
              </Col>
            </Row>
            {visibleDetailId === purchase.id_order && (
              <Row className="col-12 row-cols-lg-4 d-flex flex-row align-items-center justify-content-between">
                <Col className="col-12 col-lg-3 text-center">
                  <Image src={purchase.image_url} width={90} className="bg-white border border-1 rounded-4 p-2" />
                </Col>
                <Col className="col-12 col-lg-3 text-center py-2">
                  <Link to={`/product/${purchase.id_product}`} className="text-decoration-none text-black">
                    <p className="fw-bolder">{purchase.product_name} <i className="bi bi-search"></i></p>
                  </Link>
                  <small>
                    Cant. {purchase.product_quantity}<br />
                    Subtotal: {formatPrice(purchase.total_price / purchase.product_quantity)}
                    </small>
                </Col>
                <Col className="col-12 col-lg-3 text-center py-2">
                  <div>
                    <small>Estado</small>
                    <p className="text-primary fw-bolder">En tránsito</p>
                  </div>
                </Col>
                <Col className="col-12 col-lg-3 text-center">
                  <small>
                    Fecha de entrega estimada
                  </small>
                  <p className="fw-bolder">{addDaysToDate(purchase.purchase_date, 4)}</p>
                </Col>
              </Row>
            )}
          </div>
        ))}
      </section>
      <section className="d-flex justify-content-end mt-4">
        <Button className="bg-transparent text-black border-0" onClick={() => setIsLinkClicked(false)}>
          <i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil
        </Button>
      </section>
    </>
  )
}

export default UserPurchases