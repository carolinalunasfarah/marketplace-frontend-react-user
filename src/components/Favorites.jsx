// hooks
import { useContext } from "react";

// react-bootstrap
import { Button } from 'react-bootstrap';

// context
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

// notifications
import Swal from "sweetalert2";

const Favorites = ({ productId }) => {
  const Auth = useContext(AuthContext);
  const { favorites, setFavorites } = useContext(DataContext)
  const isFavorite = favorites.some(favorite => favorite.id_product === productId)

  const handleFavorite = (productId) => {
    if (Auth.userIsLoggedIn) {
      if (isFavorite) {
        setFavorites(favorites.filter(favorite => favorite.id_product !== productId))
      } else {
        setFavorites([...favorites, { id_user: 1, id_product: productId }])
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Debes iniciar sesión para guardar favoritos",
    });
    return;
    }
  }

  return (
    <Button variant="link" className="p-0 border-0 bg-transparent" onClick={() => handleFavorite(productId)}>
      {isFavorite ?
        <i className="bi bi-suit-heart-fill text-primary fs-3"></i>
        :
        <i className="bi bi-suit-heart text-primary fs-3"></i>
      }
    </Button>
  )
}

export default Favorites;