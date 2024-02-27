import { useState, useContext } from "react";
import { useParams, Link, Outlet } from "react-router-dom"
import { Container, Row, Col, Image } from "react-bootstrap"
import { ProductContext } from "../context/ProductContext"

const UserProfile = () => {
  const { userObjective, users, orders } = useContext(ProductContext)
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const { userId } = useParams()
  const id = parseInt(userId, 10);

  // Objecto usuario según id
  const user = users.find(user => user.id_user === id)

  // Gamificación Mi Market Latino
  const filledStarsCount = Object.values(userObjective).filter(Boolean).length;
  const stars = Array.from({ length: 5 }, (_, index) => (
    <i key={index} className={`bi bi-star-fill text-primary me-1 ${index < filledStarsCount ? '' : 'opacity-25'}`}></i>
  ));

  return (
    <Container fluid className="bg-body-secondary">
      <Row>
        <Col className="col-2 d-flex flex-column justify-content-start align-items-center bg-white pt-4 ps-0 m-3 rounded-4 box-shadow">
          {user.avatar_url ? <Image src={user.avatar_url} width={100} className="rounded-circle" /> : <i className="bi bi-camera fs-1 px-4 py-3 bg-body-secondary rounded-circle"></i>}
          <h2 className="fs-5 m-2 text-center">{user.firstname} {user.lastname}</h2>
          <p>{user.email}</p>
          <p>{stars}</p>
          <hr className="border-2 border-secondary w-75" />
          <Link to="mis-datos" onClick={() => setIsLinkClicked(true)} className="text-decoration-none px-3 py-2 bg-secondary rounded-3 text-white shadow-sm w-75 my-2">
            <i className="bi bi-person text-white me-2"></i>Mis Datos
          </Link>
          <Link to="mis-favoritos" onClick={() => setIsLinkClicked(true)} className="text-decoration-none px-3 py-2 bg-secondary rounded-3 text-white shadow-sm w-75 my-2">
            <i className="bi bi-heart text-white me-2"></i>Mis Favoritos
          </Link>
          <Link to="mis-productos" onClick={() => setIsLinkClicked(true)} className="text-decoration-none px-3 py-2 bg-secondary rounded-3 text-white shadow-sm w-75 my-2">
            <i className="bi bi-box2-heart text-white me-2"></i>Mis Productos
          </Link>
          <Link to="mis-compras" onClick={() => setIsLinkClicked(true)} className="text-decoration-none px-3 py-2 bg-secondary rounded-3 text-white shadow-sm w-75 my-2">
            <i className="bi bi-bag text-white me-2"></i>Mis Compras
          </Link>
          <Link to="mis-ventas" onClick={() => setIsLinkClicked(true)} className="text-decoration-none px-3 py-2 bg-secondary rounded-3 text-white shadow-sm w-75 my-2">
            <i className="bi bi-cash-coin text-white me-2"></i>Mis Ventas
          </Link>
        </Col>
        <Col className="col-7 bg-body-tertiary p-4 m-3 rounded-4 box-shadow">
          {!isLinkClicked ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1>¡Hola {user.firstname}!</h1>
              <p>Este es tu dashboard de <b>{user.role === "registered" ? "usuario" : "administrador"}</b></p>
              <p>{user.role === "registered" ?
                "Navega por el menú, cumple los objetivos, gana estrellas y accede a beneficios exclusivos" :
                "Haz tus cosas de administrador"}</p>
            </div>
          ) : (
            <Outlet context={{ user, setIsLinkClicked }} />
          )}
        </Col>
        <Col className="my-3">
          <div className="animated-gradient text-white p-3 mb-4 rounded-4 box-shadow text-center">
            <strong>Hot Deals</strong> en Mi Market Latino
          </div>
          <Image src="/ads.webp" className="img-fluid rounded-4" />
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile