import { useContext, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { Row, Col, Card, Image } from "react-bootstrap"
import { Link } from "react-router-dom"


const UserFavorites = () => {
  const { user } = useOutletContext();
  const { users, favorites, userFavorites, setUserFavorites } = useContext(UserContext)

  useEffect(() => {
    const favoritesFilter = favorites.filter((favorite) => favorite.id_user === user.id);
    setUserFavorites(favoritesFilter);
  }, [favorites, user.id]);

  return (
    <>
      <h1>Mis Favoritos</h1>
      <div>
        {userFavorites.length === 0 ? (<p>Agrega un producto a Favoritos y recibe una estrella.</p>) : (<p>¡Tus favoritos son increíbles! No dejes pasar la oportunidad y cómpralos.</p>)}
      </div>
      {userFavorites.map((fav) => (
        <Row key={fav.id_product} className="rows-col-3">
          <Col>
            {/*<Link to={`/product/${fav.id_product}`}>
                <h5>{fav.id_product}</h5>
              </Link>* */}
            {fav.id_product}
          </Col>
        </Row>
      ))}

    </>)
}

export default UserFavorites